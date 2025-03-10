import { useState } from 'react';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

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

            console.log('Dados gravados na tag NFC com sucesso!');
        } catch (ex: any) {
            console.error('Falha ao gravar na tag NFC:', ex.message);
        } finally {
            setIsWriting(false);
            await NfcManager.cancelTechnologyRequest();
        }
    };

    return { isWriting, writeNfc };
};

export default useNfcWriter;
