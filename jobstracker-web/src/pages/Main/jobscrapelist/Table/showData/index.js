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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import App from './App';
import "./index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode, setIsOpenModal, setCurrentSelection, setConfirmEditData, setQueryData, } from "@/slices/jobscrapelist";
import { useLocation, useNavigate } from "react-router-dom";
import { jsonToQueryString } from "@/function/jsonToQueryString";
var ShowingData = function (_a) {
    var _b, _c;
    var TableData = _a.TableData;
    var dispatch = useDispatch();
    var queryData = useSelector(function (state) { return state.jobscheduling.queryData; });
    var navigate = useNavigate();
    var location = useLocation();
    var currentSortDesc = ((_b = new URLSearchParams(location.search).get("sorting")) === null || _b === void 0 ? void 0 : _b.split("+")[1]) === "desc";
    var currentSortBy = (_c = new URLSearchParams(location.search).get("sorting")) === null || _c === void 0 ? void 0 : _c.split("+")[0];
    var handleclickheader = function (header) {
        var _a;
        var newsorting = __assign({}, queryData.sorting);
        // Ensure newsorting.sorting is initialized
        var currentSortOrderByParams = (_a = new URLSearchParams(location.search).get("sorting")) === null || _a === void 0 ? void 0 : _a.split("+")[1];
        newsorting.sortBy = header;
        newsorting.sortOrder = currentSortOrderByParams === "asc" ? "desc" : "asc";
        dispatch(setQueryData(__assign(__assign({}, queryData), { sorting: newsorting })));
        // Update location
        navigate("".concat(location.pathname, "?").concat(jsonToQueryString(__assign(__assign({}, queryData), { sorting: newsorting }))));
    };
    var _d = useState({}), editMode = _d[0], setEditMode = _d[1];
    var _e = useState({
        index: 0,
        uuid: "",
        id: 0,
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
        getjobsSuperDetails: false,
        created_at: "",
    }), editData = _e[0], setEditData = _e[1];
    var handleConfirmEdit = function (data) {
        var _a;
        dispatch(setIsOpenModal(true));
        dispatch(setCurrentMode("edit"));
        dispatch(setConfirmEditData(data));
        setEditMode(__assign(__assign({}, editMode), (_a = {}, _a[data.id] = false, _a)));
    };
    var handleDelete = function (data) {
        dispatch(setIsOpenModal(true));
        dispatch(setCurrentMode("delete"));
        dispatch(setCurrentSelection(data));
    };
    var handleEdit = function (data) {
        var _a;
        dispatch(setCurrentSelection(data));
        setEditData(data);
        setEditMode((_a = {}, _a[data.id] = true, _a));
    };
    return (_jsx("div", { children: _jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [_jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "w-2 px-6 py-3 border-gray-500 border hover:cursor-pointer hover:bg-slate-600 hover:text-white", children: _jsx("div", { className: "flex place-items-center ", children: "Index" }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 w-2 px-6 py-3 border-gray-500 border", onClick: function () { return handleclickheader("id"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "id" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "id" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "ID"] }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-32 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("jobname"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "jobname" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "jobname" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "Job Name"] }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 py-2 border-gray-500 border", onClick: function () { return handleclickheader("getjobsCount"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "getjobsCount" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "getjobsCount" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "Get Jobs Count"] }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("getjobsDetails"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "getjobsDetails" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "getjobsDetails" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "Get Jobs Details"] }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("getjobsSuperDetails"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "getjobsSuperDetails" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "getjobsSuperDetails" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "Get Jobs Super Details"] }) }), _jsx("th", { scope: "col", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("created_at"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "created_at" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "created_at" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "Created at"] }) }), _jsx("th", { scope: "col", className: "  px-2 py-3 border-gray-500 border", children: "Action" })] }) }), _jsx("tbody", { children: TableData.map(function (task) { return (_jsxs("tr", { className: "border-b bg-gray-800 border-gray-500 hover:bg-slate-700 hover:text-gray-200", children: [_jsx("td", { className: "px-6 py-4 border-gray-500 border", children: task.index }), _jsx("td", { className: "px-2 py-4 border-gray-500 border", children: task.id }), _jsx("td", { className: "min-w-24 px-2 py-4 border-gray-500 border", children: editMode[task.id] ? (_jsx("input", { type: "text", value: editData.jobname, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { jobname: e.target.value }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : (task.jobname) }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border ".concat(task.getjobsCount ? "text-green-400" : "text-red-500"), children: editMode[task.id] ? (_jsx("input", { type: "checkbox", checked: editData.getjobsCount, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { getjobsCount: !editData.getjobsCount }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : task.getjobsCount ? ("Yes") : ("No") }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border  ".concat(task.getjobsDetails ? "text-green-400" : "text-red-500"), children: editMode[task.id] ? (_jsx("input", { type: "checkbox", checked: editData.getjobsDetails, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { getjobsDetails: !editData.getjobsDetails }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : task.getjobsDetails ? "Yes" : "No" }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border  ".concat(task.getjobsSuperDetails ? "text-green-400" : "text-red-500"), children: editMode[task.id] ? (_jsx("input", { type: "checkbox", checked: editData.getjobsSuperDetails, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { getjobsSuperDetails: !editData.getjobsSuperDetails }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : task.getjobsSuperDetails ? "Yes" : "No" }), _jsx("td", { className: "px-2 py-4 border-gray-500 border ", children: task.created_at }), _jsx("td", { className: "min-w-20 px-2 py-2  flex items-center", children: !editMode[task.id] ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () { return handleEdit(task); }, className: "hover:text-blue-400 border border-blue-400 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2", children: "Edit" }), _jsx("button", { onClick: function () { return handleDelete(task); }, className: "hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2", children: "Delete" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () {
                                                setEditMode({});
                                                setEditData({
                                                    index: 0,
                                                    uuid: "",
                                                    id: 0,
                                                    jobname: "",
                                                    getjobsCount: false,
                                                    getjobsDetails: false,
                                                    getjobsSuperDetails: false,
                                                    created_at: "",
                                                });
                                            }, className: "hover:text-gray-200 border border-gray-200 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2", children: "Exit" }), _jsx("button", { onClick: function () { return handleConfirmEdit(editData); }, className: "hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2", children: "Confirm" })] })) })] }, task.id)); }) })] }) }));
};
export default ShowingData;
