-- Palacio de los Deportes - Seed Data for Events
-- Run this in Supabase SQL Editor to populate the table

INSERT INTO events (
  slug, title, category, date_iso, time, short_description, long_description, 
  image, gallery, video_clips, ticket_url, status, price_label, is_free, tags, lineup
) VALUES 
(
  'noche-de-tango-argentino', 'Noche de Tango Argentino', 'cultural', '2026-03-15', '21:00',
  'Una velada íntima con los mejores exponentes del tango tucumano.',
  'Disfrutá de una noche mágica con los mejores artistas de tango de la región. Una experiencia única que combina la pasión del baile con la elegancia de la música en vivo. El evento incluirá presentaciones de orquestas típicas, bailarines profesionales y una milonga abierta para todo el público.',
  'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop',
  '{"https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop"}',
  '[]', 'http://ticketweb.com.ar/', 'disponible', 'Desde $8.000', false, 
  '{"tango", "música en vivo", "baile"}', '{"Orquesta Típica Tucumana", "Ballet Tango Norte", "Milonga Abierta"}'
),
(
  'rock-en-el-palacio', 'Rock en el Palacio', 'recital', '2026-03-22', '20:30',
  'Las mejores bandas de rock nacional en un solo escenario.',
  'Un festival épico con las bandas más importantes del rock argentino. Prepárate para una noche inolvidable con tres bandas en vivo, efectos especiales y la mejor producción de sonido e iluminación del norte argentino.',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
  '{"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop"}',
  '[]', 'http://ticketweb.com.ar/', 'ultimos', 'Desde $12.000', false, 
  '{"rock", "música en vivo", "festival"}', '{"Banda Principal 1", "Banda Principal 2", "Telonero Regional"}'
),
(
  'argentina-argelia-mundial', 'Argentina vs Argelia - Mundial 2026', 'deportivo', '2026-06-16', '16:00',
  'Mirá el debut de la Selección Argentina en pantalla gigante.',
  'Vení a alentar a la Scaloneta en su primer partido del Mundial 2026 contra Argelia. Viví la emoción del fútbol en nuestra pantalla gigante con sonido de estadio. Sorteos de camisetas y pelotas durante el entretiempo. ¡Entrada libre y gratuita!',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
  '{}', '[]', '', 'disponible', 'Entrada libre', true, 
  '{"deportes", "fútbol", "mundial", "argentina", "gratis"}', '{}'
),
(
  'argentina-austria-mundial', 'Argentina vs Austria - Mundial 2026', 'deportivo', '2026-06-22', '14:00',
  'Segundo partido de fase de grupos: Argentina vs Austria.',
  'Seguimos acompañando a la Selección en su camino a la gloria. Acercate al Palacio de los Deportes para ver el partido contra Austria en pantalla gigante. Patio de comidas y actividades para toda la familia desde dos horas antes del partido.',
  '/fotich.jpg', '{}', '[]', '', 'disponible', 'Entrada libre', true, 
  '{"deportes", "fútbol", "mundial", "argentina", "gratis"}', '{}'
),
(
  'comedia-stand-up-night', 'Comedia Stand-Up Night', 'cultural', '2026-05-02', '21:30',
  'Los mejores comediantes del país en una noche de risas.',
  'Preparate para reír sin parar con los comediantes más talentosos de Argentina. Una noche de stand-up comedy de primer nivel con humor inteligente, observacional y lleno de energía. Show para mayores de 16 años.',
  'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'disponible', 'Desde $7.500', false, 
  '{"comedia", "stand-up", "humor"}', '{}'
),
(
  'festival-infantil-primavera', 'Festival Infantil de Primavera', 'familiar', '2026-05-15', '16:00',
  'Música, juegos y diversión para toda la familia.',
  'Un evento pensado para los más chicos de la casa. Shows musicales, títeres, magia, juegos interactivos y mucho más. Disfrutá de una tarde inolvidable con tu familia en un espacio seguro y lleno de alegría.',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'disponible', 'Desde $3.500', false, 
  '{"infantil", "familiar", "música", "entretenimiento"}', '{}'
),
(
  'cumbia-tropical-fest', 'Cumbia Tropical Fest', 'recital', '2026-05-28', '22:00',
  'La mejor cumbia y música tropical en vivo.',
  'Bailá toda la noche con las orquestas más importantes de la cumbia argentina. Un evento que promete hacer vibrar al Palacio con los ritmos más calientes del género tropical. ¡No te lo podés perder!',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'disponible', 'Desde $10.000', false, 
  '{"cumbia", "baile", "música tropical"}', '{}'
),
(
  'concierto-sinfonica-tucuman', 'Concierto Sinfónica de Tucumán', 'cultural', '2026-06-08', '20:00',
  'Una noche de música clásica con la orquesta provincial.',
  'La Orquesta Sinfónica de Tucumán presenta un repertorio excepcional de obras clásicas y contemporáneas. Una experiencia cultural única que combina la excelencia musical con la acústica privilegiada del Palacio de los Deportes.',
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'disponible', 'Desde $5.000', false, 
  '{"música clásica", "orquesta", "cultura"}', '{}'
),
(
  'feria-artesanos-regional', 'Feria de Artesanos Regional', 'feria', '2026-06-20', '10:00',
  'Artesanías, gastronomía y cultura local.',
  'Descubrí lo mejor de la producción artesanal del NOA. Más de 100 expositores ofrecen productos únicos, desde textiles y cerámicas hasta gastronomía regional y diseño contemporáneo. Entrada gratuita con actividades para toda la familia.',
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop',
  '{}', '[]', '', 'disponible', 'Entrada libre', true, 
  '{"artesanías", "feria", "gratis", "gastronomía"}', '{}'
),
(
  'electronica-night-festival', 'Electrónica Night Festival', 'recital', '2026-07-05', '23:00',
  'Los mejores DJs nacionales e internacionales.',
  'Una noche épica de música electrónica con producción internacional. Tres escenarios, efectos visuales de última generación y los DJs más importantes del circuito global. Mayores de 18 años.',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'agotado', 'Agotado', false, 
  '{"electrónica", "DJ", "fiesta"}', '{}'
),
(
  'argentina-jordania-mundial', 'Argentina vs Jordania - Mundial 2026', 'deportivo', '2026-06-27', '18:00',
  'Cierre de fase de grupos: Argentina vs Jordania.',
  'El último partido de la fase de grupos se vive en el Palacio. Argentina enfrenta a Jordania buscando la clasificación a octavos. Vení a alentar con tu bandera y tu camiseta. ¡Vamos Argentina!',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop',
  '{}', '[]', '', 'disponible', 'Entrada libre', true, 
  '{"deportes", "fútbol", "mundial", "argentina", "gratis"}', '{}'
),
(
  'tributo-soda-stereo', 'Tributo a Soda Stereo', 'recital', '2026-07-28', '21:00',
  'La mejor banda tributo de Latinoamérica rinde homenaje a Soda.',
  'Revivimos los grandes éxitos de Soda Stereo con la banda tributo más reconocida de la región. Un show imperdible que te transportará a los mejores momentos del rock en español. ¡Cantá todos los hits!',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop',
  '{}', '[]', 'http://ticketweb.com.ar/', 'ultimos', 'Desde $9.500', false, 
  '{"rock", "tributo", "soda stereo"}', '{}'
);
