# State Management — Zustand Store

## Archivo

`src/state/game-store.ts` — `useGameStore`

## Estado

| Campo | Tipo | Default | Descripción |
|---|---|---|---|
| `players` | `Player[]` | `[]` | Todos los jugadores |
| `round` | `number` | `1` | Ronda actual |
| `history` | `RoundHistory[]` | `[]` | Histórico de puntuaciones por ronda |
| `currentRoundScores` | `Record<string, number>` | `{}` | Scores parciales de la ronda en curso |
| `rebuyLimit` | `number \| null` | `null` | Límite de reenganches (`null` = infinitos) |
| `scoreLimit` | `number` | `100` | Puntuación máxima antes de eliminación |
| `gameWinnerId` | `string \| null` | `null` | ID del ganador |
| `gameEnded` | `boolean` | `false` | Partida terminada |

## Tipos

```typescript
// src/types/index.ts
type Player = {
  id: string;
  name: string;
  score: number;       // total acumulado
  rebuys: number;      // reenganches usados
  isEliminated: boolean;
};

type GameState = {
  players: Player[];
  rebuyLimit: number | null;
  scoreLimit: number;
};
```

## Persistencia

Manual, sin middleware de Zustand. Se usa `AsyncStorage` con clave `"chinchon-game"`.

Se persiste en cada:
- `nextRound()`
- `chinchonWin()`
- `startNewGame()`

## Funciones de serialización

```typescript
// Guardar estado (excluye funciones)
const saveGame = (state: StoreState) => {
  const { saveGame: _, loadGame: __, ...rest } = state;
  AsyncStorage.setItem("chinchon-game", JSON.stringify(rest));
};

// Cargar estado
const loadGame = async () => {
  const saved = await AsyncStorage.getItem("chinchon-game");
  if (saved) return JSON.parse(saved);
  return null;
};
```

## Acciones principales

### `addPlayer(name: string)`
Crea un `Player` con `id = Date.now().toString()` y lo añade al array.

### `removePlayer(id: string)`
Filtra el jugador del array y elimina su entrada en `currentRoundScores`.

### `updateRoundScore(playerId: string, amount: number)`
Acumula en `currentRoundScores[playerId]`. `amount` puede ser positivo o negativo.

### `nextRound()`
Ver `docs/scoring.md` para algoritmo completo.

### `chinchonWin(winnerId: string)`
Victoria instantánea: `gameWinnerId = winnerId`, `gameEnded = true`. Sin scoring.

### `loadGame()`
Restaura estado completo desde AsyncStorage.

### `startNewGame()`
Resetea TODO el estado a valores iniciales y limpia AsyncStorage.
