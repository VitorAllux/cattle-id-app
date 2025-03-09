import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../context/AuthContext';
import {COLORS} from '../../styles/style';
import ToastMessage from '../toast-message/ToastMessage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type CustomHeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const CustomHeader = ({navigation}: CustomHeaderProps) => {
  const {user, logout} = useContext(AuthContext) || {};
  const [showDropdown, setShowDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      setShowToast(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDropdown(true)}>
        <Icon name="account-circle" size={30} color={COLORS.primary} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDropdown(false)}>
              <Icon name="close" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.dropdownTitle}>{user?.name || 'Usuário'}</Text>
            <TouchableOpacity style={styles.dropdownItem} disabled>
              <Text style={styles.dropdownText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} disabled>
              <Text style={styles.dropdownText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}>
              <Text style={[styles.dropdownText, {color: COLORS.danger}]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ToastMessage
        message="Voce deslogou com sucesso!."
        visible={showToast}
        onClose={handleCloseToast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    paddingVertical: 8,
    width: 160,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CustomHeader;
