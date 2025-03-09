import { api } from '../services/api';

export class BaseResource<T> {
  constructor(protected endpoint: string) {}

  public async getAll(): Promise<T[]> {
    try {
      const response = await api.get(`/${this.endpoint}`);

      const data = response.data?.data || response.data;
      if (!Array.isArray(data)) {
        console.error('Error: Expected an array but got:', data);
        return [];
      }

      return data;
    } catch (error) {
      console.error(`Error fetching ${this.endpoint}:`, error);
      throw error;
    }
  }

  public async getById(id: number): Promise<T> {
    try {
      const response = await api.get(`/${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.endpoint}:`, error);
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await api.delete(`/${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Error deleting ${this.endpoint}:`, error);
      throw error;
    }
  }
}
