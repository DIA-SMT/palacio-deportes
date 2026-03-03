'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, ArrowLeft, Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    // Don't protect the login page itself
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setChecking(false);
            setAuthenticated(true); // Allow rendering the login page
            return;
        }

        async function checkAuth() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace('/admin/login');
                return;
            }
            setAuthenticated(true);
            setChecking(false);
        }
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.replace('/admin/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [router, isLoginPage]);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.replace('/admin/login');
    }

    // Login page gets rendered without admin chrome
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Loading state while checking auth
    if (checking || !authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <LayoutDashboard className="h-5 w-5 text-accent" />
                            <h1 className="text-lg font-bold text-foreground">Admin — Palacio de los Deportes</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Ver sitio
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Salir
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
