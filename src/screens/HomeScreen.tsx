import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useGameStore from "../state/game-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { version } from "../../package.json";
import AppModal from "../components/AppModal";
import { SvgXml } from "react-native-svg";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Card only (no background) -->
  <g filter="url(#shadow)">
    <rect x="224" y="152" width="576" height="720" rx="40" ry="40" fill="#ffffff"/>
    <g stroke="#111827" stroke-width="28" stroke-linecap="round">
      <line x1="310" y1="260" x2="310" y2="770"/>
      <line x1="390" y1="260" x2="390" y2="770"/>
      <line x1="470" y1="260" x2="470" y2="770"/>
      <line x1="550" y1="260" x2="550" y2="770"/>
      <line x1="620" y1="300" x2="280" y2="730"/>
    </g>
    <circle cx="700" cy="260" r="44" fill="#f59e0b" stroke="#b45309" stroke-width="8"/>
  </g>
</svg>`;

const HomeScreen = ({ navigation }: any) => {
  const { loadGame, startNewGame } = useGameStore();
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtons, setModalButtons] = useState<any[]>([]);

  useEffect(() => {
    const checkSavedGame = async () => {
      const savedGame = await AsyncStorage.getItem("chinchon-game");
      setHasSavedGame(!!savedGame);
    };
    checkSavedGame();
  }, []);

  const handleContinue = async () => {
    const gameExists = await loadGame();
    if (gameExists) {
      navigation.navigate("Game");
    } else {
      setModalTitle("No hay partida guardada");
      setModalMessage("No se encontró ninguna partida para continuar.");
      setModalButtons([{ text: "OK", onPress: () => setModalVisible(false) }]);
      setModalVisible(true);
    }
  };

  const handleNewGame = () => {
    if (hasSavedGame) {
      setModalTitle("Iniciar Nueva Partida");
      setModalMessage(
        "Existe una partida guardada. Si inicias una nueva, la actual se perderá. ¿Estás seguro?"
      );
      setModalButtons([
        {
          text: "Cancelar",
          onPress: () => setModalVisible(false),
          style: "cancel",
        },
        {
          text: "Sí, iniciar nueva",
          onPress: () => {
            setModalVisible(false);
            startNewGame();
            navigation.navigate("PlayerSetup");
          },
          style: "destructive",
        },
      ]);
      setModalVisible(true);
    } else {
      startNewGame();
      navigation.navigate("PlayerSetup");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SvgXml xml={logoSvg} width={100} height={100} />
        <Text style={styles.title}>Chinchón</Text>
        <Text style={styles.version}>v{version}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>Nueva Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !hasSavedGame && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!hasSavedGame}
        >
          <Text style={styles.buttonText}>Continuar Partida</Text>
        </TouchableOpacity>
      </View>

      <AppModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        buttons={modalButtons}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  version: {
    fontSize: 14,
    color: "#888",
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default HomeScreen;
