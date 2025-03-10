import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../styles/style';
import { CattleDTO } from '../../dtos/CattleDTO';
import { tagStatusColors, tagStatusTexts } from '../../enums/CattleTagStatusEnum';
import syncScreenStyles from './SyncScreen.styles';
import { CattleResource } from '../../resources/CattleResource';
import useNfcHandler from '../../hooks/userNfcHandler';

type RootStackParamList = {
  TagSync: { cattle: CattleDTO };
};

type SyncScreenRouteProp = RouteProp<RootStackParamList, 'TagSync'>;

const SyncScreen: React.FC = () => {
  const route = useRoute<SyncScreenRouteProp>();
  const { cattle } = route.params;
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const rotateAnim = useState(new Animated.Value(0))[0];
  const { isProcessing, readAndWriteNfc, disconnectNfc } = useNfcHandler();
  const cattleResource = new CattleResource();
  const navigation = useNavigation();

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopRotation = () => {
    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);
  };

  const handleReadAndWriteNfc = async () => {
    if (isProcessing) {
      return;
    }

    setIsConnecting(true);
    startRotation();
    setSyncMessage(null);

    try {
      // Passo 1: Ler e escrever na tag NFC
      const tagData = await readAndWriteNfc({
        entity_id: cattle.id.toString(),
        entity_type: 'cattle',
        parameters: {}, // Adicione os parâmetros necessários aqui
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });

      if (!tagData || typeof tagData !== 'object') {
        setSyncMessage('Nenhuma tag NFC encontrada.');
        return;
      }

      const { entity_id, entity_type } = tagData;

      if (!entity_id || !entity_type) {
        setSyncMessage('A tag NFC não contém informações válidas.');
        return;
      }

      // Verifica se a tag já está vinculada a outro gado
      if (entity_type === 'cattle') {
        const fetchedCattle = await cattleResource.checkCattle(Number(entity_id));

        if (!fetchedCattle) {
          // Se a tag não estiver vinculada, sincroniza com o gado atual
          await cattleResource.syncCattleTag(cattle.id, tagData);
          setSyncMessage('Sincronizado com sucesso!');
          navigation.goBack();
        } else if (fetchedCattle.id !== cattle.id) {
          // Se a tag estiver vinculada a outro gado, pergunta se deseja substituir
          Alert.alert(
            'Tag NFC já vinculada',
            `Essa tag NFC já está vinculada ao gado "${fetchedCattle.name}". Deseja substituir a vinculação?`,
            [
              {
                text: 'Cancelar',
                style: 'cancel',
                onPress: () => {
                  setSyncMessage('Sincronização cancelada.');
                },
              },
              {
                text: 'Substituir',
                onPress: async () => {
                  await cattleResource.syncCattleTag(cattle.id, tagData, fetchedCattle.id);
                  setSyncMessage('Sincronizado com sucesso!');
                  navigation.goBack();
                },
              },
            ],
          );
        } else {
          setSyncMessage('Essa tag NFC já está vinculada a este gado.');
        }
      }
    } catch (error) {
      setSyncMessage('Falha ao sincronizar a tag NFC.');
      console.error('Erro ao sincronizar:', error);
    } finally {
      setIsConnecting(false);
      stopRotation();
      await disconnectNfc();
    }
  };

  return (
    <View style={syncScreenStyles.container}>
      <Text style={syncScreenStyles.title}>{cattle.name}</Text>
      <View
        style={[
          syncScreenStyles.tagStatusBadge,
          { backgroundColor: tagStatusColors[cattle.tag_status] },
        ]}>
        <Text style={syncScreenStyles.tagStatusText}>
          {tagStatusTexts[cattle.tag_status]}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleReadAndWriteNfc}
        style={syncScreenStyles.connectButton}
        activeOpacity={0.8}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          <Icon name="sync" size={70} color={COLORS.primary} />
        </Animated.View>
      </TouchableOpacity>

      <Text style={syncScreenStyles.connectButtonText}>
        {isConnecting || isProcessing ? 'Sincronizando...' : 'Sincronizar Tag'}
      </Text>

      {syncMessage && (
        <Text style={syncScreenStyles.syncMessageText}>
          {syncMessage}
        </Text>
      )}
    </View>
  );
};

export default SyncScreen;
