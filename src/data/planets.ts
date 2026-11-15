import { PlanetChapter } from '../types/game';

export const PLANET_CHAPTERS: PlanetChapter[] = [
  {
    id: 'mercury',
    order: 1,
    name: { es: 'Mercurio', en: 'Mercury' },
    subtitle: { es: 'Cap. 1 · El mundo veloz junto al Sol', en: 'Ch. 1 · The Speedy World Near the Sun' },
    palette: { primary: '#C8BCA5', secondary: '#9F9786', atmosphere: '#E3DAC6', accent: '#C8C7A5' },
    radiusVisual: 22,
    storyIntro: {
      es: 'Desde nuestro planeta hogar beige, amarillo suave y azul celeste encendemos los motores. ¡Primera parada: Mercurio!',
      en: 'From our light beige, soft yellow, and sky-blue home planet we fire up our engines. First stop: Mercury!',
    },
    storyConclusion: {
      es: '¡Gran trabajo! Aprendimos que Mercurio da la vuelta al Sol más rápido que nadie.',
      en: 'Great job! We learned that Mercury orbits the Sun faster than any other planet.',
    },
    crewDialogue: {
      es: '¡El calor del Sol es intenso aquí y muchos meteoritos cruzan nuestra ruta!',
      en: 'Solar heat is intense here and meteorites are crossing our flight path!',
    },
    mainMissionTitle: {
      es: 'Cruza la órbita cercana al Sol y explora sus cráteres polares',
      en: 'Cross the inner orbit and scan Mercury’s polar craters',
    },
    secondaryChallengeTitle: {
      es: 'Calcula el combustible solar y repara los cables térmicos',
      en: 'Calculate solar fuel and repair thermal shield cables',
    },
    runnerConfig: {
      targetDistanceKm: 900,
      baseSpeed: 270,
      hazardSpawnRate: 1.0,
      meteorColor: '#B8B2A6',
      bgTint: '#1D2939',
      hazardLabel: { es: 'Meteoritos solares', en: 'Solar meteorites' },
      collectibleRock: {
        name: { es: 'Piedras de Hierro', en: 'Iron Stones' },
        color: '#E5E7EB',
        glowColor: '#FFD166',
      },
    },
    emergencyType: 'CABLES',
    emergencyTitle: { es: 'Reparación de Cables del Escudo', en: 'Thermal Shield Cable Repair' },
    emergencyBrief: {
      es: '¡Une cada conector de la izquierda con su pareja del mismo color a la derecha!',
      en: 'Match each connector on the left with the same color on the right!',
    },
    mathMechanic: 'fuel_calc',
    mathThemePrompt: {
      es: 'Calculamos el combustible exacto antes de entrar en órbita.',
      en: 'Calculate the exact fuel needed before entering orbit.',
    },
    detectiveClues: [
      {
        category: { es: 'Superficie', en: 'Surface' },
        label: { es: 'Terreno rocoso', en: 'Rocky terrain' },
        value: { es: 'Lleno de cráteres parecidos a los de nuestra Luna.', en: 'Covered in craters similar to Earth’s Moon.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'Cambio extremo', en: 'Extreme swings' },
        value: { es: 'Hasta 430 °C de día y -180 °C en la noche.', en: 'Up to 430 °C by day and -180 °C at night.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Exosfera muy fina', en: 'Ultra-thin exosphere' },
        value: { es: 'Casi no tiene aire para guardar el calor.', en: 'Almost no air to trap heat.' },
      },
      {
        category: { es: 'Gravedad y Agua', en: 'Gravity & Water' },
        label: { es: 'Polos sombríos', en: 'Shadowed poles' },
        value: { es: 'Hay hielo escondido en cráteres sin luz solar.', en: 'Water ice hides inside shadowed polar craters.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Por qué Mercurio cambia tanto de temperatura entre el día y la noche?',
      en: 'Why does Mercury’s temperature swing so much between day and night?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Porque casi no tiene atmósfera que guarde el calor', en: 'Because it has almost no atmosphere to hold heat' },
        isCorrect: true,
        feedback: {
          es: '¡Exacto! Sin una atmósfera gruesa como manta, el calor se escapa rápido.',
          en: 'Spot on! Without a thick blanket of air, heat escapes quickly at night.',
        },
      },
      {
        id: 'b',
        label: { es: 'Porque está cubierto de océanos gigantes', en: 'Because it is covered in giant oceans' },
        isCorrect: false,
        feedback: {
          es: 'Pista: Mercurio es rocoso y seco; solo guarda un poco de hielo en sus polos.',
          en: 'Hint: Mercury is rocky and dry, with only hidden ice at its poles.',
        },
      },
    ],
    explorationLabTitle: { es: 'Sonda Térmica en Mercurio', en: 'Mercury Thermal Probe' },
    explorationLabGuide: {
      es: 'Escanea 2 puntos clave estudiados por la nave MESSENGER de la NASA.',
      en: 'Scan 2 key sites studied by NASA’s MESSENGER spacecraft.',
    },
    explorationSpots: [
      {
        id: 'merc_spot_1',
        title: { es: 'Cuenca Caloris', en: 'Caloris Basin' },
        subtitle: { es: 'Cráter gigante', en: 'Giant impact crater' },
        xPercent: 34,
        yPercent: 46,
        discoveryText: {
          es: 'Un antiguo impacto creó esta cuenca de más de 1,500 km de ancho.',
          en: 'An ancient impact carved this huge basin over 1,500 km wide.',
        },
        nasaMissionRef: 'NASA MESSENGER (2011–2015)',
        discoveryStamp: { es: 'Sello Cuenca Caloris', en: 'Caloris Basin Stamp' },
      },
      {
        id: 'merc_spot_2',
        title: { es: 'Cráter Polar en Sombra', en: 'Shadowed Polar Crater' },
        subtitle: { es: 'Hielo oculto', en: 'Hidden water ice' },
        xPercent: 64,
        yPercent: 26,
        discoveryText: {
          es: 'Aunque está cerca del Sol, el fondo en sombra permanente conserva hielo.',
          en: 'Even near the Sun, permanently shadowed floors preserve water ice.',
        },
        nasaMissionRef: 'NASA MESSENGER',
        discoveryStamp: { es: 'Sello Hielo Polar', en: 'Polar Ice Stamp' },
      },
    ],
    questions: [
      {
        id: 'merc_q1',
        prompt: {
          es: '¿Cuánto tarda Mercurio en dar una vuelta completa al Sol (su año)?',
          en: 'How long does Mercury take to orbit the Sun once (its year)?',
        },
        options: {
          es: ['Solo 88 días terrestres', '365 días exactos', '10 años terrestres'],
          en: ['Only 88 Earth days', '365 days', '10 Earth years'],
        },
        correctIndex: 0,
        hint: { es: 'Al estar tan cerca del Sol, su recorrido es el más corto.', en: 'Being closest to the Sun, its path is the shortest.' },
        explanation: {
          es: 'Mercurio completa su órbita en apenas 88 días terrestres.',
          en: 'Mercury completes one orbit in just 88 Earth days.',
        },
        funFact: {
          es: '¡En Mercurio celebrarías tu cumpleaños cada tres meses de la Tierra!',
          en: 'On Mercury, you would celebrate a birthday every three Earth months!',
        },
      },
    ],
    badge: {
      id: 'badge_mercury',
      name: { es: 'Guardián Solar', en: 'Solar Guardian' },
      description: { es: 'Exploraste Mercurio.', en: 'Explored Mercury.' },
    },
    unlockAccessoryId: 'antena_oro',
    nasaData: {
      title: { es: 'Mercurio — Datos verificados NASA', en: 'Mercury — Verified NASA Facts' },
      nasaQuery: 'Mercury MESSENGER planet',
      sourceName: 'NASA Solar System Exploration / MESSENGER',
      missionNames: 'Mariner 10, MESSENGER, BepiColombo',
      credit: 'NASA / JHUAPL / Carnegie Institution of Washington',
      summaryForKids: {
        es: 'Mercurio es el planeta más pequeño y cercano al Sol, lleno de cráteres y con temperaturas extremas.',
        en: 'Mercury is the smallest planet and closest to the Sun, covered in craters with extreme day-night temperatures.',
      },
      verifiedMetrics: {
        diameterKm: '4,879 km',
        dayLength: { es: '59 días terrestres', en: '59 Earth days' },
        yearLength: { es: '88 días terrestres', en: '88 Earth days' },
        avgTemp: '-180 °C a 430 °C',
        moons: { es: '0 lunas', en: '0 moons' },
      },
      fallbackImageCaption: {
        es: 'Mosaico en color realzado de Mercurio capturado por la nave MESSENGER de la NASA.',
        en: 'Enhanced-color mosaic of Mercury captured by NASA’s MESSENGER spacecraft.',
      },
    },
  },
  {
    id: 'venus',
    order: 2,
    name: { es: 'Venus', en: 'Venus' },
    subtitle: { es: 'Cap. 2 · El mundo bajo nubes doradas', en: 'Ch. 2 · The World Under Golden Clouds' },
    palette: { primary: '#D7C49E', secondary: '#B99E72', atmosphere: '#E9DFC4', accent: '#C8C7A5' },
    radiusVisual: 30,
    storyIntro: {
      es: 'Volamos hacia Venus. Sus nubes espesas guardan un calor intenso y giran en dirección contraria.',
      en: 'We fly toward Venus. Its thick clouds trap intense heat and the planet spins backward.',
    },
    storyConclusion: {
      es: '¡Excelente! Descubriste por qué el efecto invernadero hace de Venus el planeta más caliente.',
      en: 'Awesome! You discovered why the greenhouse effect makes Venus the hottest planet.',
    },
    crewDialogue: {
      es: '¡Atención! Las nubes densas dañaron el sistema de oxígeno de la cabina.',
      en: 'Alert! Dense clouds affected our cabin oxygen seals.',
    },
    mainMissionTitle: {
      es: 'Estabiliza el oxígeno y estudia los volcanes mapeados por radar',
      en: 'Stabilize cabin oxygen and inspect radar-mapped volcanoes',
    },
    secondaryChallengeTitle: {
      es: 'Sella las fugas de cabina y descifra el patrón de la compuerta',
      en: 'Seal hull leaks and crack the airlock number pattern',
    },
    runnerConfig: {
      targetDistanceKm: 1050,
      baseSpeed: 295,
      hazardSpawnRate: 1.12,
      meteorColor: '#C49A6C',
      bgTint: '#2E2118',
      hazardLabel: { es: 'Rocas ardientes', en: 'Fiery rocks' },
      collectibleRock: {
        name: { es: 'Piedras de Azufre', en: 'Sulfur Rocks' },
        color: '#FFD166',
        glowColor: '#FF9F1C',
      },
    },
    emergencyType: 'OXYGEN',
    emergencyTitle: { es: 'Emergencia de Oxígeno en Cabina', en: 'Cabin Oxygen Emergency' },
    emergencyBrief: {
      es: 'Toca las 5 fugas para sellarlas y luego presiona el botón para equilibrar el oxígeno.',
      en: 'Tap all 5 leaks to seal them, then pump oxygen back into the safe sky-blue zone.',
    },
    mathMechanic: 'pattern_lock',
    mathThemePrompt: {
      es: 'Desciframos el código numérico del laboratorio atmosférico.',
      en: 'Crack the numerical code for the atmospheric lab.',
    },
    detectiveClues: [
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Manta espesa', en: 'Thick blanket' },
        value: { es: 'Dióxido de carbono 90 veces más pesado que en la Tierra.', en: 'Carbon dioxide 90 times heavier than Earth’s air.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'El más caliente', en: 'Hottest planet' },
        value: { es: 'Alcanza unos 465 °C, más caliente que Mercurio.', en: 'Reaches about 465 °C, hotter than Mercury.' },
      },
      {
        category: { es: 'Superficie', en: 'Surface' },
        label: { es: 'Volcanes y montañas', en: 'Volcanoes & mountains' },
        value: { es: 'Miles de volcanes ocultos bajo nubes amarillentas.', en: 'Thousands of volcanoes hidden under yellow clouds.' },
      },
      {
        category: { es: 'Gravedad y Agua', en: 'Rotation & Water' },
        label: { es: 'Giro al revés', en: 'Backward spin' },
        value: { es: 'Rota en sentido contrario al de la Tierra.', en: 'Spins in the opposite direction to Earth.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Por qué Venus es más caliente que Mercurio aunque está más lejos del Sol?',
      en: 'Why is Venus hotter than Mercury even though it is farther from the Sun?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Su espesa atmósfera atrapa el calor como un invernadero', en: 'Its thick atmosphere traps heat like a greenhouse' },
        isCorrect: true,
        feedback: { es: '¡Brillante! Las nubes y el dióxido de carbono retienen el calor solar.', en: 'Brilliant! Thick clouds and CO₂ hold the Sun’s heat inside.' },
      },
      {
        id: 'b',
        label: { es: 'Porque brilla con luz propia como una estrella', en: 'Because it shines with its own starlight' },
        isCorrect: false,
        feedback: { es: 'Pista: Venus solo refleja muy bien la luz solar gracias a sus nubes.', en: 'Hint: Venus only reflects sunlight brightly off its clouds.' },
      },
    ],
    explorationLabTitle: { es: 'Sonda Radar en Venus', en: 'Venus Radar Probe' },
    explorationLabGuide: {
      es: 'Explora las nubes brillantes y las montañas descubiertas por la nave Magallanes.',
      en: 'Explore bright clouds and mountains mapped by NASA’s Magellan spacecraft.',
    },
    explorationSpots: [
      {
        id: 'venus_spot_1',
        title: { es: 'Nubes Superiores', en: 'Upper Cloud Deck' },
        subtitle: { es: 'Reflejo brillante', en: 'Bright sunlight reflector' },
        xPercent: 40,
        yPercent: 34,
        discoveryText: {
          es: 'Sus nubes reflejan tanta luz solar que Venus brilla muchísimo en nuestro cielo nocturno.',
          en: 'Its clouds reflect so much sunlight that Venus shines brightly in our night sky.',
        },
        nasaMissionRef: 'NASA Pioneer Venus',
        discoveryStamp: { es: 'Sello Nubes de Venus', en: 'Venus Clouds Stamp' },
      },
      {
        id: 'venus_spot_2',
        title: { es: 'Maxwell Montes', en: 'Maxwell Montes' },
        subtitle: { es: 'Montañas vistas por radar', en: 'Radar-mapped peaks' },
        xPercent: 60,
        yPercent: 60,
        discoveryText: {
          es: 'La nave Magallanes usó ondas de radar para atravesar las nubes y medir estas montañas.',
          en: 'Magellan used radar waves to see through the clouds and map these mountains.',
        },
        nasaMissionRef: 'NASA Magellan',
        discoveryStamp: { es: 'Sello Radar Magallanes', en: 'Magellan Radar Stamp' },
      },
    ],
    questions: [
      {
        id: 'venus_q1',
        prompt: {
          es: 'Si miraras el amanecer en Venus, ¿por dónde saldría el Sol?',
          en: 'If you watched sunrise on Venus, where would the Sun rise?',
        },
        options: {
          es: ['Por el Oeste, porque gira al revés', 'Por el Norte', 'Nunca sale el Sol'],
          en: ['In the West, because it spins backward', 'In the North', 'The Sun never rises'],
        },
        correctIndex: 0,
        hint: { es: 'Venus gira en dirección opuesta a la Tierra.', en: 'Venus rotates in the opposite direction of Earth.' },
        explanation: {
          es: 'Al girar al revés, el Sol aparece por el Oeste en Venus.',
          en: 'Because of its backward spin, the Sun rises in the West on Venus.',
        },
        funFact: {
          es: 'Un día en Venus dura más tiempo que su propio año.',
          en: 'A single day on Venus lasts longer than its entire year.',
        },
      },
    ],
    badge: {
      id: 'badge_venus',
      name: { es: 'Navegante de Nubes', en: 'Cloud Navigator' },
      description: { es: 'Descifraste Venus.', en: 'Unlocked Venus secrets.' },
    },
    nasaData: {
      title: { es: 'Venus — Datos verificados NASA', en: 'Venus — Verified NASA Facts' },
      nasaQuery: 'Venus Magellan planet',
      sourceName: 'NASA Solar System Exploration / Magellan',
      missionNames: 'Mariner 2, Pioneer Venus, Magellan, DAVINCI',
      credit: 'NASA / JPL',
      summaryForKids: {
        es: 'Venus tiene casi el tamaño de la Tierra, pero su atmósfera espesa provoca el efecto invernadero más fuerte del Sistema Solar.',
        en: 'Venus is nearly Earth’s size, but its thick atmosphere creates the strongest greenhouse effect in our solar system.',
      },
      verifiedMetrics: {
        diameterKm: '12,104 km',
        dayLength: { es: '243 días terrestres', en: '243 Earth days' },
        yearLength: { es: '225 días terrestres', en: '225 Earth days' },
        avgTemp: '465 °C',
        moons: { es: '0 lunas', en: '0 moons' },
      },
      fallbackImageCaption: {
        es: 'Vista global de Venus generada con radar por la misión Magallanes de la NASA.',
        en: 'Global radar view of Venus mapped by NASA’s Magellan mission.',
      },
    },
  },
  {
    id: 'earth',
    order: 3,
    name: { es: 'Tierra', en: 'Earth' },
    subtitle: { es: 'Cap. 3 · Océanos, clima y vida', en: 'Ch. 3 · Oceans, Climate & Life' },
    palette: { primary: '#A5C8C2', secondary: '#6B7E65', atmosphere: '#D6ECE8', accent: '#C8C7A5' },
    radiusVisual: 32,
    storyIntro: {
      es: '¡Llegamos a la Tierra! Sus océanos azules, atmósfera protectora y biodiversidad la hacen única.',
      en: 'We reached Earth! Its blue oceans, protective atmosphere, and biodiversity make it one of a kind.',
    },
    storyConclusion: {
      es: '¡Maravilloso! Ahora sabemos cómo los satélites cuidan nuestro clima y océanos.',
      en: 'Wonderful! Now we know how satellites watch over Earth’s climate and oceans.',
    },
    crewDialogue: {
      es: '¡Los satélites Terra y Aqua envían datos del clima! Primero ajustemos la energía solar.',
      en: 'Terra and Aqua satellites are sending climate data! Let’s align our solar panels first.',
    },
    mainMissionTitle: {
      es: 'Observa los océanos, la atmósfera y la biodiversidad desde órbita',
      en: 'Observe oceans, atmosphere, and biodiversity from orbit',
    },
    secondaryChallengeTitle: {
      es: 'Orienta los paneles solares y reparte recursos con la tripulación',
      en: 'Align solar panels and share supplies with the crew',
    },
    runnerConfig: {
      targetDistanceKm: 1150,
      baseSpeed: 315,
      hazardSpawnRate: 1.2,
      meteorColor: '#B8B3A2',
      bgTint: '#142A3E',
      hazardLabel: { es: 'Meteoritos orbitales', en: 'Orbital meteorites' },
      collectibleRock: {
        name: { es: 'Rocas de Cuarzo', en: 'Quartz Stones' },
        color: '#38BDF8',
        glowColor: '#E0F2FE',
      },
    },
    emergencyType: 'ENERGY',
    emergencyTitle: { es: 'Red de Energía Solar', en: 'Solar Power Array' },
    emergencyBrief: {
      es: 'Toca cada panel hasta orientar las 4 barras doradas hacia arriba para recargar la nave.',
      en: 'Tap each panel until all 4 golden bars point straight up to recharge the ship.',
    },
    mathMechanic: 'resource_sharing',
    mathThemePrompt: {
      es: 'Distribuimos los suministros de observación entre el equipo.',
      en: 'Share observation supplies equally with the crew.',
    },
    detectiveClues: [
      {
        category: { es: 'Agua y Océanos', en: 'Water & Oceans' },
        label: { es: 'Planeta azul', en: 'Blue planet' },
        value: { es: 'Más del 70% de su superficie está cubierta de agua líquida.', en: 'Over 70% of its surface is covered by liquid oceans.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Aire respirable', en: 'Breathable air' },
        value: { es: '78% nitrógeno y 21% oxígeno que protege del Sol y meteoritos.', en: '78% nitrogen and 21% oxygen protecting life.' },
      },
      {
        category: { es: 'Clima', en: 'Climate' },
        label: { es: 'Temperatura ideal', en: 'Just-right warmth' },
        value: { es: 'Promedio cercano a 15 °C, ideal para bosques y mares.', en: 'Average around 15 °C, supporting forests and seas.' },
      },
      {
        category: { es: 'Observación', en: 'Observation' },
        label: { es: 'Satélites científicos', en: 'Science satellites' },
        value: { es: 'Miden huracanes, nubes, selvas y temperatura del mar.', en: 'Track storms, clouds, forests, and ocean temperatures.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Para qué sirven los satélites de observación terrestre de la NASA?',
      en: 'What do NASA’s Earth-observing satellites help scientists do?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Vigilar el clima, océanos, huracanes y bosques', en: 'Monitor weather, oceans, hurricanes, and forests' },
        isCorrect: true,
        feedback: { es: '¡Correcto! Ayudan a cuidar la Tierra y prevenir desastres naturales.', en: 'Correct! They help protect Earth and track natural events.' },
      },
      {
        id: 'b',
        label: { es: 'Empujar las nubes con hélices gigantes', en: 'Push clouds with giant propellers' },
        isCorrect: false,
        feedback: { es: 'Pista: Los satélites solo observan y toman mediciones con cámaras y sensores.', en: 'Hint: Satellites only observe and measure with cameras and sensors.' },
      },
    ],
    explorationLabTitle: { es: 'Observatorio Tierra NASA', en: 'NASA Earth Observatory' },
    explorationLabGuide: {
      es: 'Escanea los océanos y los bosques desde la órbita terrestre.',
      en: 'Scan Earth’s oceans and biodiversity zones from orbit.',
    },
    explorationSpots: [
      {
        id: 'earth_spot_1',
        title: { es: 'Corrientes Oceánicas', en: 'Ocean Currents' },
        subtitle: { es: 'Satélite Aqua / Terra', en: 'Aqua & Terra Satellites' },
        xPercent: 36,
        yPercent: 52,
        discoveryText: {
          es: 'Los océanos guardan calor del Sol y regulan el clima de todo el planeta.',
          en: 'Oceans store solar heat and help regulate Earth’s entire climate.',
        },
        nasaMissionRef: 'NASA Earth Observatory',
        discoveryStamp: { es: 'Sello Océano Azul', en: 'Blue Ocean Stamp' },
      },
      {
        id: 'earth_spot_2',
        title: { es: 'Bosques y Biodiversidad', en: 'Forests & Biodiversity' },
        subtitle: { es: 'Observación satelital', en: 'Satellite monitoring' },
        xPercent: 64,
        yPercent: 42,
        discoveryText: {
          es: 'Desde el espacio podemos ver la salud de selvas, nubes y ecosistemas vivos.',
          en: 'From space we can measure healthy rainforests, clouds, and living ecosystems.',
        },
        nasaMissionRef: 'NASA Landsat',
        discoveryStamp: { es: 'Sello Tierra Viva', en: 'Living Earth Stamp' },
      },
    ],
    questions: [
      {
        id: 'earth_q1',
        prompt: {
          es: '¿Qué gases forman la mayor parte de la atmósfera de la Tierra?',
          en: 'Which two gases make up most of Earth’s atmosphere?',
        },
        options: {
          es: ['Nitrógeno y oxígeno', 'Helio y oro', 'Solo humo de volcán'],
          en: ['Nitrogen and oxygen', 'Helium and gold', 'Only volcano smoke'],
        },
        correctIndex: 0,
        hint: { es: 'Uno de ellos es el gas que respiramos todos los días (21%).', en: 'One of them is the gas we breathe every day (21%).' },
        explanation: {
          es: 'La atmósfera terrestre tiene cerca de 78% de nitrógeno y 21% de oxígeno.',
          en: 'Earth’s atmosphere is about 78% nitrogen and 21% oxygen.',
        },
        funFact: {
          es: 'Desde el espacio, la capa de aire que protege la Tierra se ve como una delgada línea azul.',
          en: 'From space, Earth’s protective air looks like a thin glowing blue line.',
        },
      },
    ],
    badge: {
      id: 'badge_earth',
      name: { es: 'Observador Azul', en: 'Blue Planet Watcher' },
      description: { es: 'Estudiaste el clima y océanos de la Tierra.', en: 'Studied Earth’s climate and oceans.' },
    },
    unlockAccessoryId: 'mochila_solar',
    nasaData: {
      title: { es: 'Tierra — Datos verificados NASA', en: 'Earth — Verified NASA Facts' },
      nasaQuery: 'Earth Blue Marble climate',
      sourceName: 'NASA Earth Observatory',
      missionNames: 'Terra, Aqua, Landsat, Suomi NPP',
      credit: 'NASA Goddard Space Flight Center',
      summaryForKids: {
        es: 'La Tierra es nuestro hogar con océanos líquidos, aire respirable y millones de seres vivos observados por satélites.',
        en: 'Earth is our home with liquid oceans, breathable air, and millions of living species monitored by satellites.',
      },
      verifiedMetrics: {
        diameterKm: '12,742 km',
        dayLength: { es: '24 horas', en: '24 hours' },
        yearLength: { es: '365.25 días', en: '365.25 days' },
        avgTemp: '15 °C',
        moons: { es: '1 luna', en: '1 moon' },
      },
      fallbackImageCaption: {
        es: 'Vista satelital "Blue Marble" de la Tierra capturada por la NASA.',
        en: 'NASA’s satellite "Blue Marble" view of planet Earth.',
      },
    },
  },
  {
    id: 'mars',
    order: 4,
    name: { es: 'Marte', en: 'Mars' },
    subtitle: { es: 'Cap. 4 · El planeta rojo y los rovers', en: 'Ch. 4 · The Red Planet & Rovers' },
    palette: { primary: '#C98A7A', secondary: '#9F6253', atmosphere: '#DFB6A9', accent: '#C8BCA5' },
    radiusVisual: 26,
    storyIntro: {
      es: 'Aterrizamos cerca del Cráter Jezero en Marte, donde trabajan los rovers robóticos de la NASA.',
      en: 'We arrive near Jezero Crater on Mars, home to NASA’s robotic explorers.',
    },
    storyConclusion: {
      es: '¡Increíble! Descubriste el secreto del polvo oxidado y la historia del agua antigua en Marte.',
      en: 'Awesome! You uncovered the secret of Mars’s rusty dust and ancient water.',
    },
    crewDialogue: {
      es: '¡El polvo marciano bloqueó la antena! Sincronicemos la señal de radio.',
      en: 'Martian dust blocked our antenna! Let’s tune the radio signal.',
    },
    mainMissionTitle: {
      es: 'Restablece comunicaciones y explora rocas con óxido de hierro',
      en: 'Restore radio contact and scan iron-oxide rocks',
    },
    secondaryChallengeTitle: {
      es: 'Sintoniza la onda y resuelve el cálculo del rover',
      en: 'Tune the antenna wave and solve rover math',
    },
    runnerConfig: {
      targetDistanceKm: 1250,
      baseSpeed: 335,
      hazardSpawnRate: 1.28,
      meteorColor: '#B88474',
      bgTint: '#2E1A18',
      hazardLabel: { es: 'Meteoritos férricos', en: 'Iron meteorites' },
      collectibleRock: {
        name: { es: 'Piedras de Óxido', en: 'Red Oxide Rocks' },
        color: '#FF7B3D',
        glowColor: '#FFD166',
      },
    },
    emergencyType: 'COMMUNICATION',
    emergencyTitle: { es: 'Sincronización de Antena', en: 'Deep Space Dish Alignment' },
    emergencyBrief: {
      es: 'Mueve los controles hasta que nuestra onda azul coincida con la onda dorada.',
      en: 'Slide the controls until our blue wave matches the golden beacon wave.',
    },
    mathMechanic: 'energy_ops',
    mathThemePrompt: {
      es: 'Calculamos la energía que necesita el rover para rodar por el cráter.',
      en: 'Calculate the energy our rover needs to cross the crater.',
    },
    detectiveClues: [
      {
        category: { es: 'Superficie', en: 'Surface' },
        label: { es: 'Óxido de hierro', en: 'Iron oxide dust' },
        value: { es: 'Suelo cubierto de polvo rico en hierro oxidado.', en: 'Soil covered in iron-rich rusty dust.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'Desierto frío', en: 'Cold desert' },
        value: { es: 'Promedio de -63 °C con casquetes de hielo.', en: 'Average -63 °C with polar ice caps.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Aire delgado', en: 'Thin air' },
        value: { es: 'Atmósfera fina de dióxido de carbono.', en: 'Thin carbon dioxide atmosphere.' },
      },
      {
        category: { es: 'Exploración', en: 'Robotic Rovers' },
        label: { es: 'Rovers NASA', en: 'NASA Rovers' },
        value: { es: 'Curiosity y Perseverance estudian rocas y antiguos lagos.', en: 'Curiosity and Perseverance study ancient lakebeds.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Por qué Marte se ve de color rojo anaranjado desde el espacio?',
      en: 'Why does Mars look reddish-orange from space?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Por el óxido de hierro en su polvo y rocas', en: 'Because of iron oxide (rust) in its dust and rocks' },
        isCorrect: true,
        feedback: { es: '¡Exacto! El hierro oxidado tiñe todo el paisaje marciano.', en: 'Spot on! Rusty iron minerals give Mars its red tint.' },
      },
      {
        id: 'b',
        label: { es: 'Porque está cubierto de océanos de lava', en: 'Because it is covered in boiling lava' },
        isCorrect: false,
        feedback: { es: 'Pista: Marte es un desierto muy frío (-63 °C).', en: 'Hint: Mars is actually a freezing desert (-63 °C).' },
      },
    ],
    explorationLabTitle: { es: 'Laboratorio Rover en Cráter Jezero', en: 'Jezero Crater Rover Lab' },
    explorationLabGuide: {
      es: 'Investiga el suelo rojizo y el antiguo delta donde hubo agua.',
      en: 'Inspect rusty dunes and the ancient river delta where water once flowed.',
    },
    explorationSpots: [
      {
        id: 'mars_spot_1',
        title: { es: 'Dunas de Óxido de Hierro', en: 'Iron Oxide Dunes' },
        subtitle: { es: 'Análisis mineral', en: 'Mineral scan' },
        xPercent: 32,
        yPercent: 55,
        discoveryText: {
          es: 'Los rovers usan láseres e instrumentos químicos para estudiar estas rocas.',
          en: 'Rovers use lasers and chemical sensors to examine these rocks.',
        },
        nasaMissionRef: 'NASA Perseverance',
        discoveryStamp: { es: 'Sello Rover Rojo', en: 'Red Rover Stamp' },
      },
      {
        id: 'mars_spot_2',
        title: { es: 'Delta del Cráter Jezero', en: 'Jezero Crater Delta' },
        subtitle: { es: 'Lago antiguo', en: 'Ancient lakebed' },
        xPercent: 66,
        yPercent: 40,
        discoveryText: {
          es: 'Hace miles de millones de años aquí corrió agua líquida formando un lago.',
          en: 'Billions of years ago liquid water flowed here and formed a lake.',
        },
        nasaMissionRef: 'NASA Perseverance & Ingenuity',
        discoveryStamp: { es: 'Sello Cráter Jezero', en: 'Jezero Crater Stamp' },
      },
    ],
    questions: [
      {
        id: 'mars_q1',
        prompt: {
          es: '¿Cómo se llama el volcán más alto del Sistema Solar ubicado en Marte?',
          en: 'What is the name of the tallest volcano in our solar system, on Mars?',
        },
        options: {
          es: ['Monte Olimpo (Olympus Mons)', 'Monte Vesubio', 'Monte Pacífico'],
          en: ['Olympus Mons', 'Mount Vesuvius', 'Mount Pacific'],
        },
        correctIndex: 0,
        hint: { es: 'Lleva el nombre de la montaña de los antiguos mitos griegos.', en: 'It shares its name with the mountain from Greek myths.' },
        explanation: {
          es: 'Olympus Mons mide casi 22 km de altura, casi el triple que el Everest.',
          en: 'Olympus Mons is nearly 22 km tall—almost three times taller than Mount Everest.',
        },
        funFact: {
          es: 'El pequeño helicóptero Ingenuity logró volar 72 veces en el cielo de Marte.',
          en: 'NASA’s small Ingenuity helicopter flew 72 times in the thin Martian sky.',
        },
      },
    ],
    badge: {
      id: 'badge_mars',
      name: { es: 'Piloto de Rover', en: 'Rover Pilot' },
      description: { es: 'Exploraste Marte.', en: 'Explored Mars.' },
    },
    unlockAccessoryId: 'insignia_nasa',
    nasaData: {
      title: { es: 'Marte — Datos verificados NASA', en: 'Mars — Verified NASA Facts' },
      nasaQuery: 'Mars Perseverance Jezero',
      sourceName: 'NASA Mars Exploration Program',
      missionNames: 'Curiosity, Perseverance, Ingenuity, MRO',
      credit: 'NASA / JPL-Caltech / MSSS',
      summaryForKids: {
        es: 'Marte es un planeta rocoso frío con un día de 24.6 horas y rovers robóticos explorando su pasado acuático.',
        en: 'Mars is a cold rocky world with a 24.6-hour day and robotic rovers exploring its watery past.',
      },
      verifiedMetrics: {
        diameterKm: '6,779 km',
        dayLength: { es: '24.6 horas', en: '24.6 hours' },
        yearLength: { es: '687 días terrestres', en: '687 Earth days' },
        avgTemp: '-63 °C',
        moons: { es: '2 lunas (Fobos y Deimos)', en: '2 moons (Phobos & Deimos)' },
      },
      fallbackImageCaption: {
        es: 'Paisaje del Cráter Jezero capturado por el rover Perseverance de la NASA.',
        en: 'Jezero Crater landscape captured by NASA’s Perseverance rover.',
      },
    },
  },
  {
    id: 'jupiter',
    order: 5,
    name: { es: 'Júpiter', en: 'Jupiter' },
    subtitle: { es: 'Cap. 5 · El gigante de tormentas', en: 'Ch. 5 · The Giant of Storms' },
    palette: { primary: '#D5C3AA', secondary: '#B59678', atmosphere: '#E8DAC5', accent: '#C99874' },
    radiusVisual: 44,
    storyIntro: {
      es: '¡Júpiter es gigantesco! Es un mundo de nubes arremolinadas sin suelo sólido.',
      en: 'Jupiter is enormous! It is a giant world of swirling clouds with no solid ground.',
    },
    storyConclusion: {
      es: '¡Genial! Estudiaste la Gran Mancha Roja y la luna volcánica Ío junto a la sonda Juno.',
      en: 'Great! You studied the Great Red Spot and volcanic moon Io with Juno.',
    },
    crewDialogue: {
      es: '¡La gravedad de Júpiter movió nuestros cables! Reconéctalos rápido.',
      en: 'Jupiter’s huge gravity shook our cables loose! Reconnect them!',
    },
    mainMissionTitle: {
      es: 'Sobrevive al cinturón de asteroides y observa la Gran Mancha Roja',
      en: 'Cross the asteroid belt and scan the Great Red Spot',
    },
    secondaryChallengeTitle: {
      es: 'Repara los cables y mide la zona segura con geometría',
      en: 'Repair cables and solve geometry perimeter math',
    },
    runnerConfig: {
      targetDistanceKm: 1350,
      baseSpeed: 355,
      hazardSpawnRate: 1.35,
      meteorColor: '#C8BCA5',
      bgTint: '#292116',
      hazardLabel: { es: 'Asteroides gigantes', en: 'Giant asteroids' },
      collectibleRock: {
        name: { es: 'Piedras de Tormenta', en: 'Storm Gems' },
        color: '#FFB703',
        glowColor: '#FFF3B0',
      },
    },
    emergencyType: 'CABLES',
    emergencyTitle: { es: 'Cables del Estabilizador', en: 'Stabilizer Cable Repair' },
    emergencyBrief: {
      es: 'Empareja los 4 cables de color para mantener estable la órbita.',
      en: 'Match all 4 colored cables to keep our orbit steady.',
    },
    mathMechanic: 'planetary_geometry',
    mathThemePrompt: {
      es: 'Usamos geometría para trazar una órbita segura alrededor de las tormentas.',
      en: 'Use geometry to map a safe orbit around the storms.',
    },
    detectiveClues: [
      {
        category: { es: 'Superficie', en: 'Surface' },
        label: { es: 'Gigante gaseoso', en: 'Gas giant' },
        value: { es: 'Hecho de hidrógeno y helio, sin suelo firme.', en: 'Made of hydrogen and helium with no solid crust.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Gran Mancha Roja', en: 'Great Red Spot' },
        value: { es: 'Tormenta gigante más grande que todo nuestro planeta Tierra.', en: 'A giant storm wider than all of planet Earth.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'Nubes frías', en: 'Cold cloud tops' },
        value: { es: 'Alrededor de -110 °C en sus bandas nubosas.', en: 'Around -110 °C in its upper cloud bands.' },
      },
      {
        category: { es: 'Lunas', en: 'Moons' },
        label: { es: '95 lunas', en: '95 moons' },
        value: { es: 'Europa tiene hielo sobre un océano e Ío tiene volcanes.', en: 'Europa hides an icy ocean and Io erupts with volcanoes.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Por qué no podríamos aterrizar con botas sobre Júpiter como en Marte?',
      en: 'Why couldn’t astronauts land with boots on Jupiter like on Mars?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Porque es un gigante de gas y líquido sin suelo sólido', en: 'Because it is a gas giant with no solid ground' },
        isCorrect: true,
        feedback: { es: '¡Exacto! Está hecho principalmente de hidrógeno y helio.', en: 'Correct! It is made mostly of hydrogen and helium.' },
      },
      {
        id: 'b',
        label: { es: 'Porque es más pequeño que una pelota', en: 'Because it is smaller than a soccer ball' },
        isCorrect: false,
        feedback: { es: 'Pista: ¡Es el planeta más grande del Sistema Solar!', en: 'Hint: Jupiter is actually the largest planet in our solar system!' },
      },
    ],
    explorationLabTitle: { es: 'Sonda Juno en Júpiter', en: 'Juno Probe at Jupiter' },
    explorationLabGuide: {
      es: 'Escanea la Gran Mancha Roja y la luna volcánica Ío.',
      en: 'Scan the Great Red Spot and volcanic moon Io.',
    },
    explorationSpots: [
      {
        id: 'jup_spot_1',
        title: { es: 'Gran Mancha Roja', en: 'Great Red Spot' },
        subtitle: { es: 'Huracán gigante', en: 'Giant hurricane' },
        xPercent: 45,
        yPercent: 58,
        discoveryText: {
          es: 'Esta tormenta lleva girando cientos de años con vientos velocísimos.',
          en: 'This storm has been swirling for centuries with super-fast winds.',
        },
        nasaMissionRef: 'NASA Juno',
        discoveryStamp: { es: 'Sello Mancha Roja', en: 'Red Spot Stamp' },
      },
      {
        id: 'jup_spot_2',
        title: { es: 'Luna Ío', en: 'Moon Io' },
        subtitle: { es: 'Volcanes activos', en: 'Active volcanoes' },
        xPercent: 75,
        yPercent: 30,
        discoveryText: {
          es: 'Ío es el mundo con más volcanes activos de todo el Sistema Solar.',
          en: 'Io is the most volcanically active world in our solar system.',
        },
        nasaMissionRef: 'NASA Galileo & Juno',
        discoveryStamp: { es: 'Sello Volcanes de Ío', en: 'Io Volcano Stamp' },
      },
    ],
    questions: [
      {
        id: 'jup_q1',
        prompt: {
          es: 'Aunque Júpiter es enorme, ¿cuánto dura un día (una vuelta sobre sí mismo) allí?',
          en: 'Even though Jupiter is huge, how long is one day (one spin) there?',
        },
        options: {
          es: ['Casi 10 horas, ¡gira rapidísimo!', '100 días terrestres', '5 años'],
          en: ['About 10 hours—the fastest spin!', '100 Earth days', '5 years'],
        },
        correctIndex: 0,
        hint: { es: 'Su giro veloz estira las nubes formando rayas de colores.', en: 'Its fast spin stretches clouds into colorful stripes.' },
        explanation: {
          es: 'Un día en Júpiter dura apenas 9.9 horas terrestres.',
          en: 'A day on Jupiter lasts just 9.9 Earth hours.',
        },
        funFact: {
          es: 'Dentro de Júpiter cabrían más de 1,300 planetas del tamaño de la Tierra.',
          en: 'More than 1,300 Earths could fit inside Jupiter.',
        },
      },
    ],
    badge: {
      id: 'badge_jupiter',
      name: { es: 'Cazador de Tormentas', en: 'Storm Tracker' },
      description: { es: 'Estudiaste Júpiter.', en: 'Studied Jupiter.' },
    },
    nasaData: {
      title: { es: 'Júpiter — Datos verificados NASA', en: 'Jupiter — Verified NASA Facts' },
      nasaQuery: 'Jupiter Juno Great Red Spot',
      sourceName: 'NASA Juno Mission',
      missionNames: 'Voyager, Galileo, Juno, Europa Clipper',
      credit: 'NASA / JPL-Caltech / SwRI / MSSS',
      summaryForKids: {
        es: 'Júpiter es el planeta más grande del Sistema Solar, famoso por sus franjas nubosas y su Gran Mancha Roja.',
        en: 'Jupiter is the largest planet in our solar system, famous for its cloud stripes and Great Red Spot.',
      },
      verifiedMetrics: {
        diameterKm: '139,820 km',
        dayLength: { es: '9.9 horas', en: '9.9 hours' },
        yearLength: { es: '11.9 años terrestres', en: '11.9 Earth years' },
        avgTemp: '-110 °C',
        moons: { es: '95 lunas', en: '95 moons' },
      },
      fallbackImageCaption: {
        es: 'Remolinos en las nubes de Júpiter fotografiados por la nave Juno de la NASA.',
        en: 'Swirling clouds on Jupiter photographed by NASA’s Juno spacecraft.',
      },
    },
  },
  {
    id: 'saturn',
    order: 6,
    name: { es: 'Saturno', en: 'Saturn' },
    subtitle: { es: 'Cap. 6 · La joya de los anillos de hielo', en: 'Ch. 6 · Jewel of the Icy Rings' },
    palette: { primary: '#C8C7A5', secondary: '#B2AC86', atmosphere: '#E3E1C7', accent: '#A5C8C2' },
    radiusVisual: 40,
    hasRings: true,
    storyIntro: {
      es: 'Los anillos de Saturno brillan como hielo al sol. ¡Vamos a explorarlos con cuidado!',
      en: 'Saturn’s rings sparkle like sunlit ice. Let’s explore them carefully!',
    },
    storyConclusion: {
      es: '¡Fantástico! Ahora conoces de qué están hechos los anillos y la luna Titán.',
      en: 'Fantastic! Now you know what Saturn’s rings and moon Titan are made of.',
    },
    crewDialogue: {
      es: 'Un trocito de hielo rozó el casco. ¡Sella las fugas de aire antes de analizar los anillos!',
      en: 'An ice chunk grazed our hull. Seal the oxygen leaks before scanning the rings!',
    },
    mainMissionTitle: {
      es: 'Cruza entre partículas heladas y analiza los anillos y Titán',
      en: 'Navigate icy particles and study the rings and Titan',
    },
    secondaryChallengeTitle: {
      es: 'Sella el oxígeno y resuelve las fracciones galácticas',
      en: 'Seal oxygen leaks and solve galactic fractions',
    },
    runnerConfig: {
      targetDistanceKm: 1450,
      baseSpeed: 375,
      hazardSpawnRate: 1.42,
      meteorColor: '#C8C7A5',
      bgTint: '#242318',
      hazardLabel: { es: 'Rocas de anillo', en: 'Ring rocks' },
      collectibleRock: {
        name: { es: 'Cristales de Hielo', en: 'Ice Crystals' },
        color: '#80ED99',
        glowColor: '#D8F3DC',
      },
    },
    emergencyType: 'OXYGEN',
    emergencyTitle: { es: 'Sellado de Cabina en Anillos', en: 'Ring Hull Oxygen Seal' },
    emergencyBrief: {
      es: 'Toca las 5 fugas para sellarlas y bombea oxígeno a la zona verde.',
      en: 'Tap all 5 leaks and pump oxygen up to the safe zone.',
    },
    mathMechanic: 'galactic_fractions',
    mathThemePrompt: {
      es: 'Dividimos muestras de hielo en partes iguales en el laboratorio.',
      en: 'Divide ice samples into equal fractional parts in the lab.',
    },
    detectiveClues: [
      {
        category: { es: 'Anillos', en: 'Rings' },
        label: { es: 'Billones de hielos', en: 'Billions of ice pieces' },
        value: { es: 'Trozos de hielo y roca desde granos de arena hasta montañas.', en: 'Ice and rock chunks from sand-sized to mountain-sized.' },
      },
      {
        category: { es: 'Densidad', en: 'Density' },
        label: { es: 'Muy ligero', en: 'Ultra light' },
        value: { es: 'Es menos denso que el agua líquida.', en: 'Less dense than liquid water.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Hexágono polar', en: 'Polar hexagon' },
        value: { es: 'Tiene una corriente de viento de seis lados en su polo norte.', en: 'Features a six-sided jet stream at its north pole.' },
      },
      {
        category: { es: 'Lunas', en: 'Moons' },
        label: { es: 'Titán y Encélado', en: 'Titan & Enceladus' },
        value: { es: 'Encélado lanza géiseres de agua congelada al espacio.', en: 'Enceladus sprays icy water plumes into space.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿De qué están hechos principalmente los anillos de Saturno?',
      en: 'What are Saturn’s famous rings mostly made of?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Millones de fragmentos de hielo y polvo orbitando', en: 'Millions of orbiting pieces of water ice and rock dust' },
        isCorrect: true,
        feedback: { es: '¡Exacto! No son un disco sólido sino miles de millones de piezas girando.', en: 'Correct! Not one solid disk, but billions of pieces orbiting together.' },
      },
      {
        id: 'b',
        label: { es: 'Un solo puente sólido de oro', en: 'One solid bridge of gold' },
        isCorrect: false,
        feedback: { es: 'Pista: Están hechos de agua congelada brillante.', en: 'Hint: They are made of shiny frozen water!' },
      },
    ],
    explorationLabTitle: { es: 'Misión Cassini en Saturno', en: 'Cassini Mission at Saturn' },
    explorationLabGuide: {
      es: 'Explora el Anillo B y la luna Titán con su neblina dorada.',
      en: 'Explore the B Ring and golden-hazed moon Titan.',
    },
    explorationSpots: [
      {
        id: 'sat_spot_1',
        title: { es: 'Anillo B Principal', en: 'Main B Ring' },
        subtitle: { es: 'Hielo brillante', en: 'Bright ice belt' },
        xPercent: 28,
        yPercent: 52,
        discoveryText: {
          es: 'Los anillos son anchísimos, pero en muchas partes tienen menos de 10 metros de grosor.',
          en: 'The rings span huge distances yet are often less than 10 meters thick!',
        },
        nasaMissionRef: 'NASA / ESA Cassini',
        discoveryStamp: { es: 'Sello Anillos de Hielo', en: 'Icy Rings Stamp' },
      },
      {
        id: 'sat_spot_2',
        title: { es: 'Luna Titán', en: 'Moon Titan' },
        subtitle: { es: 'Atmósfera densa', en: 'Thick atmosphere' },
        xPercent: 72,
        yPercent: 32,
        discoveryText: {
          es: 'Titán es más grande que Mercurio y tiene lagos líquidos de metano frío.',
          en: 'Titan is larger than Mercury and has liquid methane lakes.',
        },
        nasaMissionRef: 'Cassini-Huygens',
        discoveryStamp: { es: 'Sello Luna Titán', en: 'Titan Moon Stamp' },
      },
    ],
    questions: [
      {
        id: 'sat_q1',
        prompt: {
          es: '¿Qué descubrió la nave Cassini saliendo de la luna helada Encélado?',
          en: 'What did NASA’s Cassini spacecraft discover spraying out of moon Enceladus?',
        },
        options: {
          es: ['Géiseres de hielo de un océano subterráneo', 'Lluvia de lava', 'Nubes de algodón'],
          en: ['Icy plumes from a hidden ocean', 'Lava rain', 'Cotton clouds'],
        },
        correctIndex: 0,
        hint: { es: 'Encélado esconde agua líquida salada debajo de su corteza helada.', en: 'Enceladus hides salty liquid water beneath its icy crust.' },
        explanation: {
          es: 'Cassini atravesó columnas de vapor y hielo expulsadas por géiseres en Encélado.',
          en: 'Cassini flew through water-ice geysers erupting from Enceladus’s south pole.',
        },
        funFact: {
          es: 'Saturno tiene 146 lunas confirmadas y un hexágono gigante de viento en su polo norte.',
          en: 'Saturn has 146 confirmed moons and a giant six-sided wind pattern at its north pole.',
        },
      },
    ],
    badge: {
      id: 'badge_saturn',
      name: { es: 'Maestro de Anillos', en: 'Ring Master' },
      description: { es: 'Exploraste Saturno.', en: 'Explored Saturn.' },
    },
    unlockAccessoryId: 'corona_anillos',
    nasaData: {
      title: { es: 'Saturno — Datos verificados NASA', en: 'Saturn — Verified NASA Facts' },
      nasaQuery: 'Saturn Cassini rings',
      sourceName: 'NASA Cassini Mission',
      missionNames: 'Pioneer 11, Voyager, Cassini-Huygens, Dragonfly',
      credit: 'NASA / JPL-Caltech / Space Science Institute',
      summaryForKids: {
        es: 'Saturno brilla con siete anillos principales de hielo y lunas sorprendentes como Titán y Encélado.',
        en: 'Saturn shines with seven main icy rings and amazing moons like Titan and Enceladus.',
      },
      verifiedMetrics: {
        diameterKm: '116,460 km',
        dayLength: { es: '10.7 horas', en: '10.7 hours' },
        yearLength: { es: '29.4 años terrestres', en: '29.4 Earth years' },
        avgTemp: '-140 °C',
        moons: { es: '146 lunas', en: '146 moons' },
      },
      fallbackImageCaption: {
        es: 'Saturno y sus anillos iluminados capturados por la misión Cassini de la NASA.',
        en: 'Saturn and its rings captured by NASA’s Cassini mission.',
      },
    },
  },
  {
    id: 'uranus',
    order: 7,
    name: { es: 'Urano', en: 'Uranus' },
    subtitle: { es: 'Cap. 7 · El gigante que rueda de lado', en: 'Ch. 7 · The Sideways Ice Giant' },
    palette: { primary: '#A5C8C2', secondary: '#7DA8A4', atmosphere: '#CFE6E2', accent: '#C8C7A5' },
    radiusVisual: 34,
    hasRings: true,
    storyIntro: {
      es: 'Urano brilla en un tono aguamarina suave y gira casi acostado mientras orbita al Sol.',
      en: 'Uranus glows soft aqua-blue and rolls nearly on its side as it orbits the Sun.',
    },
    storyConclusion: {
      es: '¡Excelente! Descubriste cómo el gas metano le da su color azul verdoso a Urano.',
      en: 'Great! You learned how methane gas gives Uranus its aqua-blue color.',
    },
    crewDialogue: {
      es: '¡Hace muchísimo frío aquí! Ajusta los paneles de energía de reserva.',
      en: 'It’s freezing out here! Let’s align the backup energy panels.',
    },
    mainMissionTitle: {
      es: 'Mide la inclinación de Urano y sus anillos verticales',
      en: 'Measure Uranus’s sideways tilt and vertical rings',
    },
    secondaryChallengeTitle: {
      es: 'Activa calefacción y lee la tabla de datos del laboratorio',
      en: 'Restore heater power and read the lab telemetry table',
    },
    runnerConfig: {
      targetDistanceKm: 1550,
      baseSpeed: 395,
      hazardSpawnRate: 1.5,
      meteorColor: '#A5C8C2',
      bgTint: '#152E42',
      hazardLabel: { es: 'Cometas helados', en: 'Icy comets' },
      collectibleRock: {
        name: { es: 'Gemas de Metano', en: 'Methane Gems' },
        color: '#7DD3FC',
        glowColor: '#E0F2FE',
      },
    },
    emergencyType: 'ENERGY',
    emergencyTitle: { es: 'Calefacción de Reserva', en: 'Backup Heater Array' },
    emergencyBrief: {
      es: 'Gira las 4 celdas para dirigir la energía hacia arriba.',
      en: 'Rotate all 4 power cells straight up to warm the instruments.',
    },
    mathMechanic: 'math_lab',
    mathThemePrompt: {
      es: 'Leemos las tablas de medición térmica del laboratorio.',
      en: 'Read the thermal telemetry table in the lab.',
    },
    detectiveClues: [
      {
        category: { es: 'Tipo', en: 'Planet Type' },
        label: { es: 'Gigante de hielo', en: 'Ice giant' },
        value: { es: 'Rico en hielos densos de agua, metano y amoníaco.', en: 'Rich in dense water, methane, and ammonia ices.' },
      },
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Color aguamarina', en: 'Aqua color' },
        value: { es: 'El metano absorbe luz roja y refleja azul verdoso.', en: 'Methane absorbs red light and reflects aqua-blue.' },
      },
      {
        category: { es: 'Inclinación', en: 'Tilt' },
        label: { es: '98 grados', en: '98-degree tilt' },
        value: { es: 'Rueda prácticamente acostado alrededor del Sol.', en: 'Rolls nearly sideways around the Sun.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'Frío extremo', en: 'Extreme cold' },
        value: { es: 'Alcanza -224 °C en su atmósfera.', en: 'Reaches -224 °C in its atmosphere.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Qué gas le da a Urano su color azul verdoso claro?',
      en: 'Which gas gives Uranus its pale aqua-blue color?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'El gas metano en sus nubes altas', en: 'Methane gas in its upper clouds' },
        isCorrect: true,
        feedback: { es: '¡Muy bien! El metano atrapa los tonos rojos de la luz solar.', en: 'Well done! Methane absorbs red sunlight.' },
      },
      {
        id: 'b',
        label: { es: 'Pintura cósmica de meteoritos', en: 'Paint from meteorites' },
        isCorrect: false,
        feedback: { es: 'Pista: Es un gas que aparece en las pistas de la atmósfera.', en: 'Hint: Check the Atmosphere clue card above.' },
      },
    ],
    explorationLabTitle: { es: 'Observatorio de Urano', en: 'Uranus Tilt Observatory' },
    explorationLabGuide: {
      es: 'Escanea las nubes de metano y los 13 anillos verticales.',
      en: 'Scan methane clouds and the 13 vertical rings.',
    },
    explorationSpots: [
      {
        id: 'ura_spot_1',
        title: { es: 'Nubes de Metano', en: 'Methane Clouds' },
        subtitle: { es: 'Estaciones de 42 años', en: '42-year seasons' },
        xPercent: 45,
        yPercent: 48,
        discoveryText: {
          es: 'Por su inclinación, cada polo tiene décadas seguidas de sol y décadas de noche.',
          en: 'Because of its tilt, each pole sees decades of sunlight followed by decades of night.',
        },
        nasaMissionRef: 'NASA Voyager 2 & Webb',
        discoveryStamp: { es: 'Sello Eje Inclinado', en: 'Sideways Spin Stamp' },
      },
      {
        id: 'ura_spot_2',
        title: { es: 'Anillos Verticales', en: 'Vertical Rings' },
        subtitle: { es: '13 anillos tenues', en: '13 faint rings' },
        xPercent: 68,
        yPercent: 62,
        discoveryText: {
          es: 'El Telescopio James Webb fotografió con gran nitidez estos anillos verticales.',
          en: 'NASA’s James Webb Space Telescope captured crisp infrared views of these rings.',
        },
        nasaMissionRef: 'NASA JWST',
        discoveryStamp: { es: 'Sello Anillos Webb', en: 'Webb Rings Stamp' },
      },
    ],
    questions: [
      {
        id: 'ura_q1',
        prompt: {
          es: '¿Qué nave de la NASA visitó de cerca Urano en 1986?',
          en: 'Which NASA spacecraft flew close past Uranus in 1986?',
        },
        options: {
          es: ['Voyager 2', 'Apollo 11', 'Perseverance'],
          en: ['Voyager 2', 'Apollo 11', 'Perseverance'],
        },
        correctIndex: 0,
        hint: { es: 'Es la famosa sonda viajera lanzada en 1977.', en: 'The famous twin-program traveler launched in 1977.' },
        explanation: {
          es: 'Voyager 2 es hasta hoy la única nave que ha sobrevolado Urano y Neptuno.',
          en: 'Voyager 2 remains the only spacecraft to have flown by Uranus and Neptune.',
        },
        funFact: {
          es: 'Las lunas de Urano tienen nombres de personajes de obras de Shakespeare y Pope.',
          en: 'Uranus’s moons are named after characters from Shakespeare and Alexander Pope.',
        },
      },
    ],
    badge: {
      id: 'badge_uranus',
      name: { es: 'Explorador Helado', en: 'Ice Giant Explorer' },
      description: { es: 'Exploraste Urano.', en: 'Explored Uranus.' },
    },
    nasaData: {
      title: { es: 'Urano — Datos verificados NASA', en: 'Uranus — Verified NASA Facts' },
      nasaQuery: 'Uranus Voyager Webb',
      sourceName: 'NASA Voyager 2 & James Webb',
      missionNames: 'Voyager 2, Hubble, James Webb',
      credit: 'NASA / JPL-Caltech / STScI',
      summaryForKids: {
        es: 'Urano es un gigante de hielo turquesa con 28 lunas conocidas y un eje inclinado casi 98 grados.',
        en: 'Uranus is a turquoise ice giant with 28 known moons tilted almost 98 degrees on its side.',
      },
      verifiedMetrics: {
        diameterKm: '50,724 km',
        dayLength: { es: '17.2 horas', en: '17.2 hours' },
        yearLength: { es: '84 años terrestres', en: '84 Earth years' },
        avgTemp: '-195 °C',
        moons: { es: '28 lunas', en: '28 moons' },
      },
      fallbackImageCaption: {
        es: 'Urano visto por la sonda Voyager 2 de la NASA.',
        en: 'Uranus captured by NASA’s Voyager 2 spacecraft.',
      },
    },
  },
  {
    id: 'neptune',
    order: 8,
    name: { es: 'Neptuno', en: 'Neptune' },
    subtitle: { es: 'Cap. 8 · Vientos supersónicos azules', en: 'Ch. 8 · Supersonic Blue Winds' },
    palette: { primary: '#6C8CC7', secondary: '#4B67A3', atmosphere: '#A5C8C2', accent: '#C8C7A5' },
    radiusVisual: 34,
    storyIntro: {
      es: 'A más de 4,500 millones de km del Sol llegamos a Neptuno, el mundo de los vientos más veloces.',
      en: 'Over 4.5 billion km from the Sun we reach Neptune, home of the fastest planetary winds.',
    },
    storyConclusion: {
      es: '¡Increíble! Recorriste los 8 planetas y ahora nos preparamos para dos misiones especiales: ¡La Luna y los Exoplanetas!',
      en: 'Amazing! You explored all 8 planets—now get ready for two special chapters: The Moon and Exoplanets!',
    },
    crewDialogue: {
      es: '¡Estamos muy lejos! Sintoniza la antena de largo alcance para enviar nuestro reporte.',
      en: 'We are so far from home! Tune the deep-space antenna to send our report.',
    },
    mainMissionTitle: {
      es: 'Sincroniza la señal lejana y estudia los géiseres de Tritón',
      en: 'Lock the deep-space signal and study Triton’s geysers',
    },
    secondaryChallengeTitle: {
      es: 'Alinea las ondas de radio y calcula reservas del tanque',
      en: 'Align radio waves and calculate reserve fuel',
    },
    runnerConfig: {
      targetDistanceKm: 1650,
      baseSpeed: 410,
      hazardSpawnRate: 1.56,
      meteorColor: '#A5C8C2',
      bgTint: '#12273B',
      hazardLabel: { es: 'Hielos de Kuiper', en: 'Kuiper ice rocks' },
      collectibleRock: {
        name: { es: 'Piedras Aguamarina', en: 'Aqua Stones' },
        color: '#38BDF8',
        glowColor: '#E0F2FE',
      },
    },
    emergencyType: 'COMMUNICATION',
    emergencyTitle: { es: 'Enlace Espacio Profundo', en: 'Deep Space Radio Link' },
    emergencyBrief: {
      es: 'Alinea la onda celeste con la onda guía dorada para transmitir.',
      en: 'Match the aqua wave to the golden beacon wave to transmit.',
    },
    mathMechanic: 'fuel_calc',
    mathThemePrompt: {
      es: 'Calculamos el combustible de regreso tras llegar al confín del Sistema Solar.',
      en: 'Calculate return fuel at the edge of our solar system.',
    },
    detectiveClues: [
      {
        category: { es: 'Atmósfera', en: 'Atmosphere' },
        label: { es: 'Vientos récord', en: 'Record winds' },
        value: { es: 'Ráfagas de hasta 2,100 km/h, las más rápidas del Sistema Solar.', en: 'Winds up to 2,100 km/h—the fastest in the solar system.' },
      },
      {
        category: { es: 'Descubrimiento', en: 'Discovery' },
        label: { es: 'Predicho con matemáticas', en: 'Found by math' },
        value: { es: 'En 1846 fue calculado con matemáticas antes de verlo bien.', en: 'In 1846, math predicted its location before telescopes confirmed it.' },
      },
      {
        category: { es: 'Temperatura', en: 'Temperature' },
        label: { es: 'Gigante helado', en: 'Frozen giant' },
        value: { es: 'Sus nubes están cerca de -200 °C.', en: 'Its cloud tops sit near -200 °C.' },
      },
      {
        category: { es: 'Lunas', en: 'Moons' },
        label: { es: 'Tritón', en: 'Moon Triton' },
        value: { es: 'Su luna mayor gira al revés y lanza géiseres de nitrógeno.', en: 'Its largest moon orbits backward and erupts nitrogen geysers.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Cómo supieron los astrónomos dónde buscar a Neptuno en 1846?',
      en: 'How did astronomers know where to look for Neptune in 1846?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Calculando con matemáticas cómo su gravedad tiraba de Urano', en: 'By calculating with math how its gravity tugged on Uranus' },
        isCorrect: true,
        feedback: { es: '¡Asombroso! Las matemáticas ayudaron a descubrir un planeta entero.', en: 'Amazing! Math helped discover an entire planet.' },
      },
      {
        id: 'b',
        label: { es: 'Porque un astronauta viajó caminando hasta allí', en: 'Because an astronaut walked all the way there' },
        isCorrect: false,
        feedback: { es: 'Pista: Lee la tarjeta "Descubrimiento" arriba.', en: 'Hint: Check the Discovery clue card above.' },
      },
    ],
    explorationLabTitle: { es: 'Sonda en Neptuno y Tritón', en: 'Neptune & Triton Probe' },
    explorationLabGuide: {
      es: 'Mide las tormentas azules y los géiseres helados de Tritón.',
      en: 'Measure blue storms and Triton’s icy nitrogen geysers.',
    },
    explorationSpots: [
      {
        id: 'nep_spot_1',
        title: { es: 'Bandas de Viento Azul', en: 'Blue Wind Bands' },
        subtitle: { es: 'Vientos supersónicos', en: 'Supersonic winds' },
        xPercent: 42,
        yPercent: 46,
        discoveryText: {
          es: 'Las tormentas oscuras de Neptuno se mueven a velocidades enormes.',
          en: 'Dark storms on Neptune race across the planet at tremendous speeds.',
        },
        nasaMissionRef: 'NASA Voyager 2 & Hubble',
        discoveryStamp: { es: 'Sello Vientos Azules', en: 'Blue Winds Stamp' },
      },
      {
        id: 'nep_spot_2',
        title: { es: 'Géiseres de Tritón', en: 'Triton Geysers' },
        subtitle: { es: 'Criovulcanismo', en: 'Cryovolcanism' },
        xPercent: 72,
        yPercent: 30,
        discoveryText: {
          es: 'Tritón expulsa chorros de nitrógeno congelado a kilómetros de altura.',
          en: 'Triton shoots plumes of frozen nitrogen gas kilometers high.',
        },
        nasaMissionRef: 'NASA Voyager 2',
        discoveryStamp: { es: 'Sello Géiser Tritón', en: 'Triton Geyser Stamp' },
      },
    ],
    questions: [
      {
        id: 'nep_q1',
        prompt: {
          es: 'Como Neptuno está 30 veces más lejos del Sol que la Tierra, ¿cuánto dura un año allí?',
          en: 'Since Neptune is 30 times farther from the Sun than Earth, how long is one year there?',
        },
        options: {
          es: ['Casi 165 años terrestres', '2 años terrestres', '12 horas'],
          en: ['Almost 165 Earth years', '2 Earth years', '12 hours'],
        },
        correctIndex: 0,
        hint: { es: 'Su órbita es gigantesca y le toma muchísimo tiempo dar una vuelta.', en: 'Its huge outer orbit takes a very long time.' },
        explanation: {
          es: 'Neptuno tarda 164.8 años terrestres en completar una sola órbita al Sol.',
          en: 'Neptune takes 164.8 Earth years to complete one trip around the Sun.',
        },
        funFact: {
          es: 'Desde su descubrimiento en 1846, Neptuno cumplió su primer año en 2011.',
          en: 'From its discovery in 1846, Neptune completed its first full orbit in 2011.',
        },
      },
    ],
    badge: {
      id: 'badge_neptune',
      name: { es: 'Guardián del Viento', en: 'Wind Guardian' },
      description: { es: 'Exploraste Neptuno.', en: 'Explored Neptune.' },
    },
    nasaData: {
      title: { es: 'Neptuno — Datos verificados NASA', en: 'Neptune — Verified NASA Facts' },
      nasaQuery: 'Neptune Voyager 2',
      sourceName: 'NASA Solar System Exploration / Voyager 2',
      missionNames: 'Voyager 2, Hubble, James Webb',
      credit: 'NASA / JPL',
      summaryForKids: {
        es: 'Neptuno es un gigante de hielo azul profundo, el octavo y más lejano de los planetas del Sistema Solar.',
        en: 'Neptune is a deep-blue ice giant, the eighth and farthest major planet from our Sun.',
      },
      verifiedMetrics: {
        diameterKm: '49,244 km',
        dayLength: { es: '16.1 horas', en: '16.1 hours' },
        yearLength: { es: '164.8 años terrestres', en: '164.8 Earth years' },
        avgTemp: '-200 °C',
        moons: { es: '16 lunas', en: '16 moons' },
      },
      fallbackImageCaption: {
        es: 'Fotografía real de Neptuno tomada por la sonda Voyager 2 de la NASA en 1989.',
        en: 'Real photo of Neptune captured by NASA’s Voyager 2 in 1989.',
      },
    },
  },
  {
    id: 'moon',
    order: 9,
    name: { es: 'La Luna', en: 'The Moon' },
    subtitle: { es: 'Cap. 9 · Cráteres, fases y misiones Artemis', en: 'Ch. 9 · Craters, Phases & Artemis' },
    palette: { primary: '#D4D2C5', secondary: '#9B998E', atmosphere: '#EFEFE6', accent: '#C8C7A5' },
    radiusVisual: 28,
    storyIntro: {
      es: '¡Misión especial en la Luna de la Tierra! Investigamos sus cráteres, sus fases cambiantes y el regreso de la humanidad con el programa Artemis de la NASA.',
      en: 'Special mission at Earth’s Moon! We study its craters, changing phases, and humanity’s return with NASA’s Artemis program.',
    },
    storyConclusion: {
      es: '¡Misión lunar cumplida! Ya sabes por qué saltamos más alto en la Luna y por qué cambia su forma aparente.',
      en: 'Lunar mission complete! Now you know why gravity is gentler on the Moon and why phases change.',
    },
    crewDialogue: {
      es: '¡Preparamos el módulo de alunizaje! Revisemos primero los cables de navegación.',
      en: 'Preparing the lunar lander! Let’s check the navigation cables first.',
    },
    mainMissionTitle: {
      es: 'Explora cráteres lunares, gravedad 1/6, fases y misiones Artemis',
      en: 'Explore lunar craters, 1/6 gravity, phases, and Artemis sites',
    },
    secondaryChallengeTitle: {
      es: 'Conecta cables lunares y calcula divisiones o fracciones de muestra',
      en: 'Patch lander cables and solve sample sharing math',
    },
    runnerConfig: {
      targetDistanceKm: 1350,
      baseSpeed: 360,
      hazardSpawnRate: 1.38,
      meteorColor: '#B8B5A1',
      bgTint: '#1F2022',
      hazardLabel: { es: 'Rocas de cráter', en: 'Crater rocks' },
      collectibleRock: {
        name: { es: 'Rocas Lunares', en: 'Lunar Rocks' },
        color: '#F4F1DE',
        glowColor: '#FFD166',
      },
    },
    emergencyType: 'CABLES',
    emergencyTitle: { es: 'Cables del Módulo Lunar', en: 'Lunar Lander Cables' },
    emergencyBrief: {
      es: 'Conecta los 4 cables de color para preparar un alunizaje suave.',
      en: 'Connect all 4 colored wires for a smooth lunar landing.',
    },
    mathMechanic: 'resource_sharing',
    mathThemePrompt: {
      es: 'Repartimos las muestras de polvo lunar recogidas para estudiarlas.',
      en: 'Divide collected lunar dust samples equally for lab study.',
    },
    detectiveClues: [
      {
        category: { es: 'Superficie', en: 'Surface' },
        label: { es: 'Cráteres y regolito', en: 'Craters & regolith' },
        value: { es: 'Cubierta de polvo gris fino llamado regolito y miles de cráteres.', en: 'Covered in fine gray dust called regolith and ancient craters.' },
      },
      {
        category: { es: 'Gravedad', en: 'Gravity' },
        label: { es: '1/6 de la Tierra', en: '1/6 of Earth gravity' },
        value: { es: 'La atracción lunar es 6 veces menor que en la Tierra.', en: 'Moon gravity is 6 times weaker than Earth’s.' },
      },
      {
        category: { es: 'Fases Lunares', en: 'Moon Phases' },
        label: { es: 'Luz reflejada', en: 'Reflected sunlight' },
        value: { es: 'Vemos distintas fases según la parte iluminada por el Sol mientras orbita.', en: 'Phases change as we see different sunlit angles during its orbit.' },
      },
      {
        category: { es: 'Exploración', en: 'Exploration' },
        label: { es: 'Apolo y Artemis', en: 'Apollo & Artemis' },
        value: { es: 'El programa Artemis busca explorar el Polo Sur lunar y preparar viajes a Marte.', en: 'NASA’s Artemis program explores the lunar South Pole for future Mars trips.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Por qué la Luna parece cambiar de forma (llena, creciente, nueva) durante el mes?',
      en: 'Why does the Moon seem to change shape (full, crescent, new) each month?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Porque vemos distintas partes iluminadas por el Sol mientras gira alrededor de la Tierra', en: 'Because we see different sunlit parts as it orbits Earth' },
        isCorrect: true,
        feedback: { es: '¡Brillante! La Luna no cambia de forma física, solo cambia la luz que vemos reflejada.', en: 'Brilliant! The Moon stays round—only the sunlit side facing us changes.' },
      },
      {
        id: 'b',
        label: { es: 'Porque la Luna se encoge y vuelve a crecer cada semana', en: 'Because the Moon physically shrinks and grows each week' },
        isCorrect: false,
        feedback: { es: 'Pista: Revisa la tarjeta "Fases Lunares" arriba.', en: 'Hint: Check the Moon Phases clue card above.' },
      },
    ],
    explorationLabTitle: { es: 'Exploración Lunar LRO y Artemis', en: 'LRO & Artemis Lunar Lab' },
    explorationLabGuide: {
      es: 'Investiga el Cráter Tycho y la zona del Polo Sur lunar objetivo de Artemis.',
      en: 'Inspect Tycho Crater and the Artemis South Pole target region.',
    },
    explorationSpots: [
      {
        id: 'moon_spot_1',
        title: { es: 'Cráter Tycho', en: 'Tycho Crater' },
        subtitle: { es: 'Rayos brillantes', en: 'Bright ejecta rays' },
        xPercent: 45,
        yPercent: 42,
        discoveryText: {
          es: 'Este cráter de 85 km de ancho dejó largas líneas brillantes visibles incluso con binoculares.',
          en: 'This 85 km wide crater threw out bright rays visible even with binoculars.',
        },
        nasaMissionRef: 'NASA LRO (Lunar Reconnaissance Orbiter)',
        discoveryStamp: { es: 'Sello Cráter Tycho', en: 'Tycho Crater Stamp' },
      },
      {
        id: 'moon_spot_2',
        title: { es: 'Polo Sur Lunar (Artemis)', en: 'Lunar South Pole (Artemis)' },
        subtitle: { es: 'Hielo en cráteres', en: 'Ice in shadowed craters' },
        xPercent: 52,
        yPercent: 72,
        discoveryText: {
          es: 'Aquí existen cráteres fríos con hielo de agua que podrían ayudar a futuros astronautas de Artemis.',
          en: 'Shadowed craters here hold water ice that could support future Artemis astronauts.',
        },
        nasaMissionRef: 'NASA Artemis & LRO',
        discoveryStamp: { es: 'Sello Artemis Polar', en: 'Artemis South Pole Stamp' },
      },
    ],
    questions: [
      {
        id: 'moon_q1',
        prompt: {
          es: 'Si pesas 30 kg en la Tierra, ¿por qué en la Luna podrías dar saltos 6 veces más altos?',
          en: 'Why could you jump 6 times higher on the Moon than on Earth?',
        },
        options: {
          es: ['Porque la Luna tiene menor masa y su gravedad es 1/6 de la terrestre', 'Porque en la Luna hay resortes en el suelo', 'Porque hace mucho viento hacia arriba'],
          en: ['Because the Moon has less mass and 1/6 Earth gravity', 'Because the ground has hidden springs', 'Because wind blows upward'],
        },
        correctIndex: 0,
        hint: { es: 'La gravedad depende de qué tan masivo es un mundo.', en: 'Gravity depends on how massive a world is.' },
        explanation: {
          es: 'Como la Luna es más pequeña que la Tierra, su gravedad es 6 veces más débil.',
          en: 'Since the Moon is smaller than Earth, its gravitational pull is 6 times weaker.',
        },
        funFact: {
          es: 'La Luna se aleja de la Tierra unos 3.8 centímetros al año, ¡como lo que crecen tus uñas!',
          en: 'The Moon drifts away from Earth by about 3.8 cm per year—as fast as fingernails grow!',
        },
      },
    ],
    badge: {
      id: 'badge_moon',
      name: { es: 'Explorador Lunar', en: 'Lunar Explorer' },
      description: { es: 'Completaste la misión en La Luna.', en: 'Completed the Moon mission.' },
    },
    nasaData: {
      title: { es: 'La Luna — Datos verificados NASA', en: 'The Moon — Verified NASA Facts' },
      nasaQuery: 'Moon Lunar Reconnaissance Orbiter Artemis',
      sourceName: 'NASA Moon Exploration / LRO / Artemis',
      missionNames: 'Apollo 11–17, LRO, Artemis I–III',
      credit: 'NASA / Goddard Space Flight Center / ASU',
      summaryForKids: {
        es: 'La Luna es el único satélite natural de la Tierra. Regula las mareas del mar y guarda cráteres muy antiguos.',
        en: 'The Moon is Earth’s only natural satellite. It drives ocean tides and preserves ancient impact craters.',
      },
      verifiedMetrics: {
        diameterKm: '3,474 km',
        dayLength: { es: '27.3 días terrestres', en: '27.3 Earth days' },
        yearLength: { es: '27.3 días (órbita a la Tierra)', en: '27.3 days (orbits Earth)' },
        avgTemp: '-130 °C a 120 °C',
        moons: { es: 'Satélite de la Tierra', en: 'Earth’s natural satellite' },
      },
      fallbackImageCaption: {
        es: 'Mosaico de alta resolución de la Luna capturado por el Lunar Reconnaissance Orbiter de la NASA.',
        en: 'High-resolution Moon mosaic captured by NASA’s Lunar Reconnaissance Orbiter.',
      },
    },
  },
  {
    id: 'exoplanets',
    order: 10,
    name: { es: 'Exoplanetas', en: 'Exoplanets' },
    subtitle: { es: 'Cap. 10 · Mundos alrededor de otras estrellas', en: 'Ch. 10 · Worlds Around Other Stars' },
    palette: { primary: '#8FB8C8', secondary: '#502671', atmosphere: '#C8C7A5', accent: '#A5C8C2' },
    radiusVisual: 36,
    storyIntro: {
      es: '¡Capítulo final más allá del Sistema Solar! Con telescopios espaciales buscamos exoplanetas: planetas que orbitan estrellas lejanas.',
      en: 'Final chapter beyond our solar system! Using space telescopes, we search for exoplanets orbiting distant stars.',
    },
    storyConclusion: {
      es: '¡FELICIDADES, CAPITÁN! Completaste los 10 destinos desde Mercurio hasta los Exoplanetas.',
      en: 'CONGRATULATIONS, CAPTAIN! You completed all 10 destinations from Mercury to Exoplanets.',
    },
    crewDialogue: {
      es: '¡Detectamos una estrella lejana! Calibra los telescopios para encontrar un exoplaneta.',
      en: 'Distant star detected! Let’s calibrate our telescopes to spot an exoplanet.',
    },
    mainMissionTitle: {
      es: 'Aprende cómo se descubren los exoplanetas y qué investigan los telescopios NASA',
      en: 'Learn how exoplanets are found and what NASA telescopes study',
    },
    secondaryChallengeTitle: {
      es: 'Sintoniza señales estelares y analiza datos de tránsito planetario',
      en: 'Tune starlight signals and analyze transit data tables',
    },
    runnerConfig: {
      targetDistanceKm: 1750,
      baseSpeed: 420,
      hazardSpawnRate: 1.62,
      meteorColor: '#C8BCA5',
      bgTint: '#291B25',
      hazardLabel: { es: 'Polvo interestelar', en: 'Interstellar rocks' },
      collectibleRock: {
        name: { es: 'Piedras Estelares', en: 'Starlight Stones' },
        color: '#FF5D8F',
        glowColor: '#FFD166',
      },
    },
    emergencyType: 'COMMUNICATION',
    emergencyTitle: { es: 'Calibración de Telescopio Espacial', en: 'Space Telescope Alignment' },
    emergencyBrief: {
      es: 'Alinea la curva de luz para detectar el paso del exoplaneta frente a su estrella.',
      en: 'Align the light wave to capture the exoplanet passing in front of its star.',
    },
    mathMechanic: 'math_lab',
    mathThemePrompt: {
      es: 'Analizamos la tabla real de mediciones de luz estelar.',
      en: 'Analyze real starlight measurements in the lab table.',
    },
    detectiveClues: [
      {
        category: { es: 'Definición', en: 'What are they?' },
        label: { es: 'Otros sistemas solares', en: 'Other solar systems' },
        value: { es: 'Son planetas que giran alrededor de estrellas fuera de nuestro Sol.', en: 'Planets that orbit stars other than our Sun.' },
      },
      {
        category: { es: 'Método del Tránsito', en: 'Transit Method' },
        label: { es: 'Pequeño guiño de luz', en: 'Tiny starlight dip' },
        value: { es: 'Cuando un planeta pasa frente a su estrella, el brillo baja un poquito.', en: 'When a planet crosses in front of its star, the starlight dims slightly.' },
      },
      {
        category: { es: 'Telescopios NASA', en: 'NASA Telescopes' },
        label: { es: 'Kepler, TESS y Webb', en: 'Kepler, TESS & Webb' },
        value: { es: 'Han confirmado miles de exoplanetas y estudian sus atmósferas.', en: 'Confirmed thousands of exoplanets and now inspect their atmospheres.' },
      },
      {
        category: { es: 'Habitabilidad', en: 'Habitability' },
        label: { es: 'Zona templada', en: 'Goldilocks Zone' },
        value: { es: 'Se investiga si la distancia permite agua líquida y qué gases hay.', en: 'Scientists check if distance allows liquid water and what gases exist.' },
      },
    ],
    detectiveTraitsQuestion: {
      es: '¿Cómo descubren telescopios como Kepler y TESS la mayoría de los exoplanetas?',
      en: 'How do space telescopes like Kepler and TESS spot most exoplanets?',
    },
    detectiveChoices: [
      {
        id: 'a',
        label: { es: 'Midiendo la pequeña baja de brillo cuando el planeta pasa frente a su estrella', en: 'Measuring the tiny dip in starlight when a planet crosses in front of its star' },
        isCorrect: true,
        feedback: { es: '¡Genial! Eso se llama "método del tránsito". ¡Como una mini sombra!', en: 'Awesome! That is called the "transit method"—like a tiny shadow!' },
      },
      {
        id: 'b',
        label: { es: 'Mandando cohetes con regla hasta otras estrellas en un día', en: 'Flying rockets with rulers to other stars in one day' },
        isCorrect: false,
        feedback: { es: 'Pista: Las estrellas están a años luz; usamos la luz que llega a los telescopios.', en: 'Hint: Stars are light-years away, so telescopes study their starlight.' },
      },
    ],
    explorationLabTitle: { es: 'Cazador de Exoplanetas (TRAPPIST-1)', en: 'Exoplanet Hunter (TRAPPIST-1)' },
    explorationLabGuide: {
      es: 'Escanea el método del tránsito y el análisis atmosférico con el Telescopio James Webb.',
      en: 'Scan the transit method and atmospheric study with James Webb.',
    },
    explorationSpots: [
      {
        id: 'exo_spot_1',
        title: { es: 'Sistema TRAPPIST-1', en: 'TRAPPIST-1 System' },
        subtitle: { es: '7 planetas rocosos', en: '7 Earth-sized worlds' },
        xPercent: 38,
        yPercent: 48,
        discoveryText: {
          es: 'A 40 años luz hay 7 planetas del tamaño parecido a la Tierra orbitando una estrella fría.',
          en: '40 light-years away, 7 Earth-sized worlds orbit a cool red dwarf star.',
        },
        nasaMissionRef: 'NASA Spitzer / TESS / JWST',
        discoveryStamp: { es: 'Sello TRAPPIST-1', en: 'TRAPPIST-1 Stamp' },
      },
      {
        id: 'exo_spot_2',
        title: { es: 'Espectro Atmosférico Webb', en: 'Webb Atmosphere Spectrum' },
        subtitle: { es: 'Luz filtrada', en: 'Filtered starlight' },
        xPercent: 68,
        yPercent: 38,
        discoveryText: {
          es: 'Cuando la luz pasa por la atmósfera de un exoplaneta, revela huellas de agua o dióxido de carbono.',
          en: 'Starlight passing through an exoplanet’s air reveals chemical fingerprints of gases.',
        },
        nasaMissionRef: 'NASA James Webb Space Telescope',
        discoveryStamp: { es: 'Sello Telescopio Webb', en: 'Webb Telescope Stamp' },
      },
    ],
    questions: [
      {
        id: 'exo_q1',
        prompt: {
          es: '¿Qué investigan los científicos para saber si un exoplaneta podría tener agua líquida en su superficie?',
          en: 'What do scientists check to see if an exoplanet might allow liquid water on its surface?',
        },
        options: {
          es: ['Su distancia a la estrella (zona habitable) y su atmósfera', 'Si tiene forma de cubo', 'De qué color es su estrella favorita'],
          en: ['Its distance from its star (habitable zone) and its atmosphere', 'Whether it is shaped like a cube', 'Its favorite star color'],
        },
        correctIndex: 0,
        hint: { es: 'No debe estar ni demasiado caliente ni demasiado congelado.', en: 'It cannot be too scorching hot or too freezing cold.' },
        explanation: {
          es: 'La zona habitable es la distancia ideal donde las temperaturas permitirían agua líquida si hay atmósfera.',
          en: 'The habitable zone is the right distance where temperatures could allow liquid water with an atmosphere.',
        },
        funFact: {
          es: 'La NASA ha confirmado más de 5,700 exoplanetas reales en el archivo oficial.',
          en: 'NASA’s official Exoplanet Archive lists over 5,700 confirmed real exoplanets!',
        },
      },
    ],
    badge: {
      id: 'badge_exoplanets',
      name: { es: 'Capitán Cósmico', en: 'Cosmic Captain' },
      description: { es: 'Exploraste los Exoplanetas.', en: 'Explored Exoplanets.' },
    },
    unlockAccessoryId: 'capa_nebula',
    nasaData: {
      title: { es: 'Exoplanetas — Datos verificados NASA', en: 'Exoplanets — Verified NASA Facts' },
      nasaQuery: 'TRAPPIST-1 exoplanet NASA',
      sourceName: 'NASA Exoplanet Archive (Caltech / IPAC)',
      missionNames: 'Kepler, TESS, Spitzer, James Webb',
      credit: 'NASA / JPL-Caltech / IPAC',
      summaryForKids: {
        es: 'Los exoplanetas orbitan estrellas fuera del Sistema Solar. Los telescopios miden pequeños cambios de luz para encontrarlos.',
        en: 'Exoplanets orbit stars beyond our solar system. Space telescopes spot tiny dips in starlight to discover them.',
      },
      verifiedMetrics: {
        diameterKm: 'Varios tamaños (0.5× a >12× Tierra)',
        dayLength: { es: 'Varía por mundo', en: 'Varies by world' },
        yearLength: { es: 'Desde días hasta cientos de años', en: 'Days to hundreds of years' },
        avgTemp: 'Según distancia estelar',
        moons: { es: 'En investigación actual', en: 'Under active study' },
      },
      fallbackImageCaption: {
        es: 'Ilustración científica de la NASA del sistema real de siete exoplanetas TRAPPIST-1.',
        en: 'NASA science illustration of the real seven-exoplanet TRAPPIST-1 system.',
      },
    },
  },
];
