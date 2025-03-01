import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export const startNfc = async () => {
  await NfcManager.start();
};

export const readNfcTag = async () => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    return tag;
  } catch (ex: any) {
    throw new Error('Failed to read NFC: ' + ex.message);
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
};
