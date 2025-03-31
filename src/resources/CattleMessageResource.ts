import { BaseResource } from '../base/BaseResource';
import { CattleMessageDTO } from '../dtos/CattleMessageDTO';
import { api } from '../services/api';

export class CattleMessageResource extends BaseResource<CattleMessageDTO> {
  constructor() {
    super('cattle-messages');
  }

  async getMessagesByCattleVeterinarianId(cattleVeterinarianId: number): Promise<CattleMessageDTO[]> {
    try {
      const response = await api.get(`/${this.endpoint}/cattle-veterinarian/${cattleVeterinarianId}`);

      if (!Array.isArray(response.data.data)) {
              console.error('Error: Expected an array but got:', response.data.data);
              return [];
      }

      return response.data.data.map((item:any) => {
        if (item) {
          return CattleMessageDTO.createFromResource(item);
        }
        return null;
      }).filter((item:any) => item !== null) as CattleMessageDTO[];
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      throw error;
    }
  }

  async sendMessage(cattleVeterinarianId: number, message: string, senderId: number | undefined, recipientId: number | undefined): Promise<CattleMessageDTO> {
    try {
      const response = await api.post(`/${this.endpoint}`, {
        cattle_veterinarian_id: cattleVeterinarianId,
        sender_id: senderId,
        recipient_id: recipientId,
        message: message,
      });
      return CattleMessageDTO.createFromResource(response.data.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }
}
