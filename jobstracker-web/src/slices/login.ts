// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginInfo {
    isLoggedIn: boolean;
    username: string;
    email: string;
    telephone: string;
    sessionToken: string;
}

const initialLoginState: LoginInfo = {
    isLoggedIn: false,
    username: "",
    email: "",
    telephone: "",
    sessionToken: "",
};

// type GoogleLoginState = {
//     isLoggedIn: boolean;
//     username: string;
//     email: string;
//     telephone: string;
// }

const loginSlice = createSlice({
  name: 'counter',
  initialState: initialLoginState,
  reducers: {
    login: (state, action: PayloadAction<LoginInfo>) => {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.telephone = action.payload.telephone;
        state.sessionToken = action.payload.sessionToken;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.username = "";
        state.email = "";
        state.telephone = "";
        state.sessionToken = "";
    }
  },
});

export const { login, logout } = loginSlice.actions;
export { initialLoginState };
export default loginSlice.reducer;