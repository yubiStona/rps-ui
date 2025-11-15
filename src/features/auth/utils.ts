export interface User {
  userid: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string;
  token: string | null;
  token_type: string | null;
  roles: Role[] | null;
  profile:string | null;
}

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};
export interface Role {
  id: number;
  name: string;
  permissions: string[];
}