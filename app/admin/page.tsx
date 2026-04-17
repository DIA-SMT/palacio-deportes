'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search, Loader2, Upload, X, ImageIcon } from 'lucide-react';
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
    Event,
    EventCategory,
    EventStatus,
} from '@/data/events';

// ── Helpers ────────────────────────────────────────────────
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const categoryLabels: Record<EventCategory, string> = {
    recital: 'Recital',
    cultural: 'Cultural',
    deportivo: 'Deportivo',
    familiar: 'Familiar',
    feria: 'Feria',
};

const statusLabels: Record<EventStatus, string> = {
    disponible: 'Disponible',
    ultimos: 'Últimos lugares',
    agotado: 'Agotado',
    proximamente: 'Próximamente',
};

const emptyFormData = {
    title: '',
    slug: '',
    category: 'recital' as EventCategory,
    dateISO: '',
    time: '',
    shortDescription: '',
    longDescription: '',
    image: '',
    gallery: [] as string[],
    videoClips: [] as { id: string; title: string; thumbnail: string; url: string }[],
    ticketUrl: '',
    status: 'proximamente' as EventStatus,
    priceLabel: '',
    isFree: false,
    tags: [] as string[],
    lineup: [] as string[],
};

// ── Main Component ─────────────────────────────────────────
export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<EventStatus | 'todos'>('todos');

    // Dialog state
    const [formOpen, setFormOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState(emptyFormData);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');

    // Image upload state
    const [uploading, setUploading] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    // Tags & lineup input
    const [tagInput, setTagInput] = useState('');
    const [lineupInput, setLineupInput] = useState('');

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Filter events by search and status
    const filteredEvents = events.filter((event) => {
        if (statusFilter !== 'todos' && event.status !== statusFilter) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            event.title.toLowerCase().includes(q) ||
            event.category.toLowerCase().includes(q) ||
            event.status.toLowerCase().includes(q)
        );
    });

    // ── Form handlers ──────────────────────────────────────

    function openCreateForm() {
        setEditingEvent(null);
        setFormData(emptyFormData);
        setTagInput('');
        setLineupInput('');
        setFormError('');
        setFormOpen(true);
    }

    function openEditForm(event: Event) {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            slug: event.slug,
            category: event.category,
            dateISO: event.dateISO,
            time: event.time,
            shortDescription: event.shortDescription,
            longDescription: event.longDescription,
            image: event.image,
            gallery: event.gallery,
            videoClips: event.videoClips,
            ticketUrl: event.ticketUrl,
            status: event.status,
            priceLabel: event.priceLabel,
            isFree: event.isFree,
            tags: event.tags,
            lineup: event.lineup ?? [],
        });
        setTagInput(event.tags.join(', '));
        setLineupInput((event.lineup ?? []).join(', '));
        setFormError('');
        setFormOpen(true);
    }

    function updateFormField(field: string, value: any) {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };
            // Auto-generate slug from title for new events
            if (field === 'title' && !editingEvent) {
                updated.slug = generateSlug(value);
            }
            return updated;
        });
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const ext = file.name.split('.').pop();
            const path = `events/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
            await uploadEventImage(file, path);
            updateFormField('image', path);
        } catch {
            setFormError('Error al subir la imagen');
        }
        setUploading(false);
        // Reset input
        e.target.value = '';
    }

    async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingGallery(true);
        try {
            const newPaths: string[] = [];
            for (const file of Array.from(files)) {
                const ext = file.name.split('.').pop();
                const path = `events/gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
                await uploadEventImage(file, path);
                newPaths.push(path);
            }
            setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...newPaths] }));
        } catch {
            setFormError('Error al subir imágenes de galería');
        }
        setUploadingGallery(false);
        e.target.value = '';
    }

    function removeGalleryImage(index: number) {
        setFormData((prev) => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index),
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormError('');
        setSaving(true);

        // Parse tags and lineup from comma-separated inputs
        const tags = tagInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
        const lineup = lineupInput
            .split(',')
            .map((l) => l.trim())
            .filter(Boolean);

        const eventData = {
            ...formData,
            tags,
            lineup,
        };

        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, eventData);
            } else {
                await createEvent(eventData);
            }
            setFormOpen(false);
            fetchEvents();
        } catch (err: any) {
            setFormError(err?.message || 'Error al guardar el evento');
        }
        setSaving(false);
    }

    async function handleDelete() {
        if (!deletingEvent) return;
        try {
            await deleteEvent(deletingEvent.id);
            setDeleteDialogOpen(false);
            setDeletingEvent(null);
            fetchEvents();
        } catch (err: any) {
            setFormError(err?.message || 'Error al eliminar el evento');
        }
    }

    function formatDate(dateISO: string) {
        try {
            const date = new Date(dateISO);
            return new Intl.DateTimeFormat('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(date);
        } catch {
            return dateISO;
        }
    }

    // ── Render ─────────────────────────────────────────────

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-foreground">Eventos</h2>
                    <p className="text-muted-foreground">Gestionar los eventos del Palacio de los Deportes</p>
                </div>
                <Button onClick={openCreateForm} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Evento
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card
                    className={`cursor-pointer transition-colors hover:border-foreground/40 ${statusFilter === 'todos' ? 'border-foreground/60 bg-muted/40' : ''}`}
                    onClick={() => setStatusFilter('todos')}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{events.length}</p>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer transition-colors hover:border-green-500/40 ${statusFilter === 'disponible' ? 'border-green-500/60 bg-green-500/5' : ''}`}
                    onClick={() => setStatusFilter(statusFilter === 'disponible' ? 'todos' : 'disponible')}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-500">
                            {events.filter((e) => e.status === 'disponible').length}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer transition-colors hover:border-orange-500/40 ${statusFilter === 'ultimos' ? 'border-orange-500/60 bg-orange-500/5' : ''}`}
                    onClick={() => setStatusFilter(statusFilter === 'ultimos' ? 'todos' : 'ultimos')}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Últimos lugares</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-orange-500">
                            {events.filter((e) => e.status === 'ultimos').length}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer transition-colors hover:border-red-500/40 ${statusFilter === 'agotado' ? 'border-red-500/60 bg-red-500/5' : ''}`}
                    onClick={() => setStatusFilter(statusFilter === 'agotado' ? 'todos' : 'agotado')}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Agotados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-500">
                            {events.filter((e) => e.status === 'agotado').length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Events Table */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">
                            {searchQuery || statusFilter !== 'todos' ? 'No se encontraron eventos con esos filtros' : 'No hay eventos cargados aún'}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Evento</TableHead>
                                        <TableHead className="hidden md:table-cell">Categoría</TableHead>
                                        <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                                        <TableHead className="hidden md:table-cell">Estado</TableHead>
                                        <TableHead className="hidden lg:table-cell">Precio</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEvents.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {event.image ? (
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                                                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-foreground truncate">{event.title}</p>
                                                        <p className="text-xs text-muted-foreground truncate sm:hidden">
                                                            {formatDate(event.dateISO)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant="secondary">{categoryLabels[event.category]}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell whitespace-nowrap">
                                                {formatDate(event.dateISO)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge
                                                    variant={
                                                        event.status === 'disponible'
                                                            ? 'default'
                                                            : event.status === 'ultimos'
                                                                ? 'destructive'
                                                                : event.status === 'agotado'
                                                                    ? 'secondary'
                                                                    : 'outline'
                                                    }
                                                >
                                                    {statusLabels[event.status]}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">{event.priceLabel}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditForm(event)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => {
                                                            setDeletingEvent(event);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ── Create/Edit Dialog ──────────────────────────── */}
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Editar Evento' : 'Crear Evento'}</DialogTitle>
                        <DialogDescription>
                            {editingEvent
                                ? 'Modificá los datos del evento y guardá los cambios.'
                                : 'Completá los datos del nuevo evento.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => updateFormField('title', e.target.value)}
                                placeholder="Nombre del evento"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <Label htmlFor="slug">Enlace (URL pública)</Label>
                            <div className="flex rounded-md border border-input bg-muted/50 focus-within:ring-1 focus-within:ring-ring">
                                <span className="inline-flex items-center px-3 text-sm text-muted-foreground border-r border-input bg-muted rounded-l-md pointer-events-none">
                                    /eventos/
                                </span>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    readOnly
                                    disabled
                                    className="border-0 focus-visible:ring-0 rounded-l-none bg-transparent opacity-100 placeholder:text-muted-foreground/70"
                                    placeholder="nombre-del-evento"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Se genera automáticamente a partir del título. No se puede modificar manualmente para no romper enlaces existentes.</p>
                        </div>

                        {/* Category & Status row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Categoría *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(v) => updateFormField('category', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(categoryLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Estado *</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v) => updateFormField('status', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(statusLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Date & Time row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dateISO">Fecha *</Label>
                                <Input
                                    id="dateISO"
                                    type="date"
                                    value={formData.dateISO}
                                    onChange={(e) => updateFormField('dateISO', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Hora *</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => updateFormField('time', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">Descripción corta *</Label>
                            <Textarea
                                id="shortDescription"
                                value={formData.shortDescription}
                                onChange={(e) => updateFormField('shortDescription', e.target.value)}
                                placeholder="Breve resumen del evento (aparece en las tarjetas)"
                                rows={2}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="longDescription">Descripción completa *</Label>
                            <Textarea
                                id="longDescription"
                                value={formData.longDescription}
                                onChange={(e) => updateFormField('longDescription', e.target.value)}
                                placeholder="Descripción detallada del evento"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Imagen principal</Label>
                            {formData.image && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted mb-2">
                                    <img
                                        src={
                                            formData.image.startsWith('http') || formData.image.startsWith('/')
                                                ? formData.image
                                                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/${formData.image}`
                                        }
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8"
                                        onClick={() => updateFormField('image', '')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                                    <label className="cursor-pointer">
                                        {uploading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Upload className="mr-2 h-4 w-4" />
                                        )}
                                        {uploading ? 'Subiendo...' : 'Subir imagen'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                        />
                                    </label>
                                </Button>
                                <span className="text-xs text-muted-foreground">o</span>
                                <Input
                                    placeholder="URL de imagen externa"
                                    value={formData.image}
                                    onChange={(e) => updateFormField('image', e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="space-y-2">
                            <Label>Galería de imágenes</Label>
                            {formData.gallery.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {formData.gallery.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                                            <img
                                                src={
                                                    img.startsWith('http') || img.startsWith('/')
                                                        ? img
                                                        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/${img}`
                                                }
                                                alt={`Gallery ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 h-6 w-6"
                                                onClick={() => removeGalleryImage(i)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button type="button" variant="outline" size="sm" disabled={uploadingGallery} asChild>
                                <label className="cursor-pointer">
                                    {uploadingGallery ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="mr-2 h-4 w-4" />
                                    )}
                                    {uploadingGallery ? 'Subiendo...' : 'Agregar imágenes'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleGalleryUpload}
                                        disabled={uploadingGallery}
                                    />
                                </label>
                            </Button>
                        </div>

                        {/* Price row */}
                        <div className="grid sm:grid-cols-2 gap-4 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="priceLabel">Precio de la entrada *</Label>
                                <Input
                                    id="priceLabel"
                                    value={formData.priceLabel}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, '');
                                        if (!rawValue) {
                                            updateFormField('priceLabel', '');
                                        } else {
                                            const number = parseInt(rawValue, 10);
                                            updateFormField('priceLabel', `$ ${number.toLocaleString('es-AR')}`);
                                        }
                                    }}
                                    placeholder="Ej: 8000"
                                    required={!formData.isFree}
                                />
                            </div>
                            <div className="flex items-center gap-3 pb-2">
                                <Switch
                                    id="isFree"
                                    checked={formData.isFree}
                                    onCheckedChange={(v) => updateFormField('isFree', v)}
                                />
                                <Label htmlFor="isFree">Evento gratuito</Label>
                            </div>
                        </div>

                        {/* Ticket URL */}
                        <div className="space-y-2">
                            <Label htmlFor="ticketUrl">URL de venta de entradas</Label>
                            <Input
                                id="ticketUrl"
                                value={formData.ticketUrl}
                                onChange={(e) => updateFormField('ticketUrl', e.target.value)}
                                placeholder="https://ticketweb.com.ar/..."
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (separados por coma)</Label>
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="rock, música en vivo, festival"
                            />
                        </div>

                        {/* Lineup */}
                        <div className="space-y-2">
                            <Label htmlFor="lineup">Lineup / Artistas (separados por coma)</Label>
                            <Input
                                id="lineup"
                                value={lineupInput}
                                onChange={(e) => setLineupInput(e.target.value)}
                                placeholder="Artista 1, Artista 2, Artista 3"
                            />
                        </div>

                        {/* Error */}
                        {formError && (
                            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                {formError}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={saving} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : editingEvent ? (
                                    'Guardar cambios'
                                ) : (
                                    'Crear evento'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ── Delete Confirmation ─────────────────────────── */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Estás a punto de eliminar <strong>{deletingEvent?.title}</strong>. Esta acción no se puede
                            deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
