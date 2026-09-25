// Genera anonimizador-escritos.html (un único archivo, sin dependencias externas)
// Uso: node build.mjs   (requiere pdfjs-dist@3.11.174 en ./vendor o en node_modules)
import {readFileSync, writeFileSync, existsSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const cand = [join(here, "vendor/pdfjs-dist/build"), join(here, "node_modules/pdfjs-dist/build")];
const dir = cand.find(d => existsSync(join(d, "pdf.min.js")));
if (!dir) throw new Error("Falta pdfjs-dist@3.11.174: npm pack pdfjs-dist@3.11.174 y descomprimir en vendor/pdfjs-dist");
const lib = readFileSync(join(dir, "pdf.min.js"), "utf8");
const worker = readFileSync(join(dir, "pdf.worker.min.js"), "utf8");
for (const [n, c] of [["lib", lib], ["worker", worker]]) if (/<\/script/i.test(c)) throw new Error(n + " contiene </script");
const tpl = readFileSync(join(here, "src/app.html"), "utf8");
const out = tpl
  // El worker se carga en el hilo principal (globalThis.pdfjsWorker): funciona abriendo el archivo con file://
  .replace("<!--PDFJS_WORKER-->", () => "<script>\n" + worker + "\n</script>")
  .replace("<!--PDFJS_LIB-->", () => "<script>\n" + lib + "\n</script>");
writeFileSync(join(here, "anonimizador-escritos.html"), out);
console.log("OK", (out.length / 1024).toFixed(0), "KB");
