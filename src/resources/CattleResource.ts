import { BaseResource } from '../base/BaseResource';
import { CattleDTO } from '../dtos/CattleDTO';
import { api } from '../services/api';

export class CattleResource extends BaseResource<CattleDTO> {
  constructor() {
    super('cattles');
  }

  async getAll(): Promise<CattleDTO[]> {
    try {
      const response = await api.get(`/${this.endpoint}`);
      return response.data.data.map((item: any) => CattleDTO.createFromResource(item));
    } catch (error) {
      console.error('Erro ao buscar gados:', error);
      throw new Error('Erro ao buscar gados');
    }
  }

  async getById(id: number): Promise<CattleDTO> {
    try {
      const response = await api.get(`/${this.endpoint}/${id}`);
      console.log('Response data:', response.data);
      return CattleDTO.createFromResource(response.data);
    } catch (error) {
      console.error('Erro ao buscar gado:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/${this.endpoint}/${id}`);
    } catch (error) {
      console.error('Erro ao deletar gado:', error);
      throw error;
    }
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
