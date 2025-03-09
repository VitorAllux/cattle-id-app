import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import loginScreenStyles from './LoginScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/style';
import { AuthResource } from '../../resources/AuthResource';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loadUser } = useContext(AuthContext) || {};

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');

      return;
    }

    setLoading(true);

    try {
      const response = await AuthResource.login(email, password);

      await AsyncStorage.setItem('token', response.access_token);
      if (loadUser) {
        await loadUser();
      }

      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={loginScreenStyles.container}>
      <View style={loginScreenStyles.form}>
        <Icon name="pets" size={50} color={COLORS.primary} style={loginScreenStyles.icon} />
        <Text style={loginScreenStyles.title}>Bem-vindo de volta!</Text>
        <TextInput
          style={loginScreenStyles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={loginScreenStyles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={loginScreenStyles.button} onPress={handleLogin} disabled={loading}>
          <Text style={loginScreenStyles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
