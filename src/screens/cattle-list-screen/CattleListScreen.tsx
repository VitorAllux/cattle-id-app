import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CattleResource } from '../../resources/CattleResource';
import { CattleDTO } from '../../dtos/CattleDTO';
import cattleListScreenStyles from './cattleListScreen.style';
import masterStyles, { COLORS } from '../../styles/style';

const CattleListScreen = () => {
  const [cattles, setCattles] = useState<CattleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const cattleResource = useMemo(() => new CattleResource(), []);

  const fetchCattles = useCallback(async () => {
    try {
      const data = await cattleResource.getAll();
      setCattles(data);
    } catch (error) {
      console.error('Error fetching cattles:', error);
    } finally {
      setLoading(false);
    }
  }, [cattleResource]);

  useEffect(() => {
    fetchCattles();
  }, [fetchCattles]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    try {
      await cattleResource.delete(id);
      fetchCattles();
    } catch (error) {
      console.error('Error deleting cattle:', error);
    }
  };

  const renderItem = ({ item }: { item: CattleDTO }) => {
    const vaccines = JSON.parse(item.vaccines) || [];
    const parameters = item.nfc_tag[0].parameters || {};

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={cattleListScreenStyles.itemContainer}>
          <View style={cattleListScreenStyles.itemHeader}>
            <Text style={cattleListScreenStyles.itemName}>{item.name}</Text>
            <Icon name={expandedId === item.id ? 'expand-less' : 'expand-more'} size={24} color={COLORS.primary} />
          </View>
          {expandedId === item.id && (
            <View style={cattleListScreenStyles.itemDetails}>
              <Text style={cattleListScreenStyles.itemDetail}>Idade: {item.age} anos</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Código: {item.nfc_tag[0].code}</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Peso: {parameters.weight || 'N/A'} kg</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Vacinas: {vaccines.join(', ') || 'Nenhuma'}</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Status: {item.status}</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Ativo: {item.active ? 'Sim' : 'Não'}</Text>
              <View style={cattleListScreenStyles.actionsContainer}>
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
      <View style={cattleListScreenStyles.header}>
        <Text style={cattleListScreenStyles.headerTitle}>Lista de Gados</Text>
        <TouchableOpacity onPress={() => console.log('Adicionar')}>
          <Icon name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cattles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={cattleListScreenStyles.listContainer}
      />
    </SafeAreaView>
  );
};

export default CattleListScreen;
