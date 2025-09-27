import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ScoreModalProps {
  visible: boolean;
  player: any;
  roundScore: number;
  onClose: () => void;
  onScoreChange: (amount: number) => void;
  onChinchon: () => void;
}

const ScoreModal: React.FC<ScoreModalProps> = ({
  visible,
  player,
  roundScore,
  onClose,
  onScoreChange,
  onChinchon,
}) => {
  const handlePress = (amount: number) => {
    onScoreChange(amount);
  };

  const handleChinchon = () => {
    onChinchon();
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.playerName}>{player?.name}</Text>
          <Text style={styles.currentScore}>{roundScore}</Text>
          <View style={styles.buttonGrid}>
            <View style={styles.rowGrid}>
              <TouchableOpacity
                style={[styles.scoreButton, styles.positiveButton]}
                onPress={() => handlePress(1)}
              >
                <Text style={styles.buttonText}>+1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreButton, styles.positiveButton]}
                onPress={() => handlePress(5)}
              >
                <Text style={styles.buttonText}>+5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreButton, styles.positiveButton]}
                onPress={() => handlePress(10)}
              >
                <Text style={styles.buttonText}>+10</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowGrid}>
              <TouchableOpacity
                style={[styles.scoreButton, styles.negativeButton]}
                onPress={() => handlePress(-1)}
              >
                <Text style={styles.buttonText}>-1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreButton, styles.negativeButton]}
                onPress={() => handlePress(-5)}
              >
                <Text style={styles.buttonText}>-5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scoreButton, styles.negativeButton]}
                onPress={() => handlePress(-10)}
              >
                <Text style={styles.buttonText}>-10</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.chinchonButton}
              onPress={handleChinchon}
            >
              <Text style={styles.buttonText}>¡Chinchón!</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={onClose}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxWidth: 400,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  currentScore: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonGrid: {
    width: "100%",
    marginBottom: 15,
  },
  rowGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  scoreButton: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  positiveButton: {
    backgroundColor: "#dc3545",
  },
  negativeButton: {
    backgroundColor: "#28a745",
  },
  chinchonButton: {
    backgroundColor: "#ffc107",
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 8,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ScoreModal;
