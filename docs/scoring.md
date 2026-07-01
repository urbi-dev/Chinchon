# Scoring Algorithm

## `nextRound()` en `src/state/game-store.ts`

### 1. Snapshot de la ronda

```typescript
history.push({
  round,
  scores: { ...currentRoundScores }
});
```

Copia los scores parciales a `history[]` para mantener el histórico.

### 2. Acumular scores totales

```typescript
players.forEach(p => {
  p.score += currentRoundScores[p.id] ?? 0;
});
```

Se suma el score de la ronda al total acumulado de cada jugador.

### 3. Determinar jugadores activos y sobre límite

```typescript
const playersInGame = players.filter(p => !p.isEliminated);
const playersOverLimit = playersInGame.filter(p => p.score > scoreLimit);
```

**Condición de fin de partida:**

```typescript
if (playersInGame.length - playersOverLimit.length < 2) {
  gameEnded = true;
  gameWinnerId = playersInGame.sort((a, b) => a.score - b.score)[0].id;
}
```

Si quedan menos de 2 jugadores bajo el límite, la partida termina. Gana el que tenga menor puntuación entre los que siguen vivos.

### 4. Calcular `highestScoreUnderLimit`

```typescript
const highestScoreUnderLimit = Math.max(
  ...playersInGame
    .filter(p => p.score <= scoreLimit)
    .map(p => p.score)
);
```

Puntuación más alta entre los jugadores que están bajo el límite. Se usa como "techo" para los reenganches.

### 5. Aplicar reenganches/eliminaciones

Para cada jugador sobre el límite:
- Si `rebuyLimit !== null && player.rebuys >= rebuyLimit` → **eliminado** (`isEliminated = true`)
- Si no → **reenganche**: `player.score = highestScoreUnderLimit`, `player.rebuys++`

### 6. Resetear para siguiente ronda

```typescript
currentRoundScores = {};
round++;
saveGame(state);
```

## `chinchonWin()`

Victoria instantánea sin proceso de scoring. Útil cuando un jugador canta Chinchón.

```typescript
chinchonWin: (winnerId: string) => {
  set({ gameWinnerId: winnerId, gameEnded: true });
  saveGame(get());
}
```

## Casos borde

- **Empate a score**: `sort((a, b) => a.score - b.score)` resuelve por orden de array
- **scoreLimit rebasado exacto**: condición `>`, no `>=`
- **Sin reenganches** (`rebuyLimit = null`, infinitos): siempre aplica reenganche, nunca elimina por límite
- **highestScoreUnderLimit con -Infinity**: si nadie está bajo el límite, `Math.max([])` devuelve `-Infinity`. Los reenganches pondrían score en `-Infinity`. Ocurre en el caso borde donde todos están sobre el límite (previo a game-over detectado)
