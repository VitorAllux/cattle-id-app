import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 8,
    width: 160,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 100,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
});

export default homeScreenStyles;
