import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OptionCard from '../../components/option-card/OptionCard.tsx';
import styles from './homeScreen.style.ts';
import masterStyles from '../../styles/style';
import { login } from '../../services/api.ts';

type RootStackParamList = {
  Home: undefined;
  NFC: undefined;
  CattleList: undefined;
  AnimalSearch: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await login('test@example.com', 'password');
        console.log('Logged in:', user);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={masterStyles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Home</Text>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.avatar}>
          <Icon name="account-circle" size={40} color="#ffa600" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} disabled>
            <Text style={styles.dropdownText}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} disabled>
            <Text style={styles.dropdownText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={masterStyles.container}>
        <OptionCard icon="pets" title="Listagem de Animais" onPress={() => navigation.navigate('CattleList')} />
        <OptionCard icon="search" title="Buscar Animais" onPress={() => navigation.navigate('AnimalSearch')} />
        <OptionCard icon="nfc" title="Funções NFC" onPress={() => navigation.navigate('NFC')} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
