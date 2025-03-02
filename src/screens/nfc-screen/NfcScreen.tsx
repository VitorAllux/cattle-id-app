import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import useNfcReader from '../../hooks/nfc/useNfcReader';
import useNfcWriter from '../../hooks/nfc/useNfcWriter';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import TagContent from '../../components/tag-content/TagContent';
import { styles } from './nfcScreen.styles';

const NfcScreen = () => {
  const { isReading, tagContent, readNfc } = useNfcReader();
  const { isWriting, writeNfc } = useNfcWriter();

  const data = {
    entity_id: '123',
    entity_type: 'cattle',
    parameters: { weight: 500, age: 3 },
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NFC Reader</Text>

      {isReading && <LoadingIndicator loadingText="Lendo tag NFC..." />}
      {isWriting && <LoadingIndicator loadingText="Gravando na tag NFC..." />}

      {tagContent && <TagContent content={tagContent} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, (isReading || isWriting) && styles.disabledButton]}
          onPress={readNfc}
          disabled={isReading || isWriting}>
          <Text style={styles.buttonText}>Ler NFC</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacer} />
        <TouchableOpacity
          style={[styles.button, (isReading || isWriting) && styles.disabledButton]}
          onPress={() => writeNfc(data)}
          disabled={isReading || isWriting}>
          <Text style={styles.buttonText}>Gravar NFC</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NfcScreen;
