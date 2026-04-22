'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Search, ExternalLink } from 'lucide-react';
import { getEvents, Event, EventCategory } from '@/data/events';
import { isPastEvent } from '@/lib/utils';

export default function EventosPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'todas'>('todas');
  const [priceFilter, setPriceFilter] = useState<'todos' | 'gratis' | 'pago'>('todos');
  const [timeFilter, setTimeFilter] = useState<'todos' | 'anteriores' | 'proximos'>('proximos');

  useEffect(() => {
    async function fetchEvents() {
      const events = await getEvents();
      setAllEvents(events);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.shortDescription.toLowerCase().includes(query) ||
          event.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter !== 'todas' && event.category !== categoryFilter) {
        return false;
      }

      // Price filter
      if (priceFilter === 'gratis' && !event.isFree) return false;
      if (priceFilter === 'pago' && event.isFree) return false;

      // Time filter
      if (timeFilter !== 'todos') {
        // Events without a date are treated as upcoming
        if (!event.dateISO) {
          if (timeFilter === 'anteriores') return false;
        } else {
          const eventDate = new Date(event.dateISO);
          eventDate.setHours(0, 0, 0, 0);
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          if (timeFilter === 'anteriores' && eventDate >= now) return false;
          if (timeFilter === 'proximos' && eventDate < now) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (!a.dateISO) return 1;
      if (!b.dateISO) return -1;
      return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
    });
  }, [allEvents, searchQuery, categoryFilter, priceFilter, timeFilter]);

  const categories = [
    { value: 'todas' as const, label: 'Todas' },
    { value: 'recital' as const, label: 'Recitales' },
    { value: 'cultural' as const, label: 'Culturales' },
    { value: 'deportivo' as const, label: 'Deportivos' },
    { value: 'familiar' as const, label: 'Familiares' },
    { value: 'feria' as const, label: 'Ferias' },
  ];

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
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Todos los Eventos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Encontrá el evento perfecto para vos!
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-6">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Time Filter */}
            <div className="flex gap-2 justify-center flex-wrap">
              <Button
                variant={timeFilter === 'todos' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('todos')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={timeFilter === 'proximos' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('proximos')}
                size="sm"
              >
                Próximos
              </Button>
              <Button
                variant={timeFilter === 'anteriores' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('anteriores')}
                size="sm"
              >
                Anteriores
              </Button>
            </div>

            {/* Category Filter - Comentado temporalmente por pedido del usuario */}
            {/* 
            <div className="flex gap-2 justify-center flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={categoryFilter === cat.value ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter(cat.value)}
                  size="sm"
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            */}

            {/* Price Filter - Comentado temporalmente por pedido del usuario */}

            <div className="flex gap-2 justify-center flex-wrap">
              <Button
                variant={priceFilter === 'todos' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('todos')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={priceFilter === 'gratis' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('gratis')}
                size="sm"
              >
                Gratis
              </Button>
              <Button
                variant={priceFilter === 'pago' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('pago')}
                size="sm"
              >
                Con Entrada
              </Button>
            </div>

          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-sm text-muted-foreground">
            {loading ? 'Cargando eventos...' : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}`}
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const statusBadge = getStatusBadge(event.status);
                return (
                  <Card key={event.id} className="flex flex-col h-full overflow-hidden group hover:border-primary/50 transition-colors relative">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 flex gap-2 z-20">
                        {event.isFree && (
                          <Badge className="bg-accent text-accent-foreground">Gratis</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="flex-1 p-5">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span suppressHydrationWarning>{formatDate(event.dateISO)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}hs</span>
                        </div>
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
                        {isPastEvent(event.dateISO) ? (
                          <Badge variant="secondary">Finalizado</Badge>
                        ) : (
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        )}
                        <span className="text-sm font-semibold text-foreground">{event.priceLabel}</span>
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No se encontraron eventos con esos filtros</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('todas');
                  setPriceFilter('todos');
                  setTimeFilter('todos');
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
