import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

export function LocationSection() {
  return (
    <section className="py-16 lg:py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Visitanos en San Miguel de Tucumán
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Ubicados estratégicamente en el corazón de la ciudad, con fácil acceso en transporte público y amplio estacionamiento.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Dirección</div>
                  <div className="text-muted-foreground">
                    Av. Coronel Suárez 200, San Miguel de Tucumán.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Transporte</div>
                  <div className="text-muted-foreground">
                    Acceso directo por líneas 102, 105, 110. Estacionamiento gratuito disponible.
                  </div>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/informacion#como-llegar">
                Cómo Llegar
                <Navigation className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-border">
            <img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1020,h_765/https://aycrevista.com.ar/wp-content/uploads/2025/04/PALACIO-DE-LOS-DEPORTES-AYC-TUCUMAN-07-1020x765.jpg"
              alt="Ubicación del Palacio de los Deportes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-accent mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Palacio de los Deportes</span>
              </div>
              <p className="text-sm text-muted-foreground">San Miguel de Tucumán</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
