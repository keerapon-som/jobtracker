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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import App from './App';
import "./index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMode, setIsOpenModal, setCurrentSelection, setConfirmEditData, setQueryData, } from "@/slices/jobscheduling";
import { useLocation, useNavigate } from "react-router-dom";
import { jsonToQueryString } from "@/function/jsonToQueryString";
var weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
    }), editData = _e[0], setEditData = _e[1];
    var handleConfirmEdit = function (data) {
        var _a;
        dispatch(setIsOpenModal(true));
        dispatch(setCurrentMode("edit"));
        dispatch(setConfirmEditData(data));
        setEditMode(__assign(__assign({}, editMode), (_a = {}, _a[data.id] = false, _a)));
    };
    var handleDelete = function (data) {
        dispatch(setCurrentMode(""));
        dispatch(setIsOpenModal(true));
        dispatch(setCurrentMode("delete"));
        dispatch(setCurrentSelection(data));
    };
    var handleEdit = function (data) {
        var _a;
        dispatch(setCurrentMode(""));
        dispatch(setCurrentSelection(data));
        setEditData(data);
        setEditMode((_a = {}, _a[data.id] = true, _a));
    };
    return (_jsx("div", { children: _jsxs("table", { className: "w-full text-sm text-left  text-gray-400", children: [_jsx("thead", { className: "text-xs uppercase  bg-gray-700 text-gray-400", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", id: "index", className: "w-2 px-6 py-3 border-gray-500 border hover:cursor-pointer hover:bg-slate-600 hover:text-white", onClick: function () { return handleclickheader("index"); }, children: _jsx("div", { className: "flex place-items-center ", children: "Index" }) }), _jsx("th", { scope: "col", id: "id", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 w-2 px-6 py-3 border-gray-500 border", onClick: function () { return handleclickheader("id"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "id" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "id" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "ID"] }) }), _jsx("th", { scope: "col", id: "taskname", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-32 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("taskname"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "taskname" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "taskname" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "taskname"] }) }), _jsx("th", { scope: "col", id: "tasktype", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 py-2 border-gray-500 border", onClick: function () { return handleclickheader("tasktype"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "tasktype" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "tasktype" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "tasktype"] }) }), _jsx("th", { scope: "col", id: "taskstatus", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("taskstatus"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "taskstatus" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "taskstatus" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "taskstatus"] }) }), _jsx("th", { scope: "col", id: "taskdescription", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("taskdescription"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "taskdescription" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "taskdescription" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "taskdescription"] }) }), _jsx("th", { scope: "col", id: "hours_trigger", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("hours_trigger"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "hours_trigger" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "hours_trigger" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "hours_trigger"] }) }), _jsx("th", { scope: "col", id: "minute_trigger", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("minute_trigger"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "minute_trigger" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "minute_trigger" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "minute_trigger"] }) }), _jsx("th", { scope: "col", id: "list_weekdays_trigger", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("list_weekdays_trigger"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "list_weekdays_trigger" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "list_weekdays_trigger" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "list_weekdays_trigger"] }) }), _jsx("th", { scope: "col", id: "created_at", className: "hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border", onClick: function () { return handleclickheader("created_at"); }, children: _jsxs("div", { className: "flex place-items-center ", children: [(currentSortBy == "created_at" && currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortDownIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortDownIconTitle" }), _jsx("path", { d: "M11 9H17" }), _jsx("path", { d: "M11 5H19" }), _jsx("path", { d: "M11 13H15" }), _jsx("path", { d: "M10 17L7 20L4 17" }), _jsx("path", { d: "M7 5V19" })] }) : null, (currentSortBy == "created_at" && !currentSortDesc) ? _jsxs("svg", { "aria-labelledby": "sortUpIconTitle", color: "#befaf8", fill: "none", height: "24px", stroke: "#befaf8", strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", viewBox: "0 0 24 24", width: "48px", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("title", { id: "sortUpIconTitle" }), _jsx("path", { d: "M11 16H17" }), _jsx("path", { d: "M11 20H19" }), _jsx("path", { d: "M11 12H15" }), _jsx("path", { d: "M4 8L7 5L10 8" }), _jsx("path", { d: "M7 20L7 6" })] }) : null, "created_at"] }) }), _jsx("th", { scope: "col", className: "  px-2 py-3 border-gray-500 border", children: "Action" })] }) }), _jsx("tbody", { children: TableData.map(function (task) { return (_jsxs("tr", { className: "border-b bg-gray-800 border-gray-500 hover:bg-slate-700 hover:text-gray-200", children: [_jsx("td", { className: "px-6 py-4 border-gray-500 border", children: task.index }), _jsx("td", { className: "px-2 py-4 border-gray-500 border", children: task.id }), _jsx("td", { className: "min-w-52 px-2 py-4 border-gray-500 border", children: editMode[task.id] ? (_jsx("input", { type: "text", value: editData.taskname, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { taskname: e.target.value }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : (task.taskname) }), _jsx("td", { className: "min-w-52 px-2 py-4 border-gray-500 border ", children: editMode[task.id] ? (_jsxs("select", { value: editData.tasktype, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { tasktype: e.target.value }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md", children: [_jsx("option", { value: "getjobsCount", children: "getjobsCount" }), _jsx("option", { value: "getjobsDetails", children: "getjobsDetails" }), _jsx("option", { value: "getjobsSuperDetails", children: "getjobsSuperDetails" })] })) : (task.tasktype) }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border ", children: editMode[task.id] ? (_jsxs("select", { value: editData.taskstatus, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { taskstatus: e.target.value }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md", children: [_jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Deactive", children: "Deactive" })] })) : (task.taskstatus) }), _jsx("td", { className: "px-2 py-4 border-gray-500 border ", children: editMode[task.id] ? (_jsx("textarea", { value: editData.taskdescription, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { taskdescription: e.target.value }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md" })) : (task.taskdescription) }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border", children: editMode[task.id] ? (_jsx("select", { value: editData.hours_trigger, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { hours_trigger: parseInt(e.target.value, 10) }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md", children: Array.from({ length: 24 }, function (_, i) { return i + 1; }).map(function (hour) { return (_jsx("option", { value: hour, children: hour }, hour)); }) })) : (task.hours_trigger) }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border", children: editMode[task.id] ? (_jsx("select", { value: editData.minute_trigger, onChange: function (e) {
                                        return setEditData(__assign(__assign({}, editData), { minute_trigger: parseInt(e.target.value, 10) }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md", children: Array.from({ length: 59 }, function (_, i) { return i + 1; }).map(function (minute) { return (_jsx("option", { value: minute, children: minute }, minute)); }) })) : (task.minute_trigger) }), _jsx("td", { className: "min-w-20 px-2 py-4 border-gray-500 border", children: editMode[task.id] ? (_jsx("select", { multiple: true, value: editData.list_weekdays_trigger, onChange: function (e) {
                                        var selectedOptions = Array.from(e.target.selectedOptions, function (option) { return option.value; });
                                        var newSelection = __spreadArray([], editData.list_weekdays_trigger, true);
                                        selectedOptions.forEach(function (option) {
                                            var index = newSelection.indexOf(option);
                                            if (index > -1) {
                                                // Remove the option if it's already selected
                                                newSelection.splice(index, 1);
                                            }
                                            else {
                                                // Add the option if it's not selected
                                                newSelection.push(option);
                                            }
                                        });
                                        setEditData(__assign(__assign({}, editData), { list_weekdays_trigger: newSelection }));
                                    }, className: "text-black w-full px-2 py-1 border rounded-md", children: weekdays.map(function (day) { return (_jsx("option", { value: day, children: day }, day)); }) })) : (task.list_weekdays_trigger.join(", ")) }), _jsx("td", { className: "px-2 py-4 border-gray-500 border ", children: task.created_at }), _jsx("td", { className: "min-w-20 px-2 py-4 flex items-center", children: !editMode[task.id] ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () { return handleEdit(task); }, className: "hover:text-blue-400 border border-blue-400 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2", children: "Edit" }), _jsx("button", { onClick: function () { return handleDelete(task); }, className: "hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2", children: "Delete" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () {
                                                setEditMode({});
                                                setEditData({
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
                                                });
                                            }, className: "hover:text-gray-200 border border-gray-200 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2", children: "Exit" }), _jsx("button", { onClick: function () { return handleConfirmEdit(editData); }, className: "hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2", children: "Confirm" })] })) })] }, task.id)); }) })] }) }));
};
export default ShowingData;
