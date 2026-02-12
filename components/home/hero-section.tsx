'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ticket } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/estadio_smt.jpg"
        >
          <source src="/sape.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              <span className="block text-foreground">Palacio de los</span>
              <span className="block text-accent">Deportes</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              El mejor espacio para recitales, eventos culturales y transmisiones deportivas en Tucumán
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base">
              <Link href="/eventos">
                Ver Eventos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              <Link href="https://example.com/tickets" target="_blank" rel="noopener noreferrer">
                <Ticket className="mr-2 h-5 w-5" />
                Comprar Entradas
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 mx-auto border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
