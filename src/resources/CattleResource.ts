import { BaseResource } from '../base/BaseResource';
import { CattleDTO } from '../dtos/CattleDTO';
import { api } from '../services/api';

export class CattleResource extends BaseResource<CattleDTO> {
  constructor() {
    super('cattles');
  }

  async getAll(): Promise<CattleDTO[]> {
    const data = await super.getAll();
    return data.map((item: any) => CattleDTO.createFromResource(item));
  }

  async getById(id: number): Promise<CattleDTO> {
    const data = await super.getById(id);
    return CattleDTO.createFromResource(data);
  }

  async delete(id: number): Promise<void> {
    await super.delete(id);
  }

  async checkCattle(id: number): Promise<CattleDTO | null> {
    try {
      const response = await api.get(`/${this.endpoint}/check/${id}`);
      return response.data.data ? CattleDTO.createFromResource(response.data.data) : null;
    } catch (error) {
      console.error('Erro ao verificar cattle:', error);
      throw error;
    }
  }

  async syncCattleTag(cattleId: number, oldNfcData: any, oldCattleId?: number): Promise<void> {
    try {
      const response = await api.post(`/${this.endpoint}/sync-tag`, {
        cattle_id: cattleId,
        old_nfc_data: oldNfcData,
        old_cattle_id: oldCattleId,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao sincronizar tag NFC:', error);
      throw error;
    }
  }
}
