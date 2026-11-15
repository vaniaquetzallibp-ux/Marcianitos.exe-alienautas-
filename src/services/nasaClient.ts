import { ExoplanetRecord, NasaGalleryImage, PlanetId } from '../types/game';

const NASA_IMG_CACHE_PREFIX = 'astro_nasa_img_cache_v2_';
const NASA_EXO_CACHE_KEY = 'astro_nasa_exo_cache_v2';

// Verified offline archive so the game ALWAYS works without internet connection
export const OFFLINE_NASA_IMAGES: Record<PlanetId, NasaGalleryImage[]> = {
  mercury: [
    {
      nasaId: 'PIA15162',
      title: 'Mercury Enhanced-Color Mosaic (MESSENGER)',
      description: 'Global mosaic captured by NASA MESSENGER showing mineral differences across Mercury.',
      dateCreated: '2013-02-15',
      center: 'JPL / JHUAPL',
      credit: 'NASA / Johns Hopkins University Applied Physics Laboratory / Carnegie Institution',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA15162/PIA15162~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  venus: [
    {
      nasaId: 'PIA00104',
      title: 'Venus Global Radar View (Magellan)',
      description: 'Radar mosaic captured by NASA Magellan showing volcanic plains under Venus clouds.',
      dateCreated: '1996-02-05',
      center: 'JPL',
      credit: 'NASA / JPL',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA00104/PIA00104~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  earth: [
    {
      nasaId: 'GSFC_BlueMarble',
      title: 'Earth "Blue Marble" Satellite Observation',
      description: 'Satellite view of Earth oceans, atmosphere, and continents.',
      dateCreated: '2014-04-22',
      center: 'GSFC',
      credit: 'NASA Goddard Space Flight Center / Suomi NPP',
      imageUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001589/GSFC_20171208_Archive_e001589~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  mars: [
    {
      nasaId: 'PIA24428',
      title: 'Jezero Crater Panorama (Perseverance Rover)',
      description: 'Panorama captured by Mastcam-Z on NASA Perseverance rover exploring an ancient Martian lake.',
      dateCreated: '2021-02-24',
      center: 'JPL',
      credit: 'NASA / JPL-Caltech / ASU',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA24428/PIA24428~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  jupiter: [
    {
      nasaId: 'PIA22946',
      title: 'Jupiter Great Red Spot & Cloud Bands (Juno)',
      description: 'Real spacecraft photo captured by NASA Juno showing atmospheric swirls on Jupiter.',
      dateCreated: '2019-02-12',
      center: 'JPL',
      credit: 'NASA / JPL-Caltech / SwRI / MSSS',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA22946/PIA22946~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  saturn: [
    {
      nasaId: 'PIA17172',
      title: 'Saturn & Illuminated Rings (Cassini)',
      description: 'Real mosaic captured by NASA Cassini showing icy rings around Saturn.',
      dateCreated: '2013-11-12',
      center: 'JPL',
      credit: 'NASA / JPL-Caltech / Space Science Institute',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA17172/PIA17172~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  uranus: [
    {
      nasaId: 'PIA18182',
      title: 'Uranus in Visible Light (Voyager 2)',
      description: 'Historic photo captured by NASA Voyager 2 showing Uranus methane tint.',
      dateCreated: '1986-01-24',
      center: 'JPL',
      credit: 'NASA / JPL-Caltech',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  neptune: [
    {
      nasaId: 'PIA01492',
      title: 'Neptune Deep Blue Clouds (Voyager 2)',
      description: 'Real spacecraft photograph of Neptune captured by NASA Voyager 2 in 1989.',
      dateCreated: '1989-08-25',
      center: 'JPL',
      credit: 'NASA / JPL',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  moon: [
    {
      nasaId: 'PIA00405',
      title: 'The Moon Near Side Mosaic (LRO / Galileo)',
      description: 'High-resolution lunar mosaic showing craters and dark lunar maria.',
      dateCreated: '2010-03-01',
      center: 'GSFC / JPL',
      credit: 'NASA / Goddard Space Flight Center / Arizona State University',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA00405/PIA00405~thumb.jpg',
      isRealNasaPhoto: true,
    },
  ],
  exoplanets: [
    {
      nasaId: 'PIA21422',
      title: 'TRAPPIST-1 Seven-Exoplanet System (Concept)',
      description: 'NASA science illustration based on Spitzer & telescope measurements of the 7 real TRAPPIST-1 exoplanets.',
      dateCreated: '2017-02-22',
      center: 'JPL',
      credit: 'NASA / JPL-Caltech',
      imageUrl: 'https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg',
      isRealNasaPhoto: false,
    },
  ],
};

export const OFFLINE_EXOPLANETS: ExoplanetRecord[] = [
  {
    name: 'TRAPPIST-1 e',
    hostStar: 'TRAPPIST-1',
    discoveryYear: 2017,
    method: 'Transit',
    radiusEarth: 0.92,
    orbitalPeriodDays: 6.1,
    equilibriumTempK: 251,
    credit: 'NASA Exoplanet Archive (Offline Cache)',
  },
  {
    name: 'Kepler-186 f',
    hostStar: 'Kepler-186',
    discoveryYear: 2014,
    method: 'Transit',
    radiusEarth: 1.17,
    orbitalPeriodDays: 129.9,
    equilibriumTempK: 188,
    credit: 'NASA Exoplanet Archive (Offline Cache)',
  },
  {
    name: 'TOI-700 d',
    hostStar: 'TOI-700',
    discoveryYear: 2020,
    method: 'Transit',
    radiusEarth: 1.07,
    orbitalPeriodDays: 37.4,
    equilibriumTempK: 269,
    credit: 'NASA Exoplanet Archive (Offline Cache)',
  },
  {
    name: 'K2-18 b',
    hostStar: 'K2-18',
    discoveryYear: 2015,
    method: 'Transit',
    radiusEarth: 2.61,
    orbitalPeriodDays: 32.9,
    equilibriumTempK: 255,
    credit: 'NASA Exoplanet Archive (Offline Cache)',
  },
];

export async function fetchPlanetNasaImages(
  planetId: PlanetId,
  query: string
): Promise<{ items: NasaGalleryImage[]; fromOfflineArchive: boolean }> {
  const cacheKey = `${NASA_IMG_CACHE_PREFIX}${planetId}`;

  try {
    const res = await fetch(`/api/nasa/images?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Network response error');
    const data = (await res.json()) as {
      offline: boolean;
      items: NasaGalleryImage[];
    };

    if (!data.offline && data.items && data.items.length > 0) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data.items));
      } catch {
        // Ignore storage errors
      }
      return { items: data.items, fromOfflineArchive: false };
    }
  } catch {
    // Fall through to cached / verified offline dataset
  }

  try {
    const cachedRaw = localStorage.getItem(cacheKey);
    if (cachedRaw) {
      const parsed = JSON.parse(cachedRaw) as NasaGalleryImage[];
      if (parsed.length > 0) {
        return { items: parsed, fromOfflineArchive: true };
      }
    }
  } catch {
    // Ignore parse errors
  }

  return {
    items: OFFLINE_NASA_IMAGES[planetId] || [],
    fromOfflineArchive: true,
  };
}

export async function fetchExoplanets(): Promise<{
  exoplanets: ExoplanetRecord[];
  fromOfflineArchive: boolean;
}> {
  try {
    const res = await fetch('/api/nasa/exoplanets');
    if (!res.ok) throw new Error('Network error');
    const data = (await res.json()) as {
      offline: boolean;
      exoplanets: ExoplanetRecord[];
    };
    if (!data.offline && data.exoplanets && data.exoplanets.length > 0) {
      try {
        localStorage.setItem(NASA_EXO_CACHE_KEY, JSON.stringify(data.exoplanets));
      } catch {
        // Ignore
      }
      return { exoplanets: data.exoplanets, fromOfflineArchive: false };
    }
  } catch {
    // Fall back safely
  }

  try {
    const cached = localStorage.getItem(NASA_EXO_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as ExoplanetRecord[];
      if (parsed.length > 0) return { exoplanets: parsed, fromOfflineArchive: true };
    }
  } catch {
    // Ignore
  }

  return { exoplanets: OFFLINE_EXOPLANETS, fromOfflineArchive: true };
}
