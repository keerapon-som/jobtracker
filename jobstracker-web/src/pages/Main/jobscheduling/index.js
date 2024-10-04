import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import TableJobScheduling from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMenu } from "@/slices/menu";
var JobScheduling = function () {
    var dispatch = useDispatch();
    var CurrentMenu = useSelector(function (state) { return state.menu; });
    useEffect(function () {
        if (CurrentMenu.currentmenu !== "JobScheduling") {
            dispatch(setCurrentMenu("JobScheduling"));
        }
    }, []);
    return (_jsx("div", { className: "pt-16", style: {
            height: "calc(".concat(100, "vh)"), // Example calculation
        }, children: _jsxs("div", { className: "", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "h-16 bg-slate-800 border-blue-400 border text-blue-400 max-w-7xl min-w-sm w-full px-6 pt-3 text-3xl font-bold", children: "Job Scheduling" }) }), _jsx("div", { className: "flex justify-center", children: _jsx("div", { id: "content", className: "bg-blue-300 w-full max-w-7xl mFin-w-sm p-2", children: _jsx("div", { children: _jsx(TableJobScheduling, {}) }) }) })] }) }));
};
export default JobScheduling;
