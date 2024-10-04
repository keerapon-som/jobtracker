// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/login';
import menuReducer from './slices/menu';
import jobscrapelist from './slices/jobscrapelist';
import jobscheduling from './slices/jobscheduling';
var store = configureStore({
    reducer: {
        login: loginReducer,
        menu: menuReducer,
        jobscrapelist: jobscrapelist,
        jobscheduling: jobscheduling,
    },
});
export default store;
