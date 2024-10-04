var _a;
// src/slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
var initialMenuState = {
    currentmenu: "Dashboard",
    isMobilemode: false
};
// type GoogleLoginState = {
//     isLoggedIn: boolean;
//     username: string;
//     email: string;
//     telephone: string;
// }
var menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        setCurrentMenu: function (state, action) {
            state.currentmenu = action.payload;
        },
        setIsMobileMode: function (state, action) {
            state.isMobilemode = action.payload;
        }
    },
});
export var setCurrentMenu = (_a = menuSlice.actions, _a.setCurrentMenu), setIsMobileMode = _a.setIsMobileMode;
export { initialMenuState };
export default menuSlice.reducer;
