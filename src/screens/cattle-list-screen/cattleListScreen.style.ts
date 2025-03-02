import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

const cattleListScreenStyles = StyleSheet.create({
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
});

export default cattleListScreenStyles;
