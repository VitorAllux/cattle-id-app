import RNFS from 'react-native-fs';

// Caminho para o diretório de logs no armazenamento interno do app
const LOGS_DIR = RNFS.DocumentDirectoryPath + '/logs';
const LOG_FILE_PATH = LOGS_DIR + '/app.log';

// Garante que o diretório e o arquivo de logs existam
const ensureLogFileExists = async () => {
  try {
    const dirExists = await RNFS.exists(LOGS_DIR);
    if (!dirExists) {
      await RNFS.mkdir(LOGS_DIR);
    }

    const fileExists = await RNFS.exists(LOG_FILE_PATH);
    if (!fileExists) {
      await RNFS.writeFile(LOG_FILE_PATH, '', 'utf8');
    }
  } catch (error) {
    console.error('Erro ao garantir a existência do log:', error);
  }
};

const getFormattedTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
};

export const saveLog = async (message: string) => {
//   try {
//     await ensureLogFileExists();

//     const timestamp = getFormattedTimestamp();
//     const logMessage = `${timestamp} ${message}\n`;

//     await RNFS.appendFile(LOG_FILE_PATH, logMessage, 'utf8');
//     console.log('Log salvo com sucesso:', logMessage);
//   } catch (error) {
//     console.error('Erro ao salvar log:', error);
//   }
};

export const clearLogs = async () => {
  try {
    await ensureLogFileExists();
    await RNFS.writeFile(LOG_FILE_PATH, '', 'utf8');
    console.log('Logs limpos com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
};
