// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableProps = {
    index: number;
    uuid: string;
    id: number;
    jobname: string;
    getjobsCount: boolean;
    getjobsDetails: boolean;
    created_at: string;
  };

type queryData = {
    page: number;
    pagesize: number;
    sorting?: sort;
};

type sort = {
    sortBy: string;
    sortOrder: string;
  };
  

interface MenuState {
    isOpenModal: boolean;
    currentMode: string;
    currentSelection: TableProps | null;
    confirmEditData: TableProps | null;
    totalsData: any;
    tableData: TableProps[];
    loadingState: { loading: boolean; error: any };
    queryData: queryData;
}

const initialMenuState: MenuState = {
    isOpenModal: false,
    currentMode: "",
    currentSelection: {
        index: 0,
        uuid: "",
        id: 0,
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
        created_at: "",
    },
    confirmEditData: {
        index: 0,
        uuid: "",
        id: 0,
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
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

const jobscrapelistSlice = createSlice({
  name: 'jobscrapelist',
  initialState: initialMenuState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
        state.isOpenModal = action.payload;
    },
    setCurrentMode: (state, action: PayloadAction<string>) => {
        state.currentMode = action.payload;
    },
    setCurrentSelection: (state, action: PayloadAction<TableProps>) => {
        state.currentSelection = action.payload;
    },
    setConfirmEditData: (state, action: PayloadAction<TableProps>) => {
        state.confirmEditData = action.payload;
    },
    setTotalsData: (state, action: PayloadAction<any>) => {
        state.totalsData = action.payload;
    },
    setTableData: (state, action: PayloadAction<TableProps[]>) => {
        state.tableData = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<{ loading: boolean; error: any }>) => {
        state.loadingState = action.payload;
    },
    setQueryData: (state, action: PayloadAction<queryData>) => {
        state.queryData = action.payload;
    }
  },
});

export const {
    setIsOpenModal,
    setCurrentMode,
    setCurrentSelection,
    setConfirmEditData,
    setTotalsData,
    setTableData,
    setLoadingState,
    setQueryData,
  } = jobscrapelistSlice.actions;
export { initialMenuState };
export default jobscrapelistSlice.reducer;