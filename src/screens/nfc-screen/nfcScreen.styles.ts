import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/style';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonSpacer: {
    width: 10,
  },
});
