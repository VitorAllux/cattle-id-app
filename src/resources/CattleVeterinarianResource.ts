import { BaseResource } from '../base/BaseResource';
import { CattleVeterinarianDTO } from '../dtos/CattleVeterinarianDTO';
import { api } from '../services/api';

export class CattleVeterinarianResource extends BaseResource<CattleVeterinarianDTO> {
  constructor() {
    super('cattle-veterinarians');
  }

  async getByCattleId(cattleId: number): Promise<CattleVeterinarianDTO | null> {
    try {
      const response = await api.get(`/${this.endpoint}/cattle/${cattleId}`);

      return CattleVeterinarianDTO.createFromResource(response.data.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }
}
