export type UserDTO = {
    id: number;
    name: string;
    email: string;
  };

  export const UserDTO = {
    createFromResource: (data: any): UserDTO => ({
      id: data.id,
      name: data.name,
      email: data.email,
    }),
  };
