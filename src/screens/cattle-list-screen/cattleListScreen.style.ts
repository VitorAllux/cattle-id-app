import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

export const cattleListScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  tagStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagStatusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemDetails: {
    marginTop: 16,
  },
  itemDetail: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  connectButton: {
    marginLeft: 8,
  },
});
