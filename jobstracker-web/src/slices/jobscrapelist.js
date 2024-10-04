var _a;
// src/slices/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
var initialMenuState = {
    isOpenModal: false,
    currentMode: "",
    currentSelection: {
        index: 0,
        uuid: "",
        id: 0,
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
        getjobsSuperDetails: false,
        created_at: "",
    },
    confirmEditData: {
        index: 0,
        uuid: "",
        id: 0,
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
        getjobsSuperDetails: false,
        created_at: "",
    },
    totalsData: null,
    tableData: [],
    loadingState: { loading: false, error: null },
    queryData: {
        page: 1,
        pagesize: 5,
        sorting: {
            sortBy: "ID",
            sortOrder: "desc",
        },
    },
};
var jobscrapelistSlice = createSlice({
    name: 'jobscrapelist',
    initialState: initialMenuState,
    reducers: {
        setIsOpenModal: function (state, action) {
            state.isOpenModal = action.payload;
        },
        setCurrentMode: function (state, action) {
            state.currentMode = action.payload;
        },
        setCurrentSelection: function (state, action) {
            state.currentSelection = action.payload;
        },
        setConfirmEditData: function (state, action) {
            state.confirmEditData = action.payload;
        },
        setTotalsData: function (state, action) {
            state.totalsData = action.payload;
        },
        setTableData: function (state, action) {
            state.tableData = action.payload;
        },
        setLoadingState: function (state, action) {
            state.loadingState = action.payload;
        },
        setQueryData: function (state, action) {
            state.queryData = action.payload;
        }
    },
});
export var setIsOpenModal = (_a = jobscrapelistSlice.actions, _a.setIsOpenModal), setCurrentMode = _a.setCurrentMode, setCurrentSelection = _a.setCurrentSelection, setConfirmEditData = _a.setConfirmEditData, setTotalsData = _a.setTotalsData, setTableData = _a.setTableData, setLoadingState = _a.setLoadingState, setQueryData = _a.setQueryData;
export { initialMenuState };
export default jobscrapelistSlice.reducer;
