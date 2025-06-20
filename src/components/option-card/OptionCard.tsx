import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './optionCard.style';
import { COLORS } from '../../styles/style';

type OptionCardProps = {
  icon: string;
  title: string;
  onPress: () => void;
};

const OptionCard = ({ icon, title, onPress }: OptionCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={icon} size={40} color={COLORS.primary} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionCard;
