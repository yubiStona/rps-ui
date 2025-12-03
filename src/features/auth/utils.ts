export interface User {
  id:number | null;
  name: string | null;
  email: string | null;
  contact: string | null;
  UserType: string;
}

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};
