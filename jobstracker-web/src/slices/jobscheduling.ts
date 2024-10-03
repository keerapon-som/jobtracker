// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
// const [currentMode, setCurrentMode] = useState<string>('');

type TableProps = {
    index: number;
    id: number;
    uuid: string;
    taskname: string;
    tasktype: string;
    taskstatus: string;
    taskdescription: string;
    hours_trigger: number;
    minute_trigger: number;
    list_weekdays_trigger: Array<string>;
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
    currentSelection: TableProps;
    confirmEditData: TableProps;
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
        id: 0,
        uuid: "",
        taskname: "",
        tasktype: "",
        taskstatus: "",
        taskdescription: "",
        hours_trigger: 0,
        minute_trigger: 0,
        list_weekdays_trigger: [],
        created_at: "",
    },
    confirmEditData: {
        index: 0,
        id: 0,
        uuid: "",
        taskname: "",
        tasktype: "",
        taskstatus: "",
        taskdescription: "",
        hours_trigger: 0,
        minute_trigger: 0,
        list_weekdays_trigger: [],
        created_at: "",
    },
    totalsData: null,
    tableData: [],
    loadingState: { loading: false, error: null },
    queryData: {
        page: 1,
        pagesize: 50,
        sorting: {
            sortBy: "id",
            sortOrder: "asc",
        },
    },
};

const jobschedulingSlice = createSlice({
  name: 'jobscheduling',
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
  } = jobschedulingSlice.actions;
export { initialMenuState };
export default jobschedulingSlice.reducer;