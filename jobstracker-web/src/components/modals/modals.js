import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Modal = function (_a) {
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, children = _a.children;
    var closeModal = function () {
        setIsOpen(false);
    };
    return (_jsx("div", { children: isOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50", children: _jsxs("div", { className: "relative rounded-lg shadow bg-gray-800", children: [_jsxs("button", { type: "button", className: "absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white", onClick: closeModal, children: [_jsx("svg", { className: "w-3 h-3", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 14 14", children: _jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" }) }), _jsx("span", { className: "sr-only", children: "Close modal" })] }), children] }) })) }));
};
export default Modal;
