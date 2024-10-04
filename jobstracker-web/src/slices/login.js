var _a;
// src/slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
var initialLoginState = {
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
var loginSlice = createSlice({
    name: 'counter',
    initialState: initialLoginState,
    reducers: {
        login: function (state, action) {
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.telephone = action.payload.telephone;
            state.sessionToken = action.payload.sessionToken;
        },
        logout: function (state) {
            state.isLoggedIn = false;
            state.username = "";
            state.email = "";
            state.telephone = "";
            state.sessionToken = "";
        }
    },
});
export var login = (_a = loginSlice.actions, _a.login), logout = _a.logout;
export { initialLoginState };
export default loginSlice.reducer;
