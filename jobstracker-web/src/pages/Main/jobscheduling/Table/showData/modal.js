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
import { setCurrentMode, setIsOpenModal } from "@/slices/jobscheduling";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config";
import { useState } from "react";
export var DeleteModal = function () {
    var dispatch = useDispatch();
    var jobscheduling = useSelector(function (state) { return state.jobscheduling; });
    var handleSubmitDelete = function () {
        // Handle the edit submission logic here
        var payload = {
            id: jobscheduling.currentSelection.id,
            uuid: jobscheduling.currentSelection.uuid,
        };
        fetch("".concat(config.APIURL, "/api/jobscheduling/"), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            dispatch(setIsOpenModal(false));
            dispatch(setCurrentMode(""));
            return response.json();
        })
            .then(function (data) {
            if (data.data === null) {
                data.data = [];
            }
        })
            .catch(function (error) {
            console.error("Error:", error);
        });
    };
    return (_jsxs("div", { className: "w-[512px] h-40", children: [_jsxs("div", { children: [_jsx("div", { className: "pt-8 text-lg font-bold px-5", children: "Do you want to delete this task?" }), _jsxs("div", { className: "pt-4 px-5", children: ["Task name: ", jobscheduling.currentSelection.taskname] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () {
                            dispatch(setIsOpenModal(false));
                            dispatch(setCurrentMode(""));
                        }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitDelete, className: "mt-2 py-2 px-4 border-yellow-500 border-2 rounded-lg text-white bg-red-500 hover:cursor-pointer hover:bg-red-400", children: "DELETE" })] })] }));
};
export var EditModal = function () {
    var dispatch = useDispatch();
    var Jobscheduling = useSelector(function (state) { return state.jobscheduling; });
    var handleSubmitEdit = function () {
        // dispatch(editJob(Jobscrapelist.confirmEditData));
        console.log(Jobscheduling.confirmEditData);
        var payload = {
            id: Jobscheduling.confirmEditData.id,
            uuid: Jobscheduling.confirmEditData.uuid,
            taskname: Jobscheduling.confirmEditData.taskname,
            tasktype: Jobscheduling.confirmEditData.tasktype,
            taskstatus: Jobscheduling.confirmEditData.taskstatus,
            taskdescription: Jobscheduling.confirmEditData.taskdescription,
            hours_trigger: Jobscheduling.confirmEditData.hours_trigger,
            minute_trigger: Jobscheduling.confirmEditData.minute_trigger,
            list_weekdays_trigger: Jobscheduling.confirmEditData.list_weekdays_trigger,
        };
        fetch("".concat(config.APIURL, "/api/jobscheduling"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
            //   setStateLoadData({ loading: true, error: null });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            dispatch(setIsOpenModal(false));
            dispatch(setCurrentMode(""));
            return response.json();
        })
            .then(function (data) {
            if (data.data === null) {
                data.data = [];
            }
            //   setTableData(data.data);
            //   setTotalsData(data.totals);
            //   setStateLoadData({ loading: false, error: null });
        })
            .catch(function (error) {
            //   setStateLoadData({ loading: false, error });
        });
    };
    return (_jsxs("div", { className: "w-[512px] h-[450px]", children: [_jsxs("div", { children: [_jsx("div", { className: "pt-8 text-lg font-bold px-5", children: "Do you want to Edit this task?" }), _jsxs("div", { className: "pt-4 px-5", children: [_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task name:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.taskname !==
                                            Jobscheduling.confirmEditData.taskname
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.taskname !==
                                            Jobscheduling.confirmEditData.taskname ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.taskname }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.taskname })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.taskname })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task type:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.tasktype !==
                                            Jobscheduling.confirmEditData.tasktype
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.tasktype !==
                                            Jobscheduling.confirmEditData.tasktype ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.tasktype }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.tasktype })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.tasktype })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task status:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.taskstatus !==
                                            Jobscheduling.confirmEditData.taskstatus
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.taskstatus !==
                                            Jobscheduling.confirmEditData.taskstatus ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.taskstatus }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.taskstatus })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.taskstatus })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task description:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.taskdescription !==
                                            Jobscheduling.confirmEditData.taskdescription
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.taskdescription !==
                                            Jobscheduling.confirmEditData.taskdescription ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.taskdescription }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.taskdescription })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.taskdescription })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "hours trigger:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.hours_trigger !==
                                            Jobscheduling.confirmEditData.hours_trigger
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.hours_trigger !==
                                            Jobscheduling.confirmEditData.hours_trigger ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.hours_trigger }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.hours_trigger })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.hours_trigger })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "minute trigger:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.minute_trigger !==
                                            Jobscheduling.confirmEditData.minute_trigger
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.minute_trigger !==
                                            Jobscheduling.confirmEditData.minute_trigger ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.minute_trigger }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.minute_trigger })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.minute_trigger })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "list weekdays trigger:" }), _jsx("span", { className: "ml-4 ".concat(Jobscheduling.currentSelection.list_weekdays_trigger !==
                                            Jobscheduling.confirmEditData.list_weekdays_trigger
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscheduling.currentSelection.list_weekdays_trigger !==
                                            Jobscheduling.confirmEditData.list_weekdays_trigger ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscheduling.currentSelection.list_weekdays_trigger }), " ", _jsx("span", { children: Jobscheduling.confirmEditData.list_weekdays_trigger })] })) : (_jsx("span", { children: Jobscheduling.currentSelection.list_weekdays_trigger })) })] })] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () {
                            dispatch(setIsOpenModal(false));
                            dispatch(setCurrentMode(""));
                        }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitEdit, className: "mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400", children: "EDIT" })] })] }));
};
export var AddModal = function (_a) {
    var formData = _a.formData, setShowConfirmModal = _a.setShowConfirmModal;
    var dispatch = useDispatch();
    var handleSubmitAdd = function () {
        var payload = {
            taskname: formData.taskname,
            tasktype: formData.tasktype,
            taskstatus: formData.taskstatus,
            taskdescription: formData.taskdescription,
            hours_trigger: formData.hours_trigger,
            minute_trigger: formData.minute_trigger,
            list_weekdays_trigger: formData.list_weekdays_trigger,
        };
        fetch("".concat(config.APIURL, "/api/jobscheduling"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            dispatch(setIsOpenModal(false));
            dispatch(setCurrentMode(""));
            return response.json();
        })
            .then(function (data) {
            if (data.data === null) {
                data.data = [];
            }
        })
            .catch(function (error) {
            console.error("Error:", error);
        });
    };
    return (_jsxs("div", { className: "w-[512px] h-[450px]", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold pb-5 text-blue-400", children: "Do you want to Add this task?" }), _jsxs("div", { className: "pt-4 px-5", children: [_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task name:" }), _jsx("span", { className: "ml-4", children: formData.taskname })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task type:" }), _jsx("span", { className: "ml-4", children: formData.tasktype })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task status:" }), _jsx("span", { className: "ml-4", children: formData.taskstatus })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "task description:" }), _jsx("span", { className: "ml-4", children: formData.taskdescription })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "hours trigger:" }), _jsx("span", { className: "ml-4", children: formData.hours_trigger })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "minute trigger:" }), _jsx("span", { className: "ml-4", children: formData.minute_trigger })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "list weekdays trigger:" }), _jsx("span", { className: "ml-4", children: formData.list_weekdays_trigger.join(", ") })] })] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () { return setShowConfirmModal(false); }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitAdd, className: "mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400", children: "Add" })] })] }));
};
export var InputForm = function () {
    var _a = useState([]), listnotempty = _a[0], setListNotEmpty = _a[1];
    var _b = useState({
        taskname: "",
        tasktype: "getjobsCount",
        taskstatus: "Active",
        taskdescription: "",
        hours_trigger: 1,
        minute_trigger: 1,
        list_weekdays_trigger: [],
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(false), showConfirmModal = _c[0], setShowConfirmModal = _c[1];
    var dispatch = useDispatch();
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = name === "hours_trigger" || name === "minute_trigger"
            ? parseInt(value, 10)
            : value, _a)));
    };
    var handleMultiSelectChange = function (e) {
        var selectedOption = e.target.value;
        setFormData(function (prevFormData) {
            var newList = prevFormData.list_weekdays_trigger.includes(selectedOption)
                ? prevFormData.list_weekdays_trigger.filter(function (day) { return day !== selectedOption; })
                : __spreadArray(__spreadArray([], prevFormData.list_weekdays_trigger, true), [selectedOption], false);
            return __assign(__assign({}, prevFormData), { list_weekdays_trigger: newList });
        });
    };
    var handleSubmit = function (e) {
        //validate empty fields
        e.preventDefault();
        var listnotempty = [];
        if (formData.taskname === "") {
            listnotempty.push("Task Name");
        }
        if (formData.list_weekdays_trigger.length === 0) {
            listnotempty.push("List Weekdays Trigger");
        }
        if (listnotempty.length > 0) {
            setListNotEmpty(listnotempty);
            return;
        }
        setShowConfirmModal(true);
    };
    return (_jsx("div", { className: "pt-10  w-[300px] h-[500px] md:w-[512px] md:h-[600px] lg:w-[512px] lg:h-[700px] xl:w-[512px] xl:h-[750px] overflow-auto p-6 bg-slate-800 rounded-lg shadow-md", children: showConfirmModal ? (_jsx(AddModal, { formData: formData, setShowConfirmModal: setShowConfirmModal })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-2xl font-bold pb-5 text-blue-400", children: "Add Job Schedule" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Task Name:" }), _jsx("input", { type: "text", name: "taskname", value: formData.taskname, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ".concat(listnotempty.includes("Task Name") && "border-red-500") }), listnotempty.includes("Task Name") ? (_jsx("label", { className: "font-semibold text-red-400", children: "This field cannot be empty" })) : null] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Task Type:" }), _jsxs("select", { name: "tasktype", value: formData.tasktype, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white", children: [_jsx("option", { value: "getjobsCount", children: "getjobsCount" }), _jsx("option", { value: "getjobsdetails", children: "getjobsdetails" }), _jsx("option", { value: "getjobsSuperDetails", children: "getjobsSuperDetails" })] })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Task Status:" }), _jsxs("select", { name: "taskstatus", value: formData.taskstatus, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white", children: [_jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Deactive", children: "Deactive" })] })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Task Description:" }), _jsx("textarea", { name: "taskdescription", value: formData.taskdescription, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white", rows: 4 })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Hours Trigger:" }), _jsx("select", { name: "hours_trigger", value: formData.hours_trigger, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white", children: Array.from({ length: 24 }, function (_, i) { return i + 1; }).map(function (hour) { return (_jsx("option", { value: hour, children: hour }, hour)); }) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Minute Trigger:" }), _jsx("select", { name: "minute_trigger", value: formData.minute_trigger, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white", children: Array.from({ length: 59 }, function (_, i) { return i + 1; }).map(function (minute) { return (_jsx("option", { value: minute, children: minute }, minute)); }) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "List Weekdays Trigger:" }), _jsx("select", { name: "list_weekdays_trigger", multiple: true, value: formData.list_weekdays_trigger, onChange: handleMultiSelectChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ".concat(listnotempty.includes("List Weekdays Trigger") &&
                                        "border-red-500"), children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(function (day) { return (_jsx("option", { value: day, children: day }, day)); }) }), listnotempty.includes("List Weekdays Trigger") ? (_jsx("label", { className: "font-semibold text-red-400", children: "This field cannot be empty" })) : null] }), _jsx("button", { type: "submit", className: "w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500", children: "Submit" })] })] })) }));
};
