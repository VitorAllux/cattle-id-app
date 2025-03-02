import { CattleDTO } from '../dtos/CattleDTO';
import api from '../services/api';

export const CattleResource = {
  getAll: async (): Promise<CattleDTO[]> => {
    try {
      const response = await api.get('/cattles');
      console.log(response.data);

      return response.data?.data
        ? response.data.data.map((item: any) => CattleDTO.createFromResource(item))
        : [];
    } catch (error) {
      console.error('Error fetching cattles:', error);
      throw error;
    }
  },
  getById: async (id: number): Promise<CattleDTO> => {
    try {
      const response = await api.get(`/cattles/${id}`);
      return CattleDTO.createFromResource(response.data);
    } catch (error) {
      console.error('Error fetching cattle:', error);
      throw error;
    }
  },
  delete: async (id: number): Promise<void> => {
    try {
        console.log('Token antes do DELETE:', api.defaults.headers.Authorization);
        const response = await api.delete(`/cattles/${id}`, {
            withCredentials: true,
        });

        console.log('Resposta da API ao deletar:', response.data);
    } catch (error: any) {
        console.error('Error deleting cattle:', error.response ? error.response.data : error.message);
    }
  },
};
