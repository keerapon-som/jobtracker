var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import PageSelect from "./PageSelect";
import ShowingData from "./showData";
import config from "@/config";
import { CSSTransition } from "react-transition-group";
import "./transitions.css"; // Import the CSS file for transitions
import { jsonToQueryString } from "@/function/jsonToQueryString";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModal, setTotalsData, setLoadingState, setTableData, setQueryData, } from "@/slices/jobscheduling";
import Modal from "@/components/modals/modals";
import { DeleteModal, EditModal, InputForm } from "./showData/modal";
var Table = function () {
    var dispatch = useDispatch();
    var Jobscheduling = useSelector(function (state) { return state.jobscheduling; });
    var abortControllerRef = useRef(null);
    var location = useLocation();
    var searchParams = useSearchParams()[0];
    var navigate = useNavigate();
    var handlenextpage = function () {
        if (Jobscheduling.queryData.page * Jobscheduling.queryData.pagesize >=
            Jobscheduling.totalsData) {
            return;
        }
        var UpdateQueryData = __assign(__assign({}, Jobscheduling.queryData), { page: Jobscheduling.queryData.page + 1 });
        dispatch(setQueryData(UpdateQueryData));
        // updatelocation
        navigate("".concat(location.pathname, "?").concat(jsonToQueryString(UpdateQueryData)));
    };
    var handleprevpage = function () {
        if (Jobscheduling.queryData.page === 1) {
            return;
        }
        var UpdateQueryData = __assign(__assign({}, Jobscheduling.queryData), { page: Jobscheduling.queryData.page - 1 });
        dispatch(setQueryData(UpdateQueryData));
        // updatelocation
        navigate("".concat(location.pathname, "?").concat(jsonToQueryString(UpdateQueryData)));
    };
    var handleFetchJobscheduling = function (abortController) {
        // Abort the previous request if it exists
        var newqueryData = __assign({}, Jobscheduling.queryData);
        searchParams.forEach(function (value, key) {
            console.log(key, value);
            if (key === "page" || key === "pagesize") {
                newqueryData[key] = parseInt(value);
            }
        });
        dispatch(setQueryData(newqueryData));
        fetch("".concat(config.APIURL, "/api/jobscheduling?").concat(jsonToQueryString(newqueryData)), { signal: abortController.signal })
            .then(function (response) {
            dispatch(setLoadingState({ loading: true, error: null }));
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
            .then(function (data) {
            if (data.data === null) {
                data.data = [];
            }
            dispatch(setTableData(data.data));
            dispatch(setTotalsData(data.totals));
            dispatch(setLoadingState({ loading: false, error: null }));
        })
            .catch(function (error) {
            dispatch(setLoadingState({ loading: false, error: error }));
        });
    };
    useEffect(function () {
        var abortController = new AbortController();
        abortControllerRef.current = abortController;
        handleFetchJobscheduling(abortController);
        return function () {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [location.search]); // Empty dependency array means this effect runs once on mount
    return (_jsxs("div", { className: "text-slate-300  shadow-md sm:rounded-lg bg-gray-800 border-gray-500 border", children: [_jsxs(Modal, { isOpen: Jobscheduling.isOpenModal, setIsOpen: function (isOpen) { return dispatch(setIsOpenModal(isOpen)); }, children: [Jobscheduling.currentMode == "delete" ? _jsx(DeleteModal, {}) : null, Jobscheduling.currentMode == "edit" ? _jsx(EditModal, {}) : null, Jobscheduling.currentMode == "add" ? _jsx(InputForm, {}) : null] }), _jsx(Filter, {}), _jsxs("div", { className: "relative overflow-auto min-h-40", style: {
                    height: "calc(".concat(100, "vh - 278px)"), // Example calculation
                }, children: [_jsx(CSSTransition, { in: Jobscheduling.loadingState.loading ||
                            Jobscheduling.loadingState.error != null, timeout: 300, classNames: "fade", unmountOnExit: true, children: _jsx("div", { className: "bg-white bg-opacity-70 z-50 flex items-center justify-center max-w-7xl min-w-sm ", style: {
                                height: "calc(".concat(100, "vh - 358px)"), // Example calculation
                            }, children: Jobscheduling.loadingState.loading ? (_jsx("div", { className: "spinner" })) : (Jobscheduling.loadingState.error != null && (_jsx("div", { className: "font-bold text-lg text-red-500", children: "ERROR Unable to load data" }))) }) }), _jsx(CSSTransition, { in: !Jobscheduling.loadingState.loading &&
                            Jobscheduling.loadingState.error == null, timeout: 300, classNames: "fade", unmountOnExit: true, children: _jsx(ShowingData, { TableData: Jobscheduling.tableData }) }), _jsx(CSSTransition, { in: Jobscheduling.tableData.length === 0, timeout: 300, classNames: "fade", unmountOnExit: true, children: _jsx("div", { className: "bg-opacity-90 z-50 flex items-center justify-center max-w-7xl min-w-sm ", style: {
                                height: "calc(".concat(100, "vh - 358px)"), // Example calculation
                            }, children: _jsx("div", { className: "font-bold text-lg text-red-500", children: "No data found" }) }) })] }), _jsx(PageSelect, { handlenextpage: handlenextpage, handleprevpage: handleprevpage, page: Jobscheduling.queryData.page, pagesize: Jobscheduling.queryData.pagesize, totals: Jobscheduling.totalsData })] }));
};
export default Table;
