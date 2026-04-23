'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { getEvents, Event } from '@/data/events';
import { isPastEvent } from '@/lib/utils';

export function EventsCarousel() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const allEvents = await getEvents();
      const now = new Date();
      const upcoming = allEvents
        .filter((event) => !event.dateISO || new Date(event.dateISO) >= now)
        .sort((a, b) => {
          if (!a.dateISO) return 1;
          if (!b.dateISO) return -1;
          return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
        })
        .slice(0, 12);
      setUpcomingEvents(upcoming);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const getCategoryLabel = (category: string) => {
    const labels = {
      recital: 'Recital',
      cultural: 'Cultural',
      deportivo: 'Deportivo',
      familiar: 'Familiar',
      feria: 'Feria',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      disponible: { label: 'Disponible', variant: 'default' as const },
      ultimos: { label: 'Últimos lugares', variant: 'destructive' as const },
      agotado: { label: 'Agotado', variant: 'secondary' as const },
      proximamente: { label: 'Próximamente', variant: 'outline' as const },
    };
    return variants[status as keyof typeof variants] || variants.disponible;
  };

  const formatDate = (dateISO: string | null) => {
    if (!dateISO) return 'Fecha por confirmar';
    const date = new Date(dateISO);
    return new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Próximos Eventos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            No te pierdas los mejores shows y eventos en el Palacio
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay eventos próximos por el momento.</p>
          </div>
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {upcomingEvents.map((event) => {
                const statusBadge = getStatusBadge(event.status);
                return (
                  <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full flex flex-col overflow-hidden group hover:border-primary/50 transition-colors relative">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 flex gap-2 z-20">
                          <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                            {getCategoryLabel(event.category)}
                          </Badge>
                          {event.isFree && (
                            <Badge className="bg-accent text-accent-foreground">Gratis</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="flex-1 p-5">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.dateISO)}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}hs</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                          <Link href={`/eventos/${event.slug}`} className="after:absolute after:inset-0 after:z-10">
                            {event.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {event.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          {event.priceLabel && <span className="text-sm font-semibold text-foreground">{event.priceLabel}</span>}
                        </div>
                      </CardContent>
                      <CardFooter className="p-5 pt-0 flex gap-2 relative z-20">
                        {event.ticketUrl && event.status !== 'agotado' && !isPastEvent(event.dateISO) && (
                          <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                              Comprar
                              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        )}

        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline">
            <Link href="/eventos">Ver Todos los Eventos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
