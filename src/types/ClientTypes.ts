export interface CreateClientRequestBody {
  name: string;
  email: string;
}

export type UpdateClientRequestBody = Partial<CreateClientRequestBody>;

// export interface UpdateClientRequestBody {
//   name?: string;
//   email?: string;
// }

export interface GetClientRequestBody {
  id?: number;
}
