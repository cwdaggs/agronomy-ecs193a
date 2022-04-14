import React, {useState} from 'react';
import './App.css';
import {Checkbox, Tab} from './Button.js';
import 'react-pro-sidebar/dist/css/styles.css';
import {InfoSummary} from './components/Pages/InfoSummary';
import {AboutSummary} from './components/Pages/AboutSummary';
import {Visualizations} from './components/Pages/Visualization';
import {Home} from './components/Pages/Home';
import {NavLink, Outlet,Routes, Route } from "react-router-dom";
import { MiniSurvey } from './components/Pages/Survey'; 

export default function App() {
  const [dual_display, checkDualDisplay] = useState(false);

  function changeDual(){
    checkDualDisplay(!dual_display);
  }

  function getNewDisplay(dual_display) {
    return (dual_display
      ?
      <div class='flex-parent'>
        <div class='flex-child'><Visualizations/></div>
        <div class='flex-child'><Visualizations/></div>
      </div>
      :
      <Visualizations/>)
  }

  function getActiveTab(isActive, pageName){
    return (isActive 
            ? 
            <Tab style={{opacity: 1}}>
              {pageName}
            </Tab> 
            : 
            <Tab style={{opacity: 0.7}}>
              {pageName}
            </Tab>)
  }

  return (
    <>
      <div id="outerContainer" class='font-metropolis'>
        <div id="heading">
          <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
          <NavLink to ="/">
            {({ isActive }) => getActiveTab(isActive, "Home")}
          </NavLink>
          <NavLink to ="/results">
            {({ isActive }) => getActiveTab(isActive, "Explore Results")}
          </NavLink>
          <NavLink to ="/info">
            {({ isActive }) => getActiveTab(isActive, "Info")}
          </NavLink>
          <NavLink to ="/about">
            {({ isActive }) => getActiveTab(isActive, "About")}
          </NavLink>
          <NavLink to ="/survey">
            {({ isActive }) => getActiveTab(isActive, "Survey")}
          </NavLink>
        </div>
        
        <Outlet/>
        <footer></footer>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="results/*" element={
            <div>
              <div id="visTop"> 
                Select a topic to view responses for each question. The responses can also be sorted by vocation and crop/region. Feel free to compare multiple questions by checking the 'compare' box.
              </div>
              <div id="compare-box">
                <Checkbox label={"Compare"} checked={false} onChange={changeDual}/>
              </div>
                {getNewDisplay(dual_display)}
            </div>
          }/>
          <Route path="info" element={<InfoSummary/>}/>
          <Route path="about" element={<AboutSummary/>}/>
          <Route path="survey" element={<MiniSurvey/>}/>
        </Routes>
      </div>
    
    </>
  )
}
