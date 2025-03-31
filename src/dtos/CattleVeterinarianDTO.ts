import { CattleMessageDTO } from './CattleMessageDTO';
import { UserDTO } from './UserDTO';

export type CattleVeterinarianDTO = {
  id: number;
  cattle_id: number;
  producer: UserDTO;
  veterinarian: UserDTO;
  messages: CattleMessageDTO[];
  created_at: string;
  updated_at: string;
};

export const CattleVeterinarianDTO = {
  createFromResource: (data: any): CattleVeterinarianDTO => ({
    id: data.id,
    cattle_id: data.cattle_id,
    producer: UserDTO.createFromResource(data.producer),
    veterinarian: UserDTO.createFromResource(data.veterinarian),
    messages: data.messages ? data.messages.map((message: any) => CattleMessageDTO.createFromResource(message)) : [],
    created_at: data.created_at,
    updated_at: data.updated_at,
  }),
};
