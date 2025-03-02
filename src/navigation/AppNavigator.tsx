import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NfcScreen from '../screens/nfc-screen/NfcScreen';
import HomeScreen from '../screens/home-screen/HomeScreen';
import CattleListScreen from '../screens/cattle-list-screen/CattleListScreen';

type RootStackParamList = {
  Home: undefined;
  NFC: undefined;
  CattleList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="NFC"
          component={NfcScreen}
          options={{ title: 'NFC Reader' }}
        />
        <Stack.Screen
          name="CattleList"
          component={CattleListScreen}
          options={{ title: 'Listagem de Animais' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
