import { useState } from 'react';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { saveLog } from '../../utils/logger';
import { Alert } from 'react-native';

const useNfcReader = () => {
    const [isReading, setIsReading] = useState(false);
    const [tagContent, setTagContent] = useState(null);

    const decodeNdefMessage = (ndefMessage: any) => {
        if (!ndefMessage || ndefMessage.length === 0) { return null; }

        return ndefMessage
            .map((record: any) => {
                if (record.tnf === Ndef.TNF_WELL_KNOWN && Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                    return Ndef.text.decodePayload(record.payload);
                }
                return null;
            })
            .filter(Boolean)
            .join('\n');
    };

    const readNfc = async () => {
        setIsReading(true);
        setTagContent(null);
        await saveLog('Iniciando leitura de NFC...');

        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout: Nenhuma tag NFC encontrada.')), 10000);
            });

            await Promise.race([NfcManager.requestTechnology(NfcTech.Ndef), timeoutPromise]);

            const tag = await NfcManager.getTag();
            if (!tag) { throw new Error('Nenhuma tag NFC encontrada.'); }

            const decodedMessage = decodeNdefMessage(tag.ndefMessage);
            setTagContent(decodedMessage || JSON.stringify(tag, null, 2));

            await saveLog('Tag NFC lida com sucesso: ' + JSON.stringify(tag));

            Alert.alert('NFC Tag Detected', 'Tag lida com sucesso!');
        } catch (ex: any) {
            const errorMessage = 'Falha ao ler a tag NFC: ' + ex.message;

            await saveLog(errorMessage);

            Alert.alert('Error', errorMessage);
        } finally {
            setIsReading(false);

            await NfcManager.cancelTechnologyRequest();
            await saveLog('Leitura de NFC finalizada.');
        }
    };

    return { isReading, tagContent, readNfc };
};

export default useNfcReader;
