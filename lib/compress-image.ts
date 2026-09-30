const MAX_DIMENSION = 1600;
const QUALITY = 0.8;

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
    return new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
}

/**
 * Resize an image so its longest side is at most MAX_DIMENSION px and re-encode it
 * as WebP (JPEG as fallback). Returns the original file if it can't be decoded
 * (e.g. GIF, SVG, HEIC on non-Safari browsers) or if compression doesn't make it smaller.
 */
export async function compressImage(file: File): Promise<File> {
    if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
        return file;
    }

    try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();

        // Older Safari silently returns PNG when WebP encoding isn't supported
        let blob = await canvasToBlob(canvas, 'image/webp');
        let ext = 'webp';
        if (!blob || blob.type !== 'image/webp') {
            blob = await canvasToBlob(canvas, 'image/jpeg');
            ext = 'jpg';
        }

        if (!blob || blob.size >= file.size) return file;

        const baseName = file.name.replace(/\.[^.]+$/, '');
        return new File([blob], `${baseName}.${ext}`, { type: blob.type });
    } catch (err) {
        console.warn('No se pudo comprimir la imagen, se sube la original:', err);
        return file;
    }
}
