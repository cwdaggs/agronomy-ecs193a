import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {InfoSummary} from './components/Pages/InfoSummary'
import {AboutSummary} from './components/Pages/AboutSummary'
import {Visualizations} from './components/Pages/Visualization'
import {Home} from './components/Pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>}>
      <Route path="home" element={<Home/>}/>
      <Route path="visualizations" element={<Visualizations/>}/>
      <Route path="info" element={<InfoSummary/>}/>
      <Route path="about" element={<AboutSummary/>}/>
    </Route>
  </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//<React.StrictMode> </React.StrictMode>
