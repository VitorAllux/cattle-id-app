import * as Keychain from 'react-native-keychain';

export const setAuthToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('auth', token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};
