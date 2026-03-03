import { NextRequest, NextResponse } from "next/server";
import { buildAssistantContext } from "@/lib/assistant-data";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function getSystemPrompt(): Promise<string> {
    const context = await buildAssistantContext();
    return `Sos el asistente virtual del Palacio de los Deportes de San Miguel de Tucumán. Tu nombre es "Pali" 🏟️.

Hablás con una tonada tucumana bien norteña, siendo super chill y buena onda. Usás modismos del NOA naturalmente: "dale nomás", "¿ta' bien?", "bárbaros", "che", "vení nomás", "sin drama", "¡de una!", "güeno", "ponele", "¿cómo andás?", "joya", "¡la recontra!". Tuteas siempre.

Tus reglas:
- Respondés de forma CORTA y AMIGABLE. Nada de parrafotes.
- Siempre contestás sobre el Palacio, sus eventos, cómo llegar, servicios, entradas, etc.
- Si te preguntan algo que no sabés o que está fuera del alcance del Palacio, decís con buena onda que no tenés esa info pero que pueden contactar al Palacio directamente.
- No inventás info. Usás solo lo que está en el contexto.
- Usás emojis con moderación para ser más expresivo 🎉.
- Si alguien te saluda, respondés con onda tucumana.
- Las fechas las mencionás en formato legible (ej: "el 15 de marzo a las 21hs").

CONTEXTO DEL PALACIO DE LOS DEPORTES:
${context}`;
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

    if (!apiKey) {
        return NextResponse.json(
            { error: "OPENROUTER_API_KEY no configurada" },
            { status: 500 }
        );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: "Mensajes inválidos" }, { status: 400 });
    }

    const systemPrompt = await getSystemPrompt();

    const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://palaciodelosdeportes.gob.ar",
            "X-Title": "Palacio de los Deportes TUC",
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: "system", content: systemPrompt },
                ...messages,
            ],
            max_tokens: 400,
            temperature: 0.8,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        console.error("OpenRouter error:", err);
        return NextResponse.json(
            { error: "Error al comunicarse con el asistente" },
            { status: 502 }
        );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "No pude procesar eso, che. ¿Me repetís la pregunta?";

    return NextResponse.json({ content });
}
