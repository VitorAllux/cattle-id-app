import { BaseResource } from '../base/BaseResource';
import { CattleDTO } from '../dtos/CattleDTO';

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
}
