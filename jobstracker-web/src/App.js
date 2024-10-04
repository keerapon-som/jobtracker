import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from '@/components/navbar/index';
// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import App from './App';
import Dashboard from '@/pages/Main/dashboard/index';
import JobScheduling from '@/pages/Main/jobscheduling/index';
import JobScrapeList from '@/pages/Main/jobscrapelist/index';
// import About from './pages/About';
import NotFound from '@/pages/Notfound';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './store';
// import { increment, decrement } from './slices/counterSlice';
var App = function () {
    // const count = useSelector((state: RootState) => state.counter.value);
    // const dispatch = useDispatch();
    return (_jsx("div", { className: "bg-gray-500", children: _jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/Dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/JobScheduling", element: _jsx(JobScheduling, {}) }), _jsx(Route, { path: "/JobScrapeList", element: _jsx(JobScrapeList, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }) }));
};
export default App;
