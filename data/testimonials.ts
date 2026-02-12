export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Asistente regular',
    text: 'El Palacio es increíble. La acústica, la organización y la atención son de primer nivel. Siempre vuelvo.',
    rating: 5
  },
  {
    id: '2',
    name: 'Carlos Fernández',
    role: 'Padre de familia',
    text: 'Llevé a mis hijos al festival infantil y fue hermoso. Un lugar seguro, cómodo y con actividades geniales para los chicos.',
    rating: 5
  },
  {
    id: '3',
    name: 'Lucía Romero',
    role: 'Estudiante',
    text: 'Vine al recital de rock y fue una experiencia inolvidable. El sonido es espectacular y la producción impresionante.',
    rating: 5
  },
  {
    id: '4',
    name: 'Roberto Sánchez',
    role: 'Hincha de fútbol',
    text: 'Ver la Copa en pantalla gigante acá es como estar en el estadio. El ambiente es único, todos alentando juntos.',
    rating: 5
  },
  {
    id: '5',
    name: 'Ana Martínez',
    role: 'Docente',
    text: 'Es el mejor espacio cultural de Tucumán. Siempre hay propuestas variadas y de calidad. ¡Muy recomendable!',
    rating: 5
  },
  {
    id: '6',
    name: 'Diego Torres',
    role: 'Músico',
    text: 'Toqué en el Palacio y quedé fascinado. La infraestructura técnica es de nivel internacional.',
    rating: 5
  },
  {
    id: '7',
    name: 'Sofía Herrera',
    role: 'Periodista',
    text: 'Un espacio que transformó la escena cultural de San Miguel. Cada evento es una experiencia cuidada al detalle.',
    rating: 5
  },
  {
    id: '8',
    name: 'Martín López',
    role: 'Vecino de San Miguel',
    text: 'Estoy orgulloso de tener este lugar en mi ciudad. Es un orgullo para todos los tucumanos.',
    rating: 5
  }
];
