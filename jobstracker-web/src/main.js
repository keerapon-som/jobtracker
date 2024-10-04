import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
var container = document.getElementById('root');
var root = createRoot(container); // Create a root.
root.render(_jsx(_Fragment, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
