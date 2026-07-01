# Build & Release

## CI/CD

Semantic Release vía GitHub Actions (config en `.releaserc.json`).

Triggers:
- Push a `main` con commits convencionales (`fix:`, `feat:`, `BREAKING CHANGE`)

### Pipeline

1. `semantic-release` determina versión según commits
2. Genera `CHANGELOG.md`
3. Taggea y crea release en GitHub
4. (**Opcional**) Build APK y web, sube como artefacto

## Desarrollo

```bash
npm start           # Expo dev server
npm run android     # Iniciar en Android
npm run ios         # Iniciar en iOS
npm run web         # Iniciar en web
```

## Iconos

```bash
npm run gen:icons   # Regenerar PNGs desde SVGs
```

Ejecutar antes de build si se modificaron los SVGs.

## APK local

```bash
npx expo build:android
# o con EAS:
npx eas build --platform android --profile preview
```

## Versionado

`app.json` → `version` se actualiza manualmente o vía semantic-release.

Versión actual: `1.0.4`
