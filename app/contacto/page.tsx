import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Briefcase } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Contacto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Estamos para ayudarte. Encontrá acá toda la información para comunicarte con nosotros.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Contact Details */}
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-foreground">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Dirección</div>
                      <div className="text-sm text-muted-foreground">
                        Av. Coronel Suárez 200<br />
                        San Miguel de Tucumán<br />
                        Tucumán, Argentina
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Teléfono</div>
                      <div className="text-sm text-muted-foreground">
                        <a href="tel:+543811234567" className="hover:text-accent transition-colors">
                          +54 381 123-4567
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Email</div>
                      <div className="text-sm text-muted-foreground">
                        <a href="mailto:palacio@smt.gob.ar" className="hover:text-accent transition-colors">
                          palacio@smt.gob.ar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Press and Production */}
            <Card id="prensa" className="scroll-mt-24">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Prensa y Producción</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Para consultas de prensa, cobertura de eventos o propuestas de producción, contactate
                    directamente con nuestro equipo.
                  </p>
                  <div>
                    <div className="font-medium text-foreground mb-1">Email de Prensa:</div>
                    <a href="mailto:prensa@palaciodeportes.gob.ar" className="text-accent hover:underline">
                      prensa@palaciodeportes.gob.ar
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">WhatsApp Producción:</div>
                    <a href="https://wa.me/543811234567" className="text-accent hover:underline">
                      +54 9 381 123-4567
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes:</span>
                    <span className="font-medium text-foreground">9:00 - 18:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span className="font-medium text-foreground">10:00 - 14:00 hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos y Feriados:</span>
                    <span className="font-medium text-foreground">Cerrado</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  En días de evento, el horario de atención se extiende hasta la finalización del mismo.
                </p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="sm:col-span-2 lg:col-span-3">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Seguinos en Redes</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 rounded-lg bg-secondary transition-all ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Entérate de los próximos eventos, promociones y novedades siguiéndonos en redes sociales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
