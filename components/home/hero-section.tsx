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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.4) 50%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #0a0a0a 100%)' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-24 pb-12 lg:pt-36 lg:pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              <span className="block text-foreground mb-1">Palacio de los</span>
              <span className="block text-accent">Deportes</span>
            </h1>
            <div className="space-y-3 max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium text-balance leading-tight">
                El corazón de los grandes eventos en Tucumán se renueva por completo.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground/90 text-balance leading-relaxed">
                Somos el punto de referencia para el deporte, la música y la cultura de toda la región. Explora nuestra cartelera y vive experiencias inolvidables en el estadio más emblemático del Jardín de la República.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent/20">
              <Link href="/eventos">
                Ver Eventos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base font-semibold border-2 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              <Link href="http://ticketweb.com.ar/" target="_blank" rel="noopener noreferrer">
                <Ticket className="mr-2 h-4 w-4" />
                Comprar Entradas
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 animate-bounce opacity-40">
            <div className="w-5 h-8 mx-auto border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5">
              <div className="w-0.5 h-1.5 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
