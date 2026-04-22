'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Calendar, Clock, MapPin, Share2, ExternalLink, AlertCircle } from 'lucide-react';
import { getEventBySlug, getEvents, Event } from '@/data/events';
import { isPastEvent } from '@/lib/utils';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const eventData = await getEventBySlug(slug);
      if (!eventData) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setEvent(eventData);

      // Fetch similar events
      const allEvents = await getEvents();
      const similar = allEvents
        .filter((e) => e.category === eventData.category && e.id !== eventData.id)
        .slice(0, 3);
      setSimilarEvents(similar);
      setLoading(false);
    }
    fetchEvent();
  }, [slug]);

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
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-6 w-64 mb-6" />
            <Skeleton className="aspect-[21/9] w-full rounded-2xl mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Evento no encontrado</h1>
            <p className="text-muted-foreground mb-6">El evento que buscás no existe o fue eliminado.</p>
            <Button asChild>
              <Link href="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusBadge = getStatusBadge(event.status);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/eventos">Eventos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{event.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Meta */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{getCategoryLabel(event.category)}</Badge>
                  {event.isFree && <Badge className="bg-accent text-accent-foreground">Gratis</Badge>}
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="capitalize">{formatDate(event.dateISO)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{event.time} hs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Palacio de los Deportes</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Sobre el Evento</h2>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  {event.longDescription}
                </p>
              </div>

              {/* Lineup if available */}
              {event.lineup && event.lineup.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Lineup</h2>
                    <ul className="space-y-2">
                      {event.lineup.map((artist, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          {artist}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <Separator />

              {/* Important Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Información Importante</h2>
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Las puertas abren 1 hora antes del inicio del evento. Te recomendamos llegar con anticipación.
                        </p>
                        <p>
                          Consultá las normas de acceso y elementos permitidos en nuestra{' '}
                          <Link href="/informacion#normas" className="text-accent hover:underline">
                            página de información
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gallery if available */}
              {event.gallery.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Galería</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {event.gallery.map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${event.title} - imagen ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Estado</div>
                    <Badge variant={statusBadge.variant} className="text-base px-3 py-1">
                      {statusBadge.label}
                    </Badge>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Precio</div>
                    <div className="text-2xl font-bold text-foreground">{event.priceLabel}</div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {event.ticketUrl && event.status !== 'agotado' && !isPastEvent(event.dateISO) && (
                      <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                        <Link href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                          Comprar Entradas
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <Share2 className="mr-2 h-5 w-5" />
                      Compartir
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-semibold text-foreground mb-3">Ubicación</div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Palacio de los Deportes</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Principal 1234
                        <br />
                        San Miguel de Tucumán
                      </p>
                      <Button asChild variant="link" className="px-0 h-auto text-accent">
                        <Link href="/informacion#como-llegar">Ver cómo llegar</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">También te puede interesar</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarEvents.map((similarEvent) => {
                  const simStatusBadge = getStatusBadge(similarEvent.status);
                  return (
                    <Card key={similarEvent.id} className="overflow-hidden group relative hover:border-primary/50 transition-colors">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={similarEvent.image || "/placeholder.svg"}
                          alt={similarEvent.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                          <Link href={`/eventos/${similarEvent.slug}`} className="after:absolute after:inset-0 after:z-10">
                            {similarEvent.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {formatDate(similarEvent.dateISO)}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant={simStatusBadge.variant}>{simStatusBadge.label}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
