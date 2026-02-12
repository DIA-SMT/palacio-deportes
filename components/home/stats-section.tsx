'use client';

import React from "react"

import { useEffect, useRef, useState } from 'react';
import { Users, MapPin, Calendar, Ticket } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 8500,
    suffix: '',
    label: 'Capacidad',
  },
  {
    icon: MapPin,
    value: 4,
    suffix: '',
    label: 'Accesos',
  },
  {
    icon: Calendar,
    value: 35,
    suffix: '+',
    label: 'Eventos por mes',
  },
  {
    icon: Ticket,
    value: 150000,
    suffix: '+',
    label: 'Asistentes anuales',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            El Palacio en Números
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Un espacio pensado para grandes experiencias
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, suffix, label }: Stat) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 lg:p-8 bg-card rounded-2xl border border-border hover:border-accent transition-colors group"
    >
      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-accent" />
      </div>
      <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
        {count.toLocaleString('es-AR')}
        {suffix}
      </div>
      <div className="text-sm lg:text-base text-muted-foreground text-center">{label}</div>
    </div>
  );
}
