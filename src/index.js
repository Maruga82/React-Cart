import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Basket from './components/Basket';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './components/Checkout';

//In assenza di un backend che gestisca il routing ne ho implementato uno semplice con React Router
ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="basket" element={<Basket />} />
          <Route path="basket/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);