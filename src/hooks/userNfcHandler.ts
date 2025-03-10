import { useState } from 'react';
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

const useNfcHandler = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [tagContent, setTagContent] = useState<NfcTagData | null>(null);

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

  const readAndWriteNfc = async (dataToWrite: any): Promise<NfcTagData | null> => {
    setIsProcessing(true);
    setTagContent(null);

    try {
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: Nenhuma tag NFC encontrada.')), 10000);
      });

      // Inicia a sessão NFC
      await Promise.race([NfcManager.requestTechnology(NfcTech.Ndef), timeoutPromise]);

      // Passo 1: Ler a tag NFC
      const tag = await NfcManager.getTag();
      if (!tag) {
        throw new Error('Nenhuma tag NFC encontrada.');
      }

      const decodedMessage = decodeNdefMessage(tag.ndefMessage);
      setTagContent(decodedMessage);

      console.log('NFC Tag Detectada:', decodedMessage);

      // Passo 2: Escrever na tag NFC (na mesma sessão)
      const bytes = Ndef.encodeMessage([Ndef.textRecord(JSON.stringify(dataToWrite))]);
      await NfcManager.ndefHandler.writeNdefMessage(bytes);

      console.log('Dados gravados na tag NFC com sucesso!');
      return decodedMessage;
    } catch (ex: any) {
      console.error('Falha ao ler/gravar na tag NFC:', ex.message);
      throw ex;
    } finally {
      setIsProcessing(false);
      await NfcManager.cancelTechnologyRequest();
    }
  };

  const disconnectNfc = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (error) {
      console.error('Erro ao desconectar a tag NFC:', error);
    }
  };

  return { isProcessing, tagContent, readAndWriteNfc, disconnectNfc };
};

export default useNfcHandler;
