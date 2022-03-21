import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
ReactDOM.render(<HashRouter>
    <CookiesProvider>
        <App/>
        </CookiesProvider>
        </HashRouter>, document.getElementById('root'));
