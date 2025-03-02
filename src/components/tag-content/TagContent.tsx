import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

interface TagContentProps {
  content: string | object;
}

const TagContent: React.FC<TagContentProps> = ({ content }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Conteúdo da Tag:</Text>
      <Text style={styles.content}>
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
  },
});

export default TagContent;
