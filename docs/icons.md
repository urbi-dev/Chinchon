# Icon Generation Pipeline

## Archivos fuente SVG

- `assets/brand/icon.svg` — Icono completo con fondo degradado azul→verde y carta con tally marks. Se usa para `icon.png` y web icons.
- `assets/brand/icon-no-bg.svg` — Solo la carta (sin fondo). Se usa para `adaptive-icon.png` (foreground transparente) y splash.

## Script

`scripts/generate-icons.mjs` — usa `sharp` para rasterizar los SVGs.

## Outputs

| Archivo | Origen | Formato | Uso |
|---|---|---|---|
| `assets/icon.png` 1024×1024 | `icon.svg` | TrueColor, sin alpha | App icon iOS/Android legacy |
| `assets/adaptive-icon.png` 1024×1024 | `icon-no-bg.svg` | TrueColorAlpha | Foreground adaptive icon Android |
| `assets/splash-icon.png` 1024×1024 | `icon-no-bg.svg` + fondo blanco | TrueColor | Splash screen |
| `assets/web-icons/icon-{16..512}.png` | `icon.svg` | TrueColorAlpha | Web manifest |
| `assets/web-icons/apple-touch-icon-{152,167,180}.png` | `icon.svg` | TrueColorAlpha | Apple touch icons |
| `assets/android/store-icon-512.png` | `icon-no-bg.svg` + fondo blanco | TrueColor | Google Play listing |
| `assets/android/feature-graphic-1024×500.png` | `icon-no-bg.svg` sobre fondo verde | TrueColor | Google Play feature graphic |

## Comando

```bash
npm run gen:icons
```

## Consideraciones

- Los PNGs deben ser `TrueColor` o `TrueColorAlpha` (NO `Palette`/indexado). Expo no procesa bien PNGs indexados para iconos nativos.
- `adaptive-icon.png` DEBE tener fondo transparente. Android lo compone con `backgroundColor: "#22c55e"` definido en `app.json`.
- `icon.png` NO debe tener alpha (opaco) para compatibilidad iOS/Android legacy.
- sharp renderiza los SVGs con `density: 144` para buena resolución antes del resize.
