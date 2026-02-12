export type EventCategory = 'recital' | 'cultural' | 'deportivo' | 'familiar' | 'feria';
export type EventStatus = 'disponible' | 'agotado' | 'ultimos' | 'proximamente';

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  dateISO: string;
  time: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  gallery: string[];
  videoClips: { id: string; title: string; thumbnail: string; url: string }[];
  ticketUrl: string;
  status: EventStatus;
  priceLabel: string;
  isFree: boolean;
  tags: string[];
  lineup?: string[];
}

export const events: Event[] = [
  {
    id: '1',
    slug: 'noche-de-tango-argentino',
    title: 'Noche de Tango Argentino',
    category: 'cultural',
    dateISO: '2026-03-15',
    time: '21:00',
    shortDescription: 'Una velada íntima con los mejores exponentes del tango tucumano.',
    longDescription: 'Disfrutá de una noche mágica con los mejores artistas de tango de la región. Una experiencia única que combina la pasión del baile con la elegancia de la música en vivo. El evento incluirá presentaciones de orquestas típicas, bailarines profesionales y una milonga abierta para todo el público.',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop'
    ],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/tango',
    status: 'disponible',
    priceLabel: 'Desde $8.000',
    isFree: false,
    tags: ['tango', 'música en vivo', 'baile'],
    lineup: ['Orquesta Típica Tucumana', 'Ballet Tango Norte', 'Milonga Abierta']
  },
  {
    id: '2',
    slug: 'rock-en-el-palacio',
    title: 'Rock en el Palacio',
    category: 'recital',
    dateISO: '2026-03-22',
    time: '20:30',
    shortDescription: 'Las mejores bandas de rock nacional en un solo escenario.',
    longDescription: 'Un festival épico con las bandas más importantes del rock argentino. Prepárate para una noche inolvidable con tres bandas en vivo, efectos especiales y la mejor producción de sonido e iluminación del norte argentino.',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop'
    ],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/rock',
    status: 'ultimos',
    priceLabel: 'Desde $12.000',
    isFree: false,
    tags: ['rock', 'música en vivo', 'festival'],
    lineup: ['Banda Principal 1', 'Banda Principal 2', 'Telonero Regional']
  },
  {
    id: '3',
    slug: 'argentina-argelia-mundial',
    title: 'Argentina vs Argelia - Mundial 2026',
    category: 'deportivo',
    dateISO: '2026-06-16',
    time: '16:00',
    shortDescription: 'Mirá el debut de la Selección Argentina en pantalla gigante.',
    longDescription: 'Vení a alentar a la Scaloneta en su primer partido del Mundial 2026 contra Argelia. Viví la emoción del fútbol en nuestra pantalla gigante con sonido de estadio. Sorteos de camisetas y pelotas durante el entretiempo. ¡Entrada libre y gratuita!',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: '',
    status: 'disponible',
    priceLabel: 'Entrada libre',
    isFree: true,
    tags: ['deportes', 'fútbol', 'mundial', 'argentina', 'gratis']
  },
  {
    id: '4',
    slug: 'argentina-austria-mundial',
    title: 'Argentina vs Austria - Mundial 2026',
    category: 'deportivo',
    dateISO: '2026-06-22',
    time: '14:00',
    shortDescription: 'Segundo partido de fase de grupos: Argentina vs Austria.',
    longDescription: 'Seguimos acompañando a la Selección en su camino a la gloria. Acercate al Palacio de los Deportes para ver el partido contra Austria en pantalla gigante. Patio de comidas y actividades para toda la familia desde dos horas antes del partido.',
    image: '/fotich.jpg',
    gallery: [],
    videoClips: [],
    ticketUrl: '',
    status: 'disponible',
    priceLabel: 'Entrada libre',
    isFree: true,
    tags: ['deportes', 'fútbol', 'mundial', 'argentina', 'gratis']
  },
  {
    id: '5',
    slug: 'comedia-stand-up-night',
    title: 'Comedia Stand-Up Night',
    category: 'cultural',
    dateISO: '2026-05-02',
    time: '21:30',
    shortDescription: 'Los mejores comediantes del país en una noche de risas.',
    longDescription: 'Preparate para reír sin parar con los comediantes más talentosos de Argentina. Una noche de stand-up comedy de primer nivel con humor inteligente, observacional y lleno de energía. Show para mayores de 16 años.',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/standup',
    status: 'disponible',
    priceLabel: 'Desde $7.500',
    isFree: false,
    tags: ['comedia', 'stand-up', 'humor']
  },
  {
    id: '6',
    slug: 'festival-infantil-primavera',
    title: 'Festival Infantil de Primavera',
    category: 'familiar',
    dateISO: '2026-05-15',
    time: '16:00',
    shortDescription: 'Música, juegos y diversión para toda la familia.',
    longDescription: 'Un evento pensado para los más chicos de la casa. Shows musicales, títeres, magia, juegos interactivos y mucho más. Disfrutá de una tarde inolvidable con tu familia en un espacio seguro y lleno de alegría.',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/infantil',
    status: 'disponible',
    priceLabel: 'Desde $3.500',
    isFree: false,
    tags: ['infantil', 'familiar', 'música', 'entretenimiento']
  },
  {
    id: '7',
    slug: 'cumbia-tropical-fest',
    title: 'Cumbia Tropical Fest',
    category: 'recital',
    dateISO: '2026-05-28',
    time: '22:00',
    shortDescription: 'La mejor cumbia y música tropical en vivo.',
    longDescription: 'Bailá toda la noche con las orquestas más importantes de la cumbia argentina. Un evento que promete hacer vibrar al Palacio con los ritmos más calientes del género tropical. ¡No te lo podés perder!',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/cumbia',
    status: 'disponible',
    priceLabel: 'Desde $10.000',
    isFree: false,
    tags: ['cumbia', 'baile', 'música tropical']
  },
  {
    id: '8',
    slug: 'concierto-sinfonica-tucuman',
    title: 'Concierto Sinfónica de Tucumán',
    category: 'cultural',
    dateISO: '2026-06-08',
    time: '20:00',
    shortDescription: 'Una noche de música clásica con la orquesta provincial.',
    longDescription: 'La Orquesta Sinfónica de Tucumán presenta un repertorio excepcional de obras clásicas y contemporáneas. Una experiencia cultural única que combina la excelencia musical con la acústica privilegiada del Palacio de los Deportes.',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/sinfonica',
    status: 'disponible',
    priceLabel: 'Desde $5.000',
    isFree: false,
    tags: ['música clásica', 'orquesta', 'cultura']
  },
  {
    id: '9',
    slug: 'feria-artesanos-regional',
    title: 'Feria de Artesanos Regional',
    category: 'feria',
    dateISO: '2026-06-20',
    time: '10:00',
    shortDescription: 'Artesanías, gastronomía y cultura local.',
    longDescription: 'Descubrí lo mejor de la producción artesanal del NOA. Más de 100 expositores ofrecen productos únicos, desde textiles y cerámicas hasta gastronomía regional y diseño contemporáneo. Entrada gratuita con actividades para toda la familia.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: '',
    status: 'disponible',
    priceLabel: 'Entrada libre',
    isFree: true,
    tags: ['artesanías', 'feria', 'gratis', 'gastronomía']
  },
  {
    id: '10',
    slug: 'electronica-night-festival',
    title: 'Electrónica Night Festival',
    category: 'recital',
    dateISO: '2026-07-05',
    time: '23:00',
    shortDescription: 'Los mejores DJs nacionales e internacionales.',
    longDescription: 'Una noche épica de música electrónica con producción internacional. Tres escenarios, efectos visuales de última generación y los DJs más importantes del circuito global. Mayores de 18 años.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/electronica',
    status: 'agotado',
    priceLabel: 'Agotado',
    isFree: false,
    tags: ['electrónica', 'DJ', 'fiesta']
  },
  {
    id: '11',
    slug: 'argentina-jordania-mundial',
    title: 'Argentina vs Jordania - Mundial 2026',
    category: 'deportivo',
    dateISO: '2026-06-27',
    time: '18:00',
    shortDescription: 'Cierre de fase de grupos: Argentina vs Jordania.',
    longDescription: 'El último partido de la fase de grupos se vive en el Palacio. Argentina enfrenta a Jordania buscando la clasificación a octavos. Vení a alentar con tu bandera y tu camiseta. ¡Vamos Argentina!',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: '',
    status: 'disponible',
    priceLabel: 'Entrada libre',
    isFree: true,
    tags: ['deportes', 'fútbol', 'mundial', 'argentina', 'gratis']
  },
  {
    id: '12',
    slug: 'tributo-soda-stereo',
    title: 'Tributo a Soda Stereo',
    category: 'recital',
    dateISO: '2026-07-28',
    time: '21:00',
    shortDescription: 'La mejor banda tributo de Latinoamérica rinde homenaje a Soda.',
    longDescription: 'Revivimos los grandes éxitos de Soda Stereo con la banda tributo más reconocida de la región. Un show imperdible que te transportará a los mejores momentos del rock en español. ¡Cantá todos los hits!',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop',
    gallery: [],
    videoClips: [],
    ticketUrl: 'https://example.com/tickets/soda',
    status: 'ultimos',
    priceLabel: 'Desde $9.500',
    isFree: false,
    tags: ['rock', 'tributo', 'soda stereo']
  }
];
