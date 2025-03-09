import { useState } from 'react';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { Alert } from 'react-native';

const useNfcWriter = () => {
    const [isWriting, setIsWriting] = useState(false);

    const writeNfc = async (data: any) => {
        setIsWriting(true);

        const bytes = Ndef.encodeMessage([Ndef.textRecord(JSON.stringify(data))]);

        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout: Nenhuma tag NFC encontrada.')), 10000);
            });

            await Promise.race([NfcManager.requestTechnology(NfcTech.Ndef), timeoutPromise]);

            await NfcManager.ndefHandler.writeNdefMessage(bytes);

            Alert.alert('Sucesso', 'Dados gravados na tag NFC!');
        } catch (ex: any) {
            const errorMessage = 'Falha ao gravar na tag NFC: ' + ex.message;

            Alert.alert('Error', errorMessage);
        } finally {
            setIsWriting(false);
            await NfcManager.cancelTechnologyRequest();
        }
    };

    return { isWriting, writeNfc };
};

export default useNfcWriter;
