import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen/LoginScreen';
import HomeScreen from '../screens/home-screen/HomeScreen';
import CattleListScreen from '../screens/cattle-list-screen/CattleListScreen';
import NfcScreen from '../screens/nfc-screen/NfcScreen';
import CustomHeader from '../components/custom-header/CustomHeader';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CattleList: undefined;
  NFC: undefined;
  AnimalSearch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = ({ navigation }: { navigation: any }) => ({
  headerRight: () => <CustomHeader navigation={navigation} />,
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={screenOptions} />
        <Stack.Screen name="CattleList" component={CattleListScreen} options={screenOptions} />
        <Stack.Screen name="NFC" component={NfcScreen} options={screenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
