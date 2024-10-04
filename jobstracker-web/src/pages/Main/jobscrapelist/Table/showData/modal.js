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
import { setCurrentMode, setIsOpenModal } from "@/slices/jobscrapelist";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import config from "@/config";
export var DeleteModal = function () {
    var dispatch = useDispatch();
    var Jobscrapelist = useSelector(function (state) { return state.jobscrapelist; });
    var handleSubmitDelete = function () {
        // Handle the edit submission logic here
        var payload = {
            id: Jobscrapelist.currentSelection.id,
            uuid: Jobscrapelist.currentSelection.uuid,
        };
        fetch("".concat(config.APIURL, "/api/jobscrapelist/"), {
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
    return (_jsxs("div", { className: "w-[512px] h-40", children: [_jsxs("div", { children: [_jsx("div", { className: "pt-8 text-lg font-bold px-5", children: "Do you want to delete this job?" }), _jsxs("div", { className: "pt-4 px-5", children: ["Job name: ", Jobscrapelist.currentSelection.jobname] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () {
                            dispatch(setIsOpenModal(false));
                            dispatch(setCurrentMode(""));
                        }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitDelete, className: "mt-2 py-2 px-4 border-yellow-500 border-2 rounded-lg text-white bg-red-500 hover:cursor-pointer hover:bg-red-400", children: "DELETE" })] })] }));
};
export var EditModal = function () {
    var dispatch = useDispatch();
    var Jobscrapelist = useSelector(function (state) { return state.jobscrapelist; });
    var handleSubmitEdit = function () {
        // dispatch(editJob(Jobscrapelist.confirmEditData));
        console.log(Jobscrapelist.confirmEditData);
        var payload = {
            id: Jobscrapelist.confirmEditData.id,
            uuid: Jobscrapelist.confirmEditData.uuid,
            jobname: Jobscrapelist.confirmEditData.jobname,
            getjobsCount: Jobscrapelist.confirmEditData.getjobsCount,
            getjobsDetails: Jobscrapelist.confirmEditData.getjobsDetails,
            getjobsSuperDetails: Jobscrapelist.confirmEditData.getjobsSuperDetails,
        };
        fetch("".concat(config.APIURL, "/api/jobscrapelist"), {
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
    return (_jsxs("div", { className: "w-[512px] h-80", children: [_jsxs("div", { children: [_jsx("div", { className: "pt-8 text-lg font-bold px-5", children: "Do you want to Edit this job?" }), _jsxs("div", { className: "pt-4 px-5", children: [_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Job name:" }), _jsx("span", { className: "ml-4 ".concat(Jobscrapelist.currentSelection.jobname !==
                                            Jobscrapelist.confirmEditData.jobname
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscrapelist.currentSelection.jobname !==
                                            Jobscrapelist.confirmEditData.jobname ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscrapelist.currentSelection.jobname }), " ", _jsx("span", { children: Jobscrapelist.confirmEditData.jobname })] })) : (_jsx("span", { children: Jobscrapelist.currentSelection.jobname })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Count:" }), _jsx("span", { className: "ml-4 ".concat(Jobscrapelist.currentSelection.getjobsCount !==
                                            Jobscrapelist.confirmEditData.getjobsCount
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscrapelist.currentSelection.getjobsCount !==
                                            Jobscrapelist.confirmEditData.getjobsCount ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscrapelist.currentSelection.getjobsCount ? "Yes" : "No" }), " ", _jsx("span", { children: Jobscrapelist.confirmEditData.getjobsCount ? "Yes" : "No" })] })) : (_jsx("span", { children: Jobscrapelist.currentSelection.getjobsCount ? "Yes" : "No" })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Details:" }), _jsx("span", { className: "ml-4 ".concat(Jobscrapelist.currentSelection.getjobsDetails !==
                                            Jobscrapelist.confirmEditData.getjobsDetails
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscrapelist.currentSelection.getjobsDetails !==
                                            Jobscrapelist.confirmEditData.getjobsDetails ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscrapelist.currentSelection.getjobsDetails
                                                        ? "Yes"
                                                        : "No" }), " ", _jsx("span", { children: Jobscrapelist.confirmEditData.getjobsDetails
                                                        ? "Yes"
                                                        : "No" })] })) : (_jsx("span", { children: Jobscrapelist.currentSelection.getjobsDetails ? "Yes" : "No" })) })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Super Details:" }), _jsx("span", { className: "ml-4 ".concat(Jobscrapelist.currentSelection.getjobsSuperDetails !==
                                            Jobscrapelist.confirmEditData.getjobsSuperDetails
                                            ? "text-red-500"
                                            : "text-green-500"), children: Jobscrapelist.currentSelection.getjobsSuperDetails !==
                                            Jobscrapelist.confirmEditData.getjobsSuperDetails ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "line-through", children: Jobscrapelist.currentSelection.getjobsSuperDetails
                                                        ? "Yes"
                                                        : "No" }), " ", _jsx("span", { children: Jobscrapelist.confirmEditData.getjobsSuperDetails
                                                        ? "Yes"
                                                        : "No" })] })) : (_jsx("span", { children: Jobscrapelist.currentSelection.getjobsSuperDetails
                                                ? "Yes"
                                                : "No" })) })] })] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () {
                            dispatch(setIsOpenModal(false));
                            dispatch(setCurrentMode(""));
                        }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitEdit, className: "mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400", children: "EDIT" })] })] }));
};
export var AddModal = function (_a) {
    var formData = _a.formData, setShowConfirmModal = _a.setShowConfirmModal;
    var dispatch = useDispatch();
    var handleSubmitAdd = function () {
        // Handle the edit submission logic here
        var payload = {
            jobname: formData.jobname,
            getjobsCount: formData.getjobsCount,
            getjobsDetails: formData.getjobsDetails,
            getjobsSuperDetails: formData.getjobsSuperDetails,
        };
        fetch("".concat(config.APIURL, "/api/jobscrapelist/"), {
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
    return (_jsxs("div", { className: "w-[512px] h-80", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold pb-5 text-blue-400", children: "Do you want to Add this job?" }), _jsxs("div", { className: "pt-4 px-5", children: [_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Job name:" }), _jsx("span", { className: "ml-4 text-green-500", children: formData.jobname })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Count:" }), _jsx("span", { className: "ml-4 text-green-500", children: formData.getjobsCount ? "Yes" : "No" })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Details:" }), _jsx("span", { className: "ml-4 text-green-500", children: formData.getjobsDetails ? "Yes" : "No" })] }), _jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { className: "font-bold", children: "Get Jobs Super Details:" }), _jsx("span", { className: "ml-4 text-green-500", children: formData.getjobsSuperDetails ? "Yes" : "No" })] })] })] }), _jsxs("div", { className: "justify-end flex mr-4", children: [_jsx("button", { onClick: function () {
                            dispatch(setIsOpenModal(false));
                            dispatch(setCurrentMode(""));
                        }, className: "mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer", children: "CANCEL" }), _jsx("button", { onClick: handleSubmitAdd, className: "mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400", children: "ADD" })] })] }));
};
export var InputForm = function () {
    var _a = useState([]), listnotempty = _a[0], setListNotEmpty = _a[1];
    var _b = useState({
        jobname: "",
        getjobsCount: false,
        getjobsDetails: false,
        getjobsSuperDetails: false,
    }), formData = _b[0], setFormData = _b[1];
    var _c = useState(false), showConfirmModal = _c[0], setShowConfirmModal = _c[1];
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value, type = _b.type;
        var checked = e.target.checked;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = type === "checkbox" ? checked : value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var listnotempty = [];
        if (formData.jobname === "") {
            listnotempty.push("jobname");
        }
        if (listnotempty.length > 0) {
            setListNotEmpty(listnotempty);
            return;
        }
        setShowConfirmModal(true);
    };
    return (_jsx("div", { className: "w-[512px] h-full p-6 bg-slate-800 rounded-lg shadow-md", children: showConfirmModal ? (_jsx(AddModal, { formData: formData, setShowConfirmModal: setShowConfirmModal })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-2xl font-bold pb-5 text-blue-400", children: "Add Job Name to scrape" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "mb-1 font-semibold", children: "Job Name:" }), _jsx("input", { type: "text", name: "jobname", value: formData.jobname, onChange: handleChange, className: "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ".concat(listnotempty.includes("jobname") && "border-red-500", " ") }), listnotempty.includes("jobname") ? (_jsx("label", { className: "font-semibold text-red-400", children: "This field cannot be empty" })) : null] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "getjobsCount", checked: formData.getjobsCount, onChange: handleChange, className: "mr-2" }), _jsx("label", { className: "font-semibold", children: "Get Jobs Count" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "getjobsDetails", checked: formData.getjobsDetails, onChange: handleChange, className: "mr-2" }), _jsx("label", { className: "font-semibold", children: "Get Jobs Details" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "getjobsSuperDetails", checked: formData.getjobsSuperDetails, onChange: handleChange, className: "mr-2" }), _jsx("label", { className: "font-semibold", children: "Get Jobs Super Details" })] }), _jsx("button", { type: "submit", className: "w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500", children: "Submit" })] })] })) }));
};
