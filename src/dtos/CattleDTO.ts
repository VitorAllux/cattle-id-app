export type CattleDTO = {
    id: number;
    name: string;
    age: number;
    vaccines: string;
    status: string;
    active: boolean;
    nfc_tag: {
      id: number;
      entity_id: number;
      entity_type: string;
      code: string;
      parameters: {
        weight: number;
      };
      active: boolean;
    }[];
  };

  export const CattleDTO = {
    createFromResource: (data: any): CattleDTO => ({
      id: data.id,
      name: data.name,
      age: data.age,
      vaccines: data.vaccines,
      status: data.status,
      active: data.active,
      nfc_tag: data.nfc_tag
        ? [
            {
              id: data.nfc_tag.id,
              entity_id: data.nfc_tag.entity_id,
              entity_type: data.nfc_tag.entity_type,
              code: data.nfc_tag.code,
              parameters: JSON.parse(data.nfc_tag.parameters),
              active: data.nfc_tag.active,
            },
          ]
        : [],
    }),
  };
