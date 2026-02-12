'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    eventos: [
      { name: 'Agenda Completa', href: '/eventos' },
      { name: 'Próximos Eventos', href: '/eventos?filter=proximos' },
      { name: 'Eventos Gratuitos', href: '/eventos?filter=gratis' },
      { name: 'Transmisiones', href: '/eventos?category=deportivo' },
    ],
    informacion: [
      { name: 'Cómo Llegar', href: '/informacion#como-llegar' },
      { name: 'Preguntas Frecuentes', href: '/informacion#faq' },
      { name: 'Normas y Seguridad', href: '/informacion#normas' },
      { name: 'Accesibilidad', href: '/informacion#accesibilidad' },
    ],
    institucional: [
      { name: 'Sobre Nosotros', href: '/informacion' },
      { name: 'Prensa', href: '/contacto#prensa' },
      { name: 'Contacto', href: '/contacto' },
      { name: 'Trabajá con Nosotros', href: '/contacto' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  Palacio de los Deportes
                </span>
                <span className="text-sm text-muted-foreground">
                  San Miguel de Tucumán
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              El mejor espacio para recitales, eventos culturales, transmisiones deportivas y entretenimiento en Tucumán.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Recibí novedades
              </h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1"
                  aria-label="Email para newsletter"
                />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Suscribirse</span>
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Eventos */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Eventos</h3>
            <ul className="space-y-3">
              {links.eventos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Información</h3>
            <ul className="space-y-3">
              {links.informacion.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Institucional</h3>
            <ul className="space-y-3">
              {links.institucional.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Municipalidad de San Miguel de Tucumán. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terminos"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
