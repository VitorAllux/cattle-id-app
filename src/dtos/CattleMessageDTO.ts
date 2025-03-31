// Em CattleMessageDTO.ts
import { UserDTO } from './UserDTO';

export type CattleMessageDTO = {
  id: number;
  cattle_veterinarian_id: number;
  sender: UserDTO;
  recipient?: UserDTO; // Alterado para opcional
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
};

export const CattleMessageDTO = {
  createFromResource: (data: any): CattleMessageDTO => ({
    id: data.id,
    cattle_veterinarian_id: data.cattle_veterinarian_id,
    sender: UserDTO.createFromResource(data.sender),
    recipient: data.recipient ? UserDTO.createFromResource(data.recipient) : undefined ,
    message: data.message,
    is_read: data.is_read,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }),
};
