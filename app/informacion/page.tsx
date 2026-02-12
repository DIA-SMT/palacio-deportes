import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bus, Car, Accessibility, Clock, ShieldCheck, AlertCircle, Users } from 'lucide-react';
import { faqs } from '@/data/faqs';

export default function InformacionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Información Útil
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Todo lo que necesitás saber para disfrutar tu visita
            </p>
          </div>

          {/* Como Llegar */}
          <section id="como-llegar" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-balance">
              Cómo Llegar
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Dirección</h3>
                      <p className="text-muted-foreground mb-3">
                        Av. Coronel Suárez 200
                        <br />
                        San Miguel de Tucumán, Tucumán
                      </p>
                      <p className="text-sm text-muted-foreground">
                        En pleno centro de la ciudad, con fácil acceso desde cualquier punto.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Bus className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Transporte Público</h3>
                      <p className="text-muted-foreground mb-3">
                        Líneas que llegan: 102, 100, 118
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Paradas a menos de 100 metros del acceso principal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Estacionamiento</h3>
                      <p className="text-muted-foreground mb-3">
                        Estacionamiento gratuito con capacidad para 200+ vehículos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        También hay playas privadas en las cercanías.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Accessibility className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Accesibilidad</h3>
                      <p className="text-muted-foreground mb-3">
                        Rampas, ascensores y espacios reservados disponibles
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Personal capacitado para asistir en todo momento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Accesos */}
          <section id="accesos" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-balance">
              Accesos y Horarios
            </h2>
            <Card className="bg-card/50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Apertura de Puertas</h3>
                      <p className="text-muted-foreground text-sm">
                        Las puertas abren 2 hora antes del inicio de cada evento.
                        Te recomendamos llegar con anticipación para evitar demoras.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Identificación</h3>
                      <p className="text-muted-foreground text-sm">
                        Recordá traer tu DNI y la entrada (digital o impresa).
                        Los menores deben estar acompañados por un adulto responsable.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Control de Seguridad</h3>
                      <p className="text-muted-foreground text-sm">
                        Todos los asistentes pasan por controles de seguridad.
                        Los elementos prohibidos serán retenidos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Qué Llevar</h3>
                      <p className="text-muted-foreground text-sm">
                        Permitido: celular, cámara compacta, abrigo, bolso pequeño.
                        No permitido: bebidas, comida, paraguas, cámaras profesionales.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-balance">
              Preguntas Frecuentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Normas */}
          <section id="normas" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-balance">
              Normas y Seguridad
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Elementos Permitidos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1 bg-accent text-accent-foreground">✓</Badge>
                      <span className="text-muted-foreground">Teléfono celular</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1 bg-accent text-accent-foreground">✓</Badge>
                      <span className="text-muted-foreground">Cámara fotográfica compacta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1 bg-accent text-accent-foreground">✓</Badge>
                      <span className="text-muted-foreground">Abrigo y ropa de abrigo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1 bg-accent text-accent-foreground">✓</Badge>
                      <span className="text-muted-foreground">Bolso o mochila pequeña</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-1 bg-accent text-accent-foreground">✓</Badge>
                      <span className="text-muted-foreground">Documentos personales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Elementos Prohibidos</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1">✗</Badge>
                      <span className="text-muted-foreground">Bebidas alcohólicas y alimentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1">✗</Badge>
                      <span className="text-muted-foreground">Cámaras profesionales y grabadoras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1">✗</Badge>
                      <span className="text-muted-foreground">Armas blancas y elementos cortantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1">✗</Badge>
                      <span className="text-muted-foreground">Paraguas y banderas con palo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1">✗</Badge>
                      <span className="text-muted-foreground">Pirotecnia y bengalas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Compromiso de Seguridad</h3>
                    <p className="text-sm text-muted-foreground text-balance">
                      Trabajamos constantemente para garantizar la seguridad de todos los asistentes.
                      Contamos con personal de seguridad capacitado, protocolos de emergencia y
                      sistemas de evacuación. Tu bienestar es nuestra prioridad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Accesibilidad */}
          <section id="accesibilidad" className="scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-balance">
              Accesibilidad
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Accessibility className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Un espacio para todas las personas
                    </h3>
                    <p className="text-muted-foreground text-balance">
                      El Palacio de los Deportes está diseñado para que todas las personas puedan
                      disfrutar de los eventos de manera cómoda y segura.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Infraestructura Adaptada</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Rampas de acceso en todos los sectores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Ascensores adaptados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Baños para personas con movilidad reducida</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Espacios reservados en platea</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Asistencia y Servicios</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Personal capacitado en atención inclusiva</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Señalización en braille</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Ingreso prioritario para personas con discapacidad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Acompañante ingresa sin cargo</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-6">
                  Si necesitás asistencia especial o tenés consultas sobre accesibilidad,
                  contactanos con anticipación a través de nuestra página de contacto.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
