import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

interface ToastMessageProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>OK</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ToastMessage;
