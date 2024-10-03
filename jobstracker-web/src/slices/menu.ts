// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    currentmenu: string;
    isMobilemode: boolean;
}

const initialMenuState: MenuState = {
    currentmenu: "Dashboard",
    isMobilemode: false
};

// type GoogleLoginState = {
//     isLoggedIn: boolean;
//     username: string;
//     email: string;
//     telephone: string;
// }

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    setCurrentMenu: (state, action: PayloadAction<string>) => {
        state.currentmenu = action.payload;
    },
    setIsMobileMode: (state, action: PayloadAction<boolean>) => {
        state.isMobilemode = action.payload;
    }
  },
});

export const { setCurrentMenu,setIsMobileMode } = menuSlice.actions;
export { initialMenuState };
export default menuSlice.reducer;