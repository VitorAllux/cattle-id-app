import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

const homeScreenStyles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  avatar: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    paddingVertical: 8,
    width: 160,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default homeScreenStyles;
