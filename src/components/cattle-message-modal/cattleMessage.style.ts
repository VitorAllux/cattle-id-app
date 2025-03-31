import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../styles/style';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        maxHeight: windowHeight * 0.6,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        maxWidth: '80%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
        color: '#FFF',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFE4E1',
        color: '#000',
    },
    messageSender: {
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 5,
    },
    messageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        zIndex: 2,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        zIndex: 2,
    },
    sendButton: {
        padding: 10,
    },
    limitedHeight: {
        maxHeight: windowHeight * 0.4,
    },
});

export default styles;
