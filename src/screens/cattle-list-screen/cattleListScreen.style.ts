import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

const cattleListScreenStyles = StyleSheet.create({
    listContainer: {
      padding: 16,
    },
    itemContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
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
      color: '#333',
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
      borderBottomColor: COLORS.primary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
  });

export default cattleListScreenStyles;
