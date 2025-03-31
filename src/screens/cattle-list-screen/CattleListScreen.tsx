import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CattleResource } from '../../resources/CattleResource';
import { CattleDTO } from '../../dtos/CattleDTO';
import masterStyles, { COLORS } from '../../styles/style';
import { CattleTagStatusEnum, tagStatusColors, tagStatusTexts } from '../../enums/CattleTagStatusEnum';
import { cattleListScreenStyles } from './cattleListScreen.style';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CattleMessageModal from '../../components/cattle-message-modal/CattleMessage.modal';

type CattleListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CattleList'>;

const CattleListScreen = () => {
  const navigation = useNavigation<CattleListScreenNavigationProp>();
  const [cattles, setCattles] = useState<CattleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState<CattleDTO | null>(null);
  const cattleResource = useMemo(() => new CattleResource(), []);

  const fetchCattles = useCallback(async () => {
    try {
      const data = await cattleResource.getAll();
      setCattles(data);
    } catch (error) {
      console.error('Erro ao buscar gados:', error);
    } finally {
      setLoading(false);
    }
  }, [cattleResource]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCattles();
    });
    return unsubscribe;
  }, [navigation, fetchCattles]);

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
      console.error('Erro ao deletar gado:', error);
    }
  };

  const handleMessageButtonClick = (cattle: CattleDTO) => {
    setSelectedCattle(cattle);
    setShowMessageModal(true);
  };

  const renderItem = ({ item }: { item: CattleDTO }) => {
    const vaccines = JSON.parse(item.vaccines) || [];
    const parameters = item.nfc_tag[0]?.parameters || {};
    const tagStatus = item.tag_status as keyof typeof CattleTagStatusEnum;

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={cattleListScreenStyles.itemContainer}>
          <View style={cattleListScreenStyles.itemHeader}>
            <Text style={cattleListScreenStyles.itemName}>{item.name}</Text>
            <View style={cattleListScreenStyles.tagStatusContainer}>
              <View style={[cattleListScreenStyles.tagStatusBadge, { backgroundColor: tagStatusColors[tagStatus] }]}>
                <Text style={cattleListScreenStyles.tagStatusText}>{tagStatusTexts[tagStatus]}</Text>
              </View>
              <Icon name={expandedId === item.id ? 'expand-less' : 'expand-more'} size={24} color={COLORS.primary} />
            </View>
          </View>
          {expandedId === item.id && (
            <View style={cattleListScreenStyles.itemDetails}>
              <Text style={cattleListScreenStyles.itemDetail}>Idade: {item.age} anos</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Código: {item.nfc_tag[0]?.code}</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Peso: {parameters.weight || 'N/A'} kg</Text>
              <Text style={cattleListScreenStyles.itemDetail}>
                Vacinas: {vaccines.length > 0 ? vaccines.join(', ') : 'Nenhuma'}
              </Text>
              <Text style={cattleListScreenStyles.itemDetail}>Status: {item.status}</Text>
              <Text style={cattleListScreenStyles.itemDetail}>Ativo: {item.active ? 'Sim' : 'Não'}</Text>
              <View style={cattleListScreenStyles.itemDetail}>
                <Text>Status da Tag: </Text>
                <View style={cattleListScreenStyles.tagStatusContainer}>
                  <View style={[cattleListScreenStyles.tagStatusBadge, { backgroundColor: tagStatusColors[tagStatus] }]}>
                    <Text style={cattleListScreenStyles.tagStatusText}>{tagStatusTexts[tagStatus]}</Text>
                  </View>
                  <TouchableOpacity
                    style={cattleListScreenStyles.connectButton}
                    onPress={() => {
                      navigation.navigate('TagSync', { cattle: item });
                    }}
                  >
                    <Icon name="sync" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={cattleListScreenStyles.actionsContainer}>
                <TouchableOpacity onPress={() => handleMessageButtonClick(item)}>
                  <Icon name="message" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
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
      </View>
      <FlatList
        data={cattles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={cattleListScreenStyles.listContainer}
      />


        {selectedCattle && (
          <CattleMessageModal
            cattleId={selectedCattle.id}
            onClose={() => setShowMessageModal(false)}
            visible={showMessageModal}
          />
        )}

    </SafeAreaView>
  );
};

export default CattleListScreen;
