import { COLORS } from '../styles/style';


export enum CattleTagStatusEnum {
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED',
}

export const tagStatusColors = {
  [CattleTagStatusEnum.PENDING]: COLORS.warning,
  [CattleTagStatusEnum.ERROR]: COLORS.danger,
  [CattleTagStatusEnum.CONNECTED]: COLORS.success,
};

export const tagStatusTexts = {
  [CattleTagStatusEnum.PENDING]: 'Pendente',
  [CattleTagStatusEnum.ERROR]: 'Erro',
  [CattleTagStatusEnum.CONNECTED]: 'Conectado',
};
