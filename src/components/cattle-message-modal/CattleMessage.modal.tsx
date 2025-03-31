import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CattleMessageResource } from '../../resources/CattleMessageResource';
import { CattleVeterinarianResource } from '../../resources/CattleVeterinarianResource';
import { CattleMessageDTO } from '../../dtos/CattleMessageDTO';
import { UserDTO } from '../../dtos/UserDTO';
import { COLORS } from '../../styles/style';
import { AuthResource } from '../../resources/AuthResource';
import styles from './cattleMessage.style';

interface CattleMessageModalProps {
    cattleId: number;
    producer?: UserDTO;
    veterinarian?: UserDTO;
    onClose: () => void;
    visible: boolean;
}

const CattleMessageModal: React.FC<CattleMessageModalProps> = ({ cattleId, producer, veterinarian, onClose, visible }) => {
    const [messages, setMessages] = useState<CattleMessageDTO[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [cattleVeterinarianId, setCattleVeterinarianId] = useState<number | null>(null);
    const [hasCattleVeterinarian, setHasCattleVeterinarian] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const cattleVeterinarianResource = useMemo(() => new CattleVeterinarianResource(), []);
    const cattleMessageResource = useMemo(() => new CattleMessageResource(), []);
    const flatListRef = useRef<FlatList>(null);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await AuthResource.getUser();
                setCurrentUserId(user?.id || null);
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCattleVeterinarian = async () => {
            try {
                const cattleVeterinarian = await cattleVeterinarianResource.getByCattleId(cattleId);
                if (cattleVeterinarian) {
                    setCattleVeterinarianId(cattleVeterinarian.id);
                    setHasCattleVeterinarian(true);
                } else {
                    setHasCattleVeterinarian(false);
                }
            } catch (error) {
                console.error('Erro ao buscar veterinário:', error);
                setHasCattleVeterinarian(false);
            }
        };

        fetchCattleVeterinarian();
    }, [cattleId, cattleVeterinarianResource]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (cattleVeterinarianId) {
                try {
                    const fetchedMessages = await cattleMessageResource.getMessagesByCattleVeterinarianId(cattleVeterinarianId);
                    setMessages(fetchedMessages);
                } catch (error) {
                    console.error('Erro ao buscar mensagens:', error);
                }
            }
        };
        fetchMessages();
    }, [cattleVeterinarianId, cattleMessageResource, currentUserId]);
    useEffect(() => {
        Keyboard.removeAllListeners('keyboardDidShow');
        Keyboard.removeAllListeners('keyboardDidHide');

        if (visible) {
            setNewMessage('');
            setKeyboardVisible(false);
            const keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                () => {
                    setKeyboardVisible(true);
                }
            );
            const keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () => {
                    setKeyboardVisible(false);
                }
            );

            return () => {
                keyboardDidHideListener.remove();
                keyboardDidShowListener.remove();
            };
        }
    }, [visible]);

    useEffect(() => {
        if (visible && inputRef.current && !keyboardVisible) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        }
    }, [visible, keyboardVisible]);

    const handleSendMessage = async () => {
        console.log('handleSendMessage foi chamado!');

        if (!newMessage.trim()) {
            Alert.alert('Atenção', 'Por favor, insira uma mensagem.');
            return;
        }

        if (!cattleVeterinarianId || !producer || !veterinarian) {
            console.log('cattleVeterinarianId:', cattleVeterinarianId);
            console.log('producer:', producer);
            console.log('veterinarian:', veterinarian);
            Alert.alert('Erro', 'Dados incompletos para enviar a mensagem.');
            return;
        }
        console.log('cattleVeterinarianId:', cattleVeterinarianId);
        console.log('producer:', producer);
        console.log('veterinarian:', veterinarian);
        try {
            const message = await cattleMessageResource.sendMessage(
                cattleVeterinarianId,
                newMessage,
                producer.id,
                veterinarian.id
            );

            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }



        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <Modal transparent={true} animationType="slide" onRequestClose={onClose} visible={visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Mensagens</Text>

                        {hasCattleVeterinarian ? (
                            <>
                                <FlatList
                                    ref={flatListRef}
                                    data={messages}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => {
                                        const isSentMessage = item?.sender?.id === currentUserId;
                                        return (
                                            <View
                                                style={[
                                                    styles.messageContainer,
                                                    isSentMessage ? styles.sentMessage : styles.receivedMessage,
                                                ]}
                                            >
                                                <Text style={styles.messageSender}>
                                                    {item?.sender?.name}:
                                                </Text>
                                                <Text style={styles.messageText}>{item.message}</Text>
                                            </View>
                                        );
                                    }}
                                    inverted={false}
                                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                                />
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={inputRef}
                                        style={styles.input}
                                        placeholder="Digite sua mensagem"
                                        value={newMessage}
                                        onChangeText={setNewMessage}
                                        onSubmitEditing={handleSendMessage}
                                        blurOnSubmit={false}
                                        autoFocus={false}
                                        returnKeyType="send"
                                        editable={true}
                                    />
                                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                                        <Icon name="send" size={24} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <Text>Nenhum veterinário associado a este gado. O chat está desabilitado.</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default CattleMessageModal;
