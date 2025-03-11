import { useEffect } from 'react';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export interface NfcTagData {
  entity_id?: string;
  entity_type?: string;
  code?: string;
  original_code?: string;
  parameters?: any;
  created_at?: string;
  updated_at?: string;
}

const useNfcReader = () => {
  const decodeNdefMessage = (ndefMessage: any): NfcTagData | null => {
    if (!ndefMessage || ndefMessage.length === 0) {
      return null;
    }

    const payloads = ndefMessage
      .map((record: any) => {
        if (record.tnf === Ndef.TNF_WELL_KNOWN && Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
          return Ndef.text.decodePayload(record.payload);
        }
        return null;
      })
      .filter(Boolean);

    try {
      return payloads.length > 0 ? (JSON.parse(payloads[0]) as NfcTagData) : null;
    } catch (error) {
      console.error('Erro ao decodificar mensagem NDEF:', error);
      return null;
    }
  };

  const readNfc = async (): Promise<NfcTagData | null> => {
    try {
      if (await NfcManager.isSupported()) {
        await NfcManager.requestTechnology(NfcTech.Ndef);

        const tag = await NfcManager.getTag();
        if (!tag) {
          throw new Error('Nenhuma tag NFC encontrada.');
        }

        const decodedMessage = decodeNdefMessage(tag.ndefMessage);
        console.log('NFC Tag Detectada:', decodedMessage);
        return decodedMessage;
      } else {
        console.error('NFC não é suportado neste dispositivo.');
        return null;
      }
    } catch (ex: any) {
      //console.error('Falha ao ler a tag NFC:', ex.message);
      return null;
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  };

  const startNfc = async () => {
    try {
      if (await NfcManager.isSupported()) {
        await NfcManager.start();
      } else {
        console.error('NFC não é suportado neste dispositivo.');
      }
    } catch (error) {
      console.error('Erro ao iniciar NFC:', error);
    }
  };

  useEffect(() => {
    startNfc();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  return { readNfc };
};

export default useNfcReader;
