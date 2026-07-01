# Chinchón Calc — Agent Context

App: Calculadora de puntuaciones para el juego de cartas Chinchón.
Expo SDK 53 · React Native 0.79 · TypeScript · Zustand · React Navigation 7

## Estructura

```
src/
├── types/index.ts          # Player, GameState
├── state/game-store.ts     # Zustand store (único, sin slices)
├── navigation/index.tsx    # NativeStackNavigator (6 rutas)
├── screens/
│   ├── HomeScreen.tsx      # Landing: Nueva/Continuar partida
│   ├── PlayerSetupScreen.tsx   # Añadir/quitar jugadores
│   ├── ConfigScreen.tsx        # Límite reenganches y puntos
│   ├── GameScreen.tsx          # Ronda activa, entrada de scores
│   ├── ClassificationScreen.tsx # Clasificación/ranking
│   └── ScoreHistoryScreen.tsx  # Tabla histórica por rondas
└── components/
    ├── AppModal.tsx         # Modal alerta/confirmación reutilizable
    └── ScoreModal.tsx       # Modal entrada de puntuación por jugador
```

## Flujo de navegación

```
Home ──"Nueva Partida"──> PlayerSetup ──> Config ──> Game
  │                                                    │
  └──"Continuar Partida"──> Game                       │
                                                       │
Game ──"Siguiente Ronda"──> Classification ──> Game    │
Game ──Chinchón ──────────> Classification             │
Game ──[header] ──────────> ScoreHistory               │
Game ──[header] ──────────> Classification             │
```

## Store (Zustand)

`useGameStore` — estado plano, sin persist middleware. Persistencia manual vía AsyncStorage (key `"chinchon-game"`).

Campos clave: `players[]`, `round`, `history[]`, `currentRoundScores{}`, `rebuyLimit`, `scoreLimit`, `gameWinnerId`, `gameEnded`.

Acciones: `addPlayer`, `removePlayer`, `updateRoundScore`, `nextRound`, `chinchonWin`, `loadGame`, `startNewGame`.

Ver `docs/state-management.md` para detalle completo.

## Scoring (`nextRound()`)

1. Snapshot `currentRoundScores` → `history[]`
2. Suma scores parciales al total de cada jugador
3. Detecta eliminaciones y reenganches:
   - Si `score > scoreLimit`: consume un reenganche (score = highestUnderLimit) o elimina si no quedan
   - Si quedan < 2 jugadores bajo el límite: fin de partida
4. `chinchonWin()` = victoria instantánea, sin scoring

Ver `docs/scoring.md` para algoritmo completo.

## Convenciones

- UI en español
- Scores positivos = rojo (penalización), negativos = verde (bonificación)
- Sin sistema de temas, `StyleSheet.create()` inline
- Sin custom hooks, sin API externa
- Sin tests configurados
- Tipado relajado: `any` en navegación, modales
- `react-native-svg` para SVGs inline, `@expo/vector-icons` para iconos
- Gap no disponible en RN 0.79 — usar `margin` en Flexbox

## Iconos

Origen SVG: `assets/brand/icon.svg` (fondo) y `icon-no-bg.svg` (transparente).
Generación vía `scripts/generate-icons.mjs` con sharp → `npm run gen:icons`.

## Comandos

```bash
npm start           # Expo dev server
npm run android     # Iniciar en Android
npm run ios         # Iniciar en iOS
npm run web         # Iniciar en web
npm run gen:icons   # Regenerar todos los iconos
```

## Referencia rápida a docs/

| Tema               | Archivo                      |
|--------------------|------------------------------|
| Store + acciones   | `docs/state-management.md`   |
| Algoritmo scoring  | `docs/scoring.md`            |
| Navegación         | `docs/navigation.md`         |
| Iconos             | `docs/icons.md`              |
| Build & release    | `docs/deployment.md`         |
