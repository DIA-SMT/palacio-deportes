# Anonimizador de escritos judiciales

`anonimizador-escritos.html` es una herramienta de un solo archivo: se descarga, se abre con doble clic en cualquier navegador moderno y funciona sin internet.

- Extrae el texto de un PDF (con PDF.js, incluido dentro del archivo) o de un .txt / texto pegado.
- Reemplaza nombres de personas, DNI, CUIL/CUIT, domicilios, teléfonos, correos y datos de salud por marcadores consistentes (`[PERSONA 1]`, `[DNI 1]`, …).
- Muestra original y anonimizado lado a lado, permite desmarcar falsos positivos y agregar datos a mano.
- Descarga el resultado en .txt y, opcionalmente, la tabla de equivalencias en CSV.

**Privacidad:** la página declara una Content-Security-Policy con `connect-src 'none'`, por lo que el navegador bloquea cualquier conexión de red. Nada se envía a servidores.

La detección es heurística (reglas y diccionarios): revisar siempre el resultado. Los PDF escaneados requieren OCR previo.

## Regenerar el HTML

```sh
npm pack pdfjs-dist@3.11.174 && mkdir -p vendor && tar xzf pdfjs-dist-3.11.174.tgz && mv package vendor/pdfjs-dist
node build.mjs
```

El código de la aplicación está en `src/app.html`.
