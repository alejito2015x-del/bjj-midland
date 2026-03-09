# Skill: Diseño Frontend BJJ Midland

## REGLA #1: Estética Oscura e Intensa
Todo el diseño debe reflejar la personalidad del jaguar: elegante pero letal.
Fondo negro, acentos vibrantes, tipografía bold.

## Paleta de Colores

### Primarios
```
gold: #D4A74B        - Color principal (del jaguar)
orange: #FF6B00      - Acento cálido
magenta: #E91E8C     - Acento vibrante
```

### Fondos
```
bg-dark: #0A0A0A     - Fondo principal
bg-card: #141414     - Cards y elementos elevados
bg-hover: #1A1A1A    - Estados hover
```

### Acentos Neón (para horarios y highlights)
```
cyan: #00D4FF
neon-green: #39FF14
yellow: #FFD700
```

### Degradados
```
CTA Button: linear-gradient(135deg, #FF6B00 0%, #E91E8C 100%)
Logo ring: linear-gradient(180deg, #FF6B00 0%, #E91E8C 100%)
Gold glow: 0 0 20px rgba(212, 167, 75, 0.5)
```

## Tipografía

### Headings
- Font: 'Oswald', sans-serif (o Bebas Neue)
- Weight: 700 (bold)
- Transform: uppercase
- Letter-spacing: 0.05em
- Sizes:
  - h1: 2.5rem mobile → 4rem desktop
  - h2: 2rem mobile → 3rem desktop
  - h3: 1.5rem mobile → 2rem desktop

### Body
- Font: 'Inter', sans-serif
- Weight: 400 regular, 500 medium
- Size: 1rem (16px)
- Line-height: 1.6

## Componentes UI

### Botones

#### Primary CTA
```css
background: linear-gradient(135deg, #FF6B00, #E91E8C);
color: white;
padding: 1rem 2rem;
border-radius: 0.5rem;
font-weight: 700;
text-transform: uppercase;
transition: transform 0.2s, box-shadow 0.2s;
```
Hover: scale(1.02) + glow

#### Secondary Button
```css
background: transparent;
border: 2px solid #D4A74B;
color: #D4A74B;
```
Hover: background #D4A74B, color #0A0A0A

### Cards
```css
background: #141414;
border: 1px solid rgba(212, 167, 75, 0.1);
border-radius: 1rem;
padding: 2rem;
```
Hover: border-color rgba(212, 167, 75, 0.3) + subtle glow

### Hero Section
- Imagen de fondo con overlay oscuro (bg-black/70)
- Título grande, uppercase, bold
- Subtítulo en gold o white
- CTA prominente con gradiente
- Puede tener partículas/efectos sutiles

### Navbar
- Fondo: bg-dark/80 con backdrop-blur
- Logo a la izquierda
- Links centrados o derecha
- CTA "Prueba Gratis" destacado
- Sticky on scroll
- Mobile: hamburger menu

### Footer
- Fondo: #0A0A0A o #080808
- Grid de 4 columnas (1 en mobile)
- Links en gris, hover en gold
- Redes sociales con iconos
- Copyright al fondo

### WhatsApp Button
- Posición: fixed bottom-right
- Fondo: #25D366 (WhatsApp green)
- Icono blanco
- Pulse animation sutil
- z-index alto

### Horario/Schedule
- Estilo inspirado en ref_8 (neón)
- Pills de colores por tipo de clase:
  - BJJ Gi: cyan
  - BJJ No-Gi: magenta
  - MMA: orange
  - Kids: green
- Fondo de cada celda: bg-card

### Pricing Cards
- Card central (popular) destacada con:
  - Borde gold
  - Glow sutil
  - Badge "Más Popular"
- Lista de features con checkmarks gold

## Imágenes

### Tratamiento
- Todas deben tener estética oscura
- Usar overlays cuando sea necesario
- Preferir imágenes con alto contraste
- Evitar imágenes brillantes/coloridas que rompan la estética

### Búsqueda en bancos de imágenes
Keywords recomendados:
- "bjj dark background"
- "mma dramatic lighting"
- "martial arts gym dark"
- "jiu jitsu training"
- "mma fighter portrait dark"

### Placeholders
Si no hay imagen disponible, usar:
- Fondo #141414 con icono/ilustración
- O gradient sutil con texto

## Animaciones (Framer Motion)

### Fade In Up (default para secciones)
```js
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Stagger Children
```js
staggerChildren: 0.1
```

### Hover Scale
```js
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 300 }}
```

### Page Transitions
```js
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

## Responsive Design

### Breakpoints
- mobile: < 640px
- tablet: 640px - 1024px
- desktop: > 1024px

### Mobile First
- Stack layouts en mobile
- Hamburger nav
- Touch targets mínimo 44x44px
- WhatsApp button siempre visible
- CTAs sticky en bottom cuando apropiado

## SEO Local

### Keywords Target
- "bjj midland"
- "brazilian jiu jitsu midland texas"
- "mma midland tx"
- "martial arts midland"
- "jiu jitsu classes midland"

### Schema
Implementar LocalBusiness schema con:
- name, address, phone
- openingHours
- geo coordinates
- priceRange
- image
