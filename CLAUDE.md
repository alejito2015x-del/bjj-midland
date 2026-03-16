# BJJ Midland Website

## Contexto
Website para gimnasio de BJJ y MMA en Midland, Texas.
Nombre oficial: **MIDLAND BJJ & MMA**
Establecido: 2000

## Estética Visual

### Identidad de Marca
- **Mascota**: Jaguar rugiendo (símbolo de agresividad elegante)
- **Slogan**: "STAY RELENTLESS"
- **Vibe**: Intenso, profesional, moderno, premium

### Paleta de Colores (extraída de referencias)

```css
/* COLORES PRIMARIOS */
--gold: #D4A74B;           /* Dorado/Ámbar del jaguar */
--orange: #FF6B00;         /* Naranja intenso */
--magenta: #E91E8C;        /* Rosa/Magenta */

/* FONDOS */
--bg-primary: #0A0A0A;     /* Negro profundo */
--bg-elevated: #141414;    /* Negro para cards */
--bg-hover: #1A1A1A;       /* Hover states */

/* ACENTOS NEÓN */
--cyan: #00D4FF;           /* Cyan eléctrico */
--neon-green: #39FF14;     /* Verde neón */
--yellow: #FFD700;         /* Amarillo dorado */

/* TEXTO */
--text-primary: #FFFFFF;   /* Blanco puro */
--text-secondary: #A0A0A0; /* Gris medio */
--text-muted: #666666;     /* Gris oscuro */
```

### Tipografía
- **Headings**: Oswald o Bebas Neue (bold, condensada, impactante)
- **Body**: Inter (limpia, legible)

### Estilo de Imágenes
- Todas con estética OSCURA
- Alto contraste
- Iluminación dramática
- Overlays oscuros (70-80%)

## Stack Tecnológico
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (iconos)
- Headless UI


## Información del Negocio
- **Nombre**: MIDLAND BJJ & MMA
- **Ubicación**: Loop 250 / Billingsley, Midland, Texas
- **Teléfono**: (432) 555-0123
- **Email**: info@bjjmidland.com
- **Horario**: Lun-Vie 6am-9pm, Sáb 8am-2pm
- **Redes**: @bjjmidland

## Programas Ofrecidos
- BJJ Gi (All Levels)
- BJJ No-Gi (All Levels)
- MMA / Striking
- Kids Programs (Lil' Ninjas, Samurai)
- Veteran & LEO Programs
- Private Training

## Notas Importantes
- Las imágenes ref_*.png son REFERENCIAS de estilo, NO para usar directamente
- Generar/buscar imágenes que coincidan con la estética oscura
- El cráneo del sitio anterior se reemplaza por el jaguar
- Mantener consistencia visual en todas las páginas

---

## Reglas de Layout y Espaciado (OBLIGATORIAS)

### Estructura General
- Toda sección: mínimo `py-20` (80px) vertical. Nunca menos.
- Contenedor interno: `max-w-[1200px] mx-auto px-6 md:px-[60px]`
- Nunca apiles elementos sin separación. Siempre usa `gap`, `padding` o `margin` explícitos.
- Separación mínima entre secciones distintas: `py-20` o equivalente.
- El `<main>` de toda página debe tener `pt-[88px] bg-background` para limpiar el navbar fijo.
- Usar fondos con valores hex directos (`#080808`, `#0d0d0d`, `#0a0a0a`) para distinguir secciones visualmente — Tailwind `bg-background` y `bg-background-elevated` son casi idénticos y no generan contraste.
- Separar secciones con una línea `h-[2px]` dorada: `bg-gradient-to-r from-transparent via-gold/50 to-transparent`.

### Layout (Grid y Flexbox)
- Dos columnas (imagen+texto, info+formulario): `grid grid-cols-1 lg:grid-cols-2 gap-[60px]`
- Cards o features en fila: `grid grid-cols-1 md:grid-cols-3 gap-6`
- Columnas con proporciones distintas (ej: contacto): `grid-cols-1 lg:grid-cols-[2fr_3fr]`
- Listas de contacto / icono+texto: `flex items-start gap-4 mb-5`
- Nunca usar `float` para columnas.

### Espaciado Interno (Cards y Componentes)
- Cards y bloques destacados: mínimo `p-7` (28px) o `px-7 py-6`.
- `border-radius` en cards foto: `rounded-xl` (12px). Cards UI: `rounded-sm` o sin redondeo (estética predator).
- Inputs: `h-12 px-4` (48px de altura).
- Textarea: `min-h-[140px] px-4 py-3.5`.
- Espacio label→input: `mb-2`.
- Espacio entre campos de formulario: `mb-5`.

### Sección ABOUT
- Layout obligatorio: 2 columnas — imagen izquierda, contenido derecha.
- Highlights/features: grid 2×2 con `gap-3`, nunca lista vertical simple.
- Cada highlight: padding interno + marcador visual (punto, línea o ícono).
- Banda de stats debajo del hero: 4 columnas con `divide-x divide-gold/15`.
- Títulos de sección centrados con eyebrow label + líneas decorativas.

### Sección CONTACT
- Layout obligatorio: 2 columnas — info contacto izquierda `2fr`, formulario derecha `3fr`.
- Cada dato (dirección, tel, email, horario): bloque individual con ícono + texto, `mb-5` entre ellos.
- Campos del formulario: nunca lado a lado salvo email+teléfono (cortos).
- Botón submit: `w-full h-[52px]` o `w-full py-4`, destacado como CTA principal.
- Mapa: debajo de la info en la columna izquierda, `rounded-xl overflow-hidden h-64`.

### Tipografía y Jerarquía Visual
- H2 de sección: `text-4xl md:text-5xl`, display font, `mb-4`.
- Eyebrow/label sobre H2: `text-xs tracking-[0.3em] uppercase text-gold`, con líneas decorativas a los lados.
- Cuerpo bajo el título: `text-base md:text-lg leading-relaxed max-w-2xl`.
- Nunca `text-xs` para texto de contenido visible. Mínimo `text-sm`.

### Responsividad
- Toda sección debe colapsar a 1 columna en móvil con `grid-cols-1`.
- En móvil, padding de sección: `py-16 px-6`.
- Gaps en móvil: `gap-8` (32px).

---

## Checkpoints de Git

### checkpoint-v1 — Hero Mobile Redesign
**Fecha:** 2026-03-15
**Deploy:** https://bjj-midland.vercel.app
**Estado:** Build limpio, 0 errores TypeScript, 11 páginas estáticas

**Qué incluye:**
- Hero mobile con video full-bleed (`height: 100svh`)
- Video con `scale(1.65)`, `objectPosition: center 70%`
- Gradiente inferior al 75% de altura (mat/pies completamente oscuros)
- Texto y botones posicionados absolutamente al fondo
- Hero ocupa exactamente 100% del viewport en carga inicial

**Para volver a este punto:**
```bash
# Solo ver el código (sin modificar):
git checkout checkpoint-v1

# Restaurar TODO al estado de este checkpoint (descarta cambios posteriores):
git reset --hard checkpoint-v1
git push origin main --force
```

> ⚠️ El `--force` sobreescribe todo lo que hayas cambiado después. Úsalo solo si estás seguro.
