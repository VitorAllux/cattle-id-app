import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

const syncScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  tagStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  tagStatusText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.white,
  },
  connectButtonText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default syncScreenStyles;
