import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Switch, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OptionCard from '../../components/option-card/OptionCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CattleResource } from '../../resources/CattleResource';
import { CattleDTO } from '../../dtos/CattleDTO';
import homeScreenStyles from './homeScreen.style';
import CattleDetailsModal from '../../components/cattle-detail-modal/CattleDetail.modal';
import useNfcReader from '../../hooks/nfc/useNfcReader';

type RootStackParamList = {
  Home: undefined;
  NFC: undefined;
  CattleList: undefined;
  AnimalSearch: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [autoSearchEnabled, setAutoSearchEnabled] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState<CattleDTO | null>(null);
  const { readNfc } = useNfcReader();

  useEffect(() => {
    let isMounted = true;

    const handleNfcDetection = async () => {
      while (autoSearchEnabled && isMounted) {
        try {
          const tagData = await readNfc();
          if (tagData && tagData.entity_id && tagData.entity_type === 'cattle') {
            const cattleResource = new CattleResource();
            const cattle = await cattleResource.getById(Number(tagData.entity_id));
            if (cattle && isMounted) {
              setSelectedCattle(cattle);
            }
          }
        } catch (error) {
          console.error('Erro ao ler tag NFC:', error);
        }

        // Adiciona um intervalo entre as leituras para evitar sobrecarga
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    if (autoSearchEnabled) {
      handleNfcDetection();
    }

    return () => {
      isMounted = false;
    };
  }, [autoSearchEnabled, readNfc]);

  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <View style={homeScreenStyles.toggleContainer}>
        <Switch
          value={autoSearchEnabled}
          onValueChange={setAutoSearchEnabled}
        />
        <Text style={{ marginLeft: 10 }}>Busca Automática</Text>
        <TouchableOpacity onPress={() => Alert.alert('Ajuda', 'Ao ativar essa opção, o aplicativo buscará animais automaticamente ao aproximar do dispositivo.')}>
          <Icon name="info-outline" size={24} color="#000" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <View>
        <OptionCard icon="pets" title="Listagem de Animais" onPress={() => navigation.navigate('CattleList')} />
        <OptionCard icon="search" title="Buscar Animais" onPress={() => navigation.navigate('AnimalSearch')} />
        <OptionCard icon="nfc" title="Funções NFC" onPress={() => navigation.navigate('NFC')} />
      </View>

      <Modal
        visible={!!selectedCattle}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedCattle(null)}
      >
        <CattleDetailsModal
          cattle={selectedCattle}
          onClose={() => setSelectedCattle(null)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
