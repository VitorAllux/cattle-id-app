import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CattleDTO } from '../../dtos/CattleDTO';
import { tagStatusColors, tagStatusTexts } from '../../enums/CattleTagStatusEnum';
import { COLORS } from '../../styles/style';

interface CattleDetailsModalProps {
  cattle: CattleDTO | null;
  onClose: () => void;
}

const CattleDetailsModal: React.FC<CattleDetailsModalProps> = ({ cattle, onClose }) => {
  if (!cattle) {
    return null;
  }

  const tagStatus = cattle.tag_status as keyof typeof tagStatusTexts;
  const parameters = cattle.nfc_tag[0]?.parameters || {};

  // Verifica se cattle.vaccines é uma string JSON válida
  let vaccines: string[] = [];
  try {
    vaccines = cattle.vaccines ? JSON.parse(cattle.vaccines) : [];
  } catch (error) {
    console.error('Erro ao fazer parsing de vaccines:', error);
    vaccines = [];
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Icon name="pets" size={40} color={COLORS.primary} />
          <Text style={styles.title}>{cattle.name}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="cake" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Idade: {cattle.age} anos</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="tag" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Código: {cattle.nfc_tag[0]?.code || 'N/A'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="scale" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Peso: {parameters.weight || 'N/A'} kg</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="medical-services" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>
              Vacinas: {vaccines.length > 0 ? vaccines.join(', ') : 'Nenhuma'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="info" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Status: {cattle.status}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="check-circle" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Ativo: {cattle.active ? 'Sim' : 'Não'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="nfc" size={20} color={COLORS.primary} />
            <Text style={styles.detailText}>Status da Tag: </Text>
            <View style={[styles.tagStatusBadge, { backgroundColor: tagStatusColors[tagStatus] }]}>
              <Text style={styles.tagStatusText}>{tagStatusTexts[tagStatus]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="message" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="edit" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="delete" size={24} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  tagStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  tagStatusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
  },
});

export default CattleDetailsModal;
