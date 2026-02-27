import { events } from "@/data/events";
import { faqs } from "@/data/faqs";

/**
 * Genera el contexto completo del Palacio de los Deportes
 * para incluirlo en el system prompt del asistente virtual.
 */
export function buildAssistantContext(): string {
    const now = new Date();
    const currentDate = now.toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // ─── Eventos ────────────────────────────────────────────────────────────────
    const eventsContext = events
        .map((e) => {
            const date = new Date(e.dateISO + "T00:00:00");
            const formattedDate = date.toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            const statusLabel =
                e.status === "agotado"
                    ? "AGOTADO"
                    : e.status === "ultimos"
                        ? "ÚLTIMAS ENTRADAS"
                        : e.status === "proximamente"
                            ? "PRÓXIMAMENTE"
                            : "DISPONIBLE";
            return `- ${e.title} | Categoría: ${e.category} | Fecha: ${formattedDate} a las ${e.time}hs | Precio: ${e.priceLabel} | Estado: ${statusLabel} | ${e.shortDescription}`;
        })
        .join("\n");

    // ─── FAQs ────────────────────────────────────────────────────────────────────
    const faqsContext = faqs
        .map((f) => `P: ${f.question}\nR: ${f.answer}`)
        .join("\n\n");

    return `
HOY ES: ${currentDate}

─── INFORMACIÓN GENERAL ────────────────────────────────────────────
Nombre: Palacio de los Deportes de San Miguel de Tucumán
Dirección: Av. Coronel Suárez 200, San Miguel de Tucumán, Tucumán
Web: www.palaciodelosdeportes.gob.ar

─── CÓMO LLEGAR ────────────────────────────────────────────────────
- Dirección: Av. Coronel Suárez 200, centro de San Miguel de Tucumán
- Transporte público: Líneas de colectivo 102, 100, 118. Paradas a menos de 100 metros del acceso principal.
- Estacionamiento: Gratuito, capacidad para más de 500 vehículos. También hay playas privadas en las cercanías.
- Está en pleno centro, fácil acceso desde cualquier punto de la ciudad.

─── ACCESOS Y HORARIOS ─────────────────────────────────────────────
- Las puertas abren 2 horas antes del inicio de cada evento.
- Traer DNI y entrada (digital o impresa).
- Los menores deben estar acompañados por un adulto responsable.

─── ACCESIBILIDAD ──────────────────────────────────────────────────
- Rampas de acceso en todos los sectores
- Ascensores adaptados
- Baños para personas con movilidad reducida
- Espacios reservados en platea
- Personal capacitado en atención inclusiva
- Señalización en braille
- Ingreso prioritario para personas con discapacidad
- Acompañante ingresa sin cargo

─── NORMAS ─────────────────────────────────────────────────────────
Permitido: celular, cámara compacta, abrigo, bolso pequeño, documentos.
NO permitido: bebidas alcohólicas, alimentos, cámaras profesionales, grabadoras, armas, paraguas, banderas con palo, pirotecnia.

─── GASTRONOMÍA ────────────────────────────────────────────────────
- Puestos de comida, bebidas y snacks dentro del predio.
- Se acepta efectivo y todas las tarjetas.

─── ENTRADAS ───────────────────────────────────────────────────────
- Se compran online en la web de cada evento o en boleterías habilitadas.
- Se recomiendan las compras online para evitar colas.
- En caso de suspensión, se reembolsan automáticamente o se respetan para la nueva fecha.
- No se aceptan devoluciones por decisión del comprador, salvo casos excepcionales.

─── EVENTOS PROGRAMADOS ────────────────────────────────────────────
${eventsContext}

─── PREGUNTAS FRECUENTES ───────────────────────────────────────────
${faqsContext}
`.trim();
}
