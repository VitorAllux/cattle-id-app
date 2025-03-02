import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import masterStyles from '../../styles/style';
import {COLORS} from '../../styles/style';
import {CattleResource} from '../../resources/CattleResource';
import {CattleDTO} from '../../dtos/CattleDTO';
import {login} from '../../services/api';

const CattleListScreen = () => {
  const [cattles, setCattles] = useState<CattleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchCattles();
  }, []);

  const fetchCattles = async () => {
    try {
      const data = await CattleResource.getAll();
      setCattles(data);
    } catch (error) {
      console.error('Error fetching cattles:', error);
    } finally {
      console.log('fetch');
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    try {
      await CattleResource.delete(id);
      fetchCattles();
    } catch (error) {
      console.error('Error deleting cattle:', error);
    }
  };

  const renderItem = ({item}: {item: CattleDTO}) => {
    const vaccines = JSON.parse(item.vaccines) || [];
    const parameters = item.nfc_tag[0].parameters || {};

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Icon
              name={expandedId === item.id ? 'expand-less' : 'expand-more'}
              size={24}
              color={COLORS.primary}
            />
          </View>
          {expandedId === item.id && (
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>Idade: {item.age} anos</Text>
              <Text style={styles.itemDetail}>
                Código: {item.nfc_tag[0].code}
              </Text>
              <Text style={styles.itemDetail}>
                Peso: {parameters.weight || 'N/A'} kg
              </Text>
              <Text style={styles.itemDetail}>
                Vacinas: {vaccines.join(', ') || 'Nenhuma'}
              </Text>
              <Text style={styles.itemDetail}>Status: {item.status}</Text>
              <Text style={styles.itemDetail}>
                Ativo: {item.active ? 'Sim' : 'Não'}
              </Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => console.log('Mensagem/Chat')}>
                  <Icon name="message" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Editar')}>
                  <Icon name="edit" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Icon name="delete" size={24} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={masterStyles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={masterStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Gados</Text>
        <TouchableOpacity onPress={() => console.log('Adicionar')}>
          <Icon name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cattles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemDetails: {
    marginTop: 12,
  },
  itemDetail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default CattleListScreen;
