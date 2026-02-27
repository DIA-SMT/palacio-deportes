"use client";

import dynamic from "next/dynamic";

const VirtualAssistant = dynamic(
    () => import("@/components/chat/virtual-assistant").then((m) => m.VirtualAssistant),
    { ssr: false }
);

export function AssistantWrapper() {
    return <VirtualAssistant />;
}
