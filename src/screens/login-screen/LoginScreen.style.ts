import { StyleSheet } from 'react-native';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  form: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E91E63',
  },
  input: {
    height: 50,
    borderColor: '#E91E63',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#E91E63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default loginScreenStyles;
