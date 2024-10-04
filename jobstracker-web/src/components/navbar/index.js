import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenu, setIsMobileMode } from '../../slices/menu';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
export function Navbar() {
    var navigate = useNavigate();
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState(false), isProfileMenuOpen = _b[0], setIsProfileMenuOpen = _b[1];
    var toggleProfileMenu = function () {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Initial check for mobile mode
    var dispatch = useDispatch();
    var CurrentMenu = useSelector(function (state) { return state.menu; });
    var HandleClickMenu = function (e) {
        var menuId = e.currentTarget.id;
        dispatch(setCurrentMenu(menuId));
        navigate('/' + menuId);
    };
    var getMenuClass = function (menuId, mode) {
        if (mode === 'mobile') {
            return CurrentMenu.currentmenu === menuId
                ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer";
        }
        else {
            return CurrentMenu.currentmenu === menuId
                ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer';
        }
    };
    var buttonProfileRef = useRef(null);
    var buttonNavRef = useRef(null);
    useEffect(function () {
        function handleClickOutside(event) {
            if (buttonProfileRef.current && !buttonProfileRef.current.contains(event.target)) {
                // Perform the function when clicked outside
                setIsProfileMenuOpen(false);
            }
        }
        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen, toggleProfileMenu]);
    useEffect(function () {
        function handleClickOutside(event) {
            if (buttonNavRef.current && !buttonNavRef.current.contains(event.target)) {
                // Perform the function when clicked outside
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen]);
    useEffect(function () {
        if (isOpen == true && window.innerWidth >= 640) {
            setIsOpen(false);
        }
        var handleResize = function () {
            dispatch(setIsMobileMode(window.innerWidth < 640));
            // setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        // Cleanup event listener on component unmount
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);
    return (_jsx(_Fragment, { children: _jsxs("nav", { className: "bg-gray-800 top-0", children: [_jsx("div", { className: "fixed h-16 px-2 sm:px-6 lg:px-8 bg-gray-800 w-screen z-20", children: _jsxs("div", { className: "relative flex h-16 items-center justify-between", children: [_jsx("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden", children: _jsxs("button", { onClick: function () { return setIsOpen(!isOpen); }, type: "button", className: "relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white", "aria-controls": "mobile-menu", "aria-expanded": isOpen ? "true" : "false", ref: buttonNavRef, children: [_jsx("span", { className: "sr-only", children: "Open main menu" }), _jsx("svg", { className: "block h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) })] }) }), _jsxs("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start", children: [_jsx("div", { className: "hidden sm:ml-6 sm:block", children: _jsxs("div", { className: "flex space-x-4", children: [_jsx("a", { onClick: HandleClickMenu, id: "Dashboard", className: getMenuClass('Dashboard', 'pc'), "aria-current": "page", children: "Dashboard" }), _jsx("a", { onClick: HandleClickMenu, id: "JobScheduling", className: getMenuClass('JobScheduling', 'pc'), children: "Job Scheduling" }), _jsx("a", { onClick: HandleClickMenu, id: "JobScrapeList", className: getMenuClass('JobScrapeList', 'pc'), children: "Job Scrape List" })] }) }), _jsx("div", { className: "ml-auto", children: _jsxs("div", { className: "ml-3 z-50", children: [_jsx("div", { children: _jsxs("button", { type: "button", className: "relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800", id: "user-menu-button", "aria-expanded": isProfileMenuOpen ? "true" : "false", "aria-haspopup": "true", onClick: toggleProfileMenu, ref: buttonProfileRef, children: [_jsx("span", { className: "absolute -inset-1.5" }), _jsx("span", { className: "sr-only", children: "Open user menu" }), _jsx("img", { className: "h-8 w-8 rounded-full", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", alt: "" })] }) }), _jsx(CSSTransition, { in: isProfileMenuOpen, timeout: 300, classNames: "profile-menu", unmountOnExit: true, children: _jsxs("div", { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "user-menu-button", children: [_jsx("a", { href: "#", className: "block px-4 py-2 text-sm text-gray-700", role: "menuitem", id: "user-menu-item-0", children: "Your Profile" }), _jsx("a", { href: "#", className: "block px-4 py-2 text-sm text-gray-700", role: "menuitem", id: "user-menu-item-1", children: "Settings" }), _jsx("a", { href: "#", className: "block px-4 py-2 text-sm text-gray-700", role: "menuitem", id: "user-menu-item-2", children: "Sign out" })] }) })] }) })] })] }) }), _jsx(CSSTransition, { in: isOpen, timeout: 500, classNames: "profile-menu", unmountOnExit: true, children: _jsx("div", { className: "sm:hidden", id: "mobile-menu", children: _jsxs("div", { className: "space-y-1 px-2 pb-3 pt-16 fixed w-full bg-gray-800 z-10", children: [_jsx("a", { onClick: HandleClickMenu, id: "Dashboard", className: getMenuClass('Dashboard', 'mobile'), "aria-current": "page", children: "Dashboard" }), _jsx("a", { onClick: HandleClickMenu, id: "JobScheduling", className: getMenuClass('JobScheduling', 'mobile'), children: "Job Scheduling" }), _jsx("a", { onClick: HandleClickMenu, id: "JobScrapeList", className: getMenuClass('JobScrapeList', 'mobile'), children: "Job Scrape List" })] }) }) })] }) }));
}
