import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

export default function NfcScreen() {
  useEffect(() => {
    return () => {
      NfcManager.setEventListener(NfcTech.Ndef, null);
      NfcManager.stop();
    };
  }, []);

  const readNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      Alert.alert('NFC Tag Detected', JSON.stringify(tag));
      NfcManager.setAlertMessageIOS("NFC Tag Detected");
      await NfcManager.cancelTechnologyRequest();
    } catch (ex) {
      console.warn(ex);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>NFC Reader Screen</Text>
      <Button title="Read NFC" onPress={readNfc} />
    </View>
  );
}
