import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const nasaCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

async function fetchWithTimeout(url: string, timeoutMs = 4500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'astro-exploradores-nasa-proxy' });
  });

  // NASA Image and Video Library API (no API key required, official public NASA endpoint)
  app.get('/api/nasa/images', async (req, res) => {
    const query = String(req.query.q || 'solar system').trim();
    const cacheKey = `images:${query.toLowerCase()}`;
    const cached = nasaCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({ source: 'nasa-api-cache', offline: false, items: cached.data });
    }

    try {
      const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=6`;
      const response = await fetchWithTimeout(apiUrl);
      if (!response.ok) {
        throw new Error(`NASA Image API responded with ${response.status}`);
      }
      const json = (await response.json()) as {
        collection?: {
          items?: Array<{
            data?: Array<{
              title?: string;
              nasa_id?: string;
              center?: string;
              date_created?: string;
              description?: string;
              photographer?: string;
              secondary_creator?: string;
            }>;
            links?: Array<{ href?: string; rel?: string }>;
          }>;
        };
      };

      const rawItems = json.collection?.items ?? [];
      const items = rawItems
        .filter((entry) => entry.data?.[0] && entry.links?.[0]?.href)
        .slice(0, 4)
        .map((entry) => {
          const meta = entry.data![0];
          const imageUrl = entry.links!.find((l) => l.rel === 'preview')?.href || entry.links![0].href!;
          const creator = meta.photographer || meta.secondary_creator || meta.center || 'NASA';
          return {
            nasaId: meta.nasa_id || 'NASA-ARCHIVE',
            title: meta.title || 'Imagen científica de la NASA',
            description: meta.description || '',
            dateCreated: meta.date_created ? meta.date_created.slice(0, 10) : 'Archivo NASA',
            center: meta.center || 'NASA',
            credit: `Crédito oficial: ${creator} / NASA Image and Video Library`,
            imageUrl,
            isRealNasaPhoto: true,
          };
        });

      nasaCache.set(cacheKey, { data: items, timestamp: Date.now() });
      return res.json({ source: 'nasa-api-live', offline: false, items });
    } catch {
      return res.json({
        source: 'offline-verified-archive',
        offline: true,
        items: [],
      });
    }
  });

  // NASA Exoplanet Archive TAP API (official Caltech/IPAC NASA Exoplanet Archive)
  app.get('/api/nasa/exoplanets', async (_req, res) => {
    const cacheKey = 'exoplanets:latest';
    const cached = nasaCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({ source: 'nasa-exoplanet-cache', offline: false, exoplanets: cached.data });
    }

    try {
      const tapSql =
        'select top 6 pl_name,hostname,disc_year,discoverymethod,pl_rade,pl_orbper,pl_eqt ' +
        'from pscomppars where pl_rade is not null and pl_orbper is not null order by disc_year desc';
      const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(tapSql)}&format=json`;
      const response = await fetchWithTimeout(apiUrl, 5000);
      if (!response.ok) {
        throw new Error(`Exoplanet Archive responded with ${response.status}`);
      }
      const rows = (await response.json()) as Array<{
        pl_name: string;
        hostname: string;
        disc_year: number;
        discoverymethod: string;
        pl_rade: number | null;
        pl_orbper: number | null;
        pl_eqt: number | null;
      }>;

      const cleaned = rows.slice(0, 6).map((row) => ({
        name: row.pl_name,
        hostStar: row.hostname,
        discoveryYear: row.disc_year,
        method: row.discoverymethod,
        radiusEarth: row.pl_rade ? Number(row.pl_rade.toFixed(2)) : null,
        orbitalPeriodDays: row.pl_orbper ? Number(row.pl_orbper.toFixed(1)) : null,
        equilibriumTempK: row.pl_eqt ? Math.round(row.pl_eqt) : null,
        credit: 'NASA Exoplanet Archive (Caltech / IPAC)',
      }));

      nasaCache.set(cacheKey, { data: cleaned, timestamp: Date.now() });
      return res.json({ source: 'nasa-exoplanet-live', offline: false, exoplanets: cleaned });
    } catch {
      return res.json({ source: 'offline-verified-archive', offline: true, exoplanets: [] });
    }
  });

  // NASA APOD endpoint (uses optional server-side NASA_API_KEY or DEMO_KEY)
  app.get('/api/nasa/apod', async (_req, res) => {
    const cacheKey = 'apod:today';
    const cached = nasaCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({ source: 'nasa-apod-cache', offline: false, apod: cached.data });
    }

    try {
      const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
      const response = await fetchWithTimeout(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}`);
      if (!response.ok) {
        throw new Error(`APOD status ${response.status}`);
      }
      const data = (await response.json()) as {
        title?: string;
        explanation?: string;
        url?: string;
        media_type?: string;
        copyright?: string;
        date?: string;
      };
      const apod = {
        title: data.title || 'Imagen Astronómica del Día (NASA)',
        date: data.date || '',
        url: data.media_type === 'image' ? data.url : '',
        credit: data.copyright ? `${data.copyright} / NASA APOD` : 'NASA Astronomy Picture of the Day',
      };
      nasaCache.set(cacheKey, { data: apod, timestamp: Date.now() });
      return res.json({ source: 'nasa-apod-live', offline: false, apod });
    } catch {
      return res.json({ source: 'offline-verified-archive', offline: true, apod: null });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Astro-Exploradores server listening on http://localhost:${PORT}`);
  });
}

startServer();
