export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Cómo compro entradas?',
    answer: 'Podés comprar entradas a través de los links de cada evento en nuestra página web o en las boleterías habilitadas. Te recomendamos comprar online para evitar colas y asegurar tu lugar.'
  },
  {
    id: '2',
    question: '¿Puedo llevar menores de edad?',
    answer: 'Sí, los menores son bienvenidos en eventos familiares y culturales. Para recitales nocturnos, deben estar acompañados por un adulto responsable. Algunos shows tienen restricción de edad (mayores de 16 o 18 años).'
  },
  {
    id: '3',
    question: '¿Hay estacionamiento disponible?',
    answer: 'Sí, contamos con estacionamiento gratuito con capacidad para más de 500 vehículos. También hay playas de estacionamiento privadas en las cercanías.'
  },
  {
    id: '4',
    question: '¿El lugar es accesible?',
    answer: 'Sí, el Palacio cuenta con rampas, baños adaptados, espacios reservados para personas con movilidad reducida y señalización inclusiva. Nuestro personal está capacitado para asistirte.'
  },
  {
    id: '5',
    question: '¿Qué puedo llevar al evento?',
    answer: 'Podés llevar tu celular, cámara compacta, abrigo y elementos personales en bolsos pequeños. No están permitidos: alimentos, bebidas, paraguas, grabadoras profesionales ni elementos peligrosos.'
  },
  {
    id: '6',
    question: '¿Hay servicio de gastronomía?',
    answer: 'Sí, dentro del predio contamos con puestos de comida, bebidas y snacks. Aceptamos efectivo y todas las tarjetas.'
  },
  {
    id: '7',
    question: '¿Qué pasa si se suspende un evento?',
    answer: 'En caso de suspensión o reprogramación, notificamos inmediatamente por mail, redes sociales y la web. Las entradas se reembolsan automáticamente o se respetan para la nueva fecha.'
  },
  {
    id: '8',
    question: '¿Puedo devolver mi entrada?',
    answer: 'Las devoluciones solo están permitidas en caso de suspensión definitiva del evento. No se aceptan cambios ni devoluciones por decisión del comprador, salvo casos excepcionales previstos por ley.'
  }
];
