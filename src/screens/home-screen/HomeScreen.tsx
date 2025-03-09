import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OptionCard from '../../components/option-card/OptionCard';

type RootStackParamList = {
  Home: undefined;
  NFC: undefined;
  CattleList: undefined;
  AnimalSearch: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View>
        <OptionCard icon="pets" title="Listagem de Animais" onPress={() => navigation.navigate('CattleList')} />
        <OptionCard icon="search" title="Buscar Animais" onPress={() => navigation.navigate('AnimalSearch')} />
        <OptionCard icon="nfc" title="Funções NFC" onPress={() => navigation.navigate('NFC')} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
