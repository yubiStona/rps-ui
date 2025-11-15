import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, initialState, User } from "./utils";

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials: (state, { payload }: PayloadAction<Partial<AuthState>>) => {
          Object.assign(state, payload);
        },
        setUser: (state, { payload }: PayloadAction<User>) => {
          state.user = payload;
        },
        clearCredentials: (state) => {
          Object.assign(state, initialState);
        },
    }
})

export const {setCredentials,setUser,clearCredentials} = authSlice.actions
export default authSlice.reducer;