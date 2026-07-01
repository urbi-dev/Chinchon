# Navigation — React Navigation 7

## Archivo

`src/navigation/index.tsx`

## Stack Navigator

`NativeStackNavigator` con 6 rutas:

| Route | Screen | headerTitle | headerShown |
|---|---|---|---|
| Home | HomeScreen | — | hidden |
| PlayerSetup | PlayerSetupScreen | "Jugadores" | shown |
| Config | ConfigScreen | "Configuración" | shown |
| Game | GameScreen | "Ronda {round}" | shown + botones |
| ScoreHistory | ScoreHistoryScreen | "Historial" | shown |
| Classification | ClassificationScreen | "Clasificación" | shown |

## Flujo

```
Home ──> PlayerSetup ──> Config ──> Game
  │                                     │
  └────────────> Game (continuar)       │
                                         │
            ┌─────────────────────────────┘
            ▼
   Classification ◄── Game (header trophy)
         │
         └── "Continuar" ──> Game

   ScoreHistory ◄── Game (header list icon)
```

## Game Screen Header

El header de Game se actualiza dinámicamente vía `navigation.setOptions()`:

```typescript
useEffect(() => {
  navigation.setOptions({
    headerTitle: `Ronda ${round}`,
    headerRight: () => (
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.navigate("ScoreHistory")}>
          <Ionicons name="list-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Classification")}>
          <Ionicons name="trophy-outline" size={24} />
        </TouchableOpacity>
      </View>
    ),
  });
}, [round]);
```

## Config global

```typescript
<NavigationContainer>
  <Stack.Navigator
    screenOptions={{
      contentStyle: { backgroundColor: "#fff" },
    }}
  >
    ...
  </Stack.Navigator>
</NavigationContainer>
```

Sin tipos específicos de navegación — `navigation` se tipa como `any`.
