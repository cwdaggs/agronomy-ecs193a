import React, {useState} from 'react';
import './App.css';
import {Checkbox, Tab} from './Button.js';
import 'react-pro-sidebar/dist/css/styles.css';
import {InfoSummary} from './components/Pages/InfoSummary';
import {AboutSummary} from './components/Pages/AboutSummary';
import Login from './components/Pages/Login.js';
import {CommentBox} from './components/Pages/Comments'
import {Visualizations} from './components/Pages/Visualization';
import {Home} from './components/Pages/Home';
import {NavLink, Outlet,Routes, Route } from "react-router-dom";
import {useData} from './components/Visualizations/UseData';
import { MiniSurvey } from './components/Pages/Survey'; 
import { AcresManagedBarChart } from './components/Visualizations/Questions/AcresManaged';
import { CropPercentages } from './components/Visualizations/Questions/CropPercentages';
import { ConcernsVictory } from './components/Visualizations/Questions/Concerns_victory';
import { PriorityConcerns } from './components/Visualizations/Questions/PriorityConcerns';
import { PrimaryGrowingReasons } from './components/Visualizations/Questions/PrimaryGrowingReasons';
import { InfoSourcesBarChart } from './components/Visualizations/Questions/InfoSources';
import { EngageVictory } from './components/Visualizations/Questions/Engage_victory';
import { AffectVictory } from './components/Visualizations/Questions/Affect_victory';
import { AmountVictory } from './components/Visualizations/Questions/AmountValued';
import { PrioritySatisfaction } from './components/Visualizations/Questions/PrioritySatisfaction';
import { InternetSourcesBarChart } from './components/Visualizations/Questions/InternetSources';

import { TabHome } from './components/Visualizations/StyledDivs';
import { VisualizationLandingPage } from './components/Visualizations/Questions/VisualizationLandingPage'



export default function App() {
  var [dual_display, checkDualDisplay] = useState(false);

  function changeDual(){
    checkDualDisplay(!dual_display);
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

  const dataset = useData('./data/Filtered_Crop_Data.csv');

  return (
    <div id="outerContainer" class='font-metropolis'>
      <div id="heading">
        {/*<img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>*/}
        <NavLink to ="/">
          {({ isActive }) => getActiveTab(isActive, "Home")}
        </NavLink>
        <NavLink to ="/results">
          {({ isActive }) => getActiveTab(isActive, "Explore Results")}
        </NavLink>
        <NavLink to ="/about">
          {({ isActive }) => getActiveTab(isActive, "About")}
        </NavLink>
        <NavLink to ="/team">
          {({ isActive }) => getActiveTab(isActive, "Team")}
        </NavLink>
        <NavLink to ="/survey">
          {({ isActive }) => getActiveTab(isActive, "Survey")}
        </NavLink>
        <NavLink to ="/feedback">
          {({ isActive }) => getActiveTab(isActive, "Feedback")}
        </NavLink>

        
        <a href="https://ucanr.edu/" target="_blank">
          <Tab>
            UCCE
          </Tab>
        </a>


      </div>
      
      <Outlet/>
      <footer></footer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="results/" element={
          <div>
            <div id="visTop">
              Click Select Topic to view responses for each question. The responses can also be sorted by vocation and crop/region. 
              Full details of survey scope and representation here.
            </div>
            <div id="compare-box">
              <Checkbox label={"Compare"} checked={false} onChange={changeDual}/>
            </div>
              {<Visualizations dual={dual_display}/>}
          </div>
        }>
          <Route index element={<VisualizationLandingPage/>}/>
          <Route path="Acres%20Managed" element={<AcresManagedBarChart dataset={dataset}/>}/>
          <Route path="Crop%20Percentages" element={<CropPercentages dataset={dataset}/>}/>
          <Route path="Production%20Concerns" element={<ConcernsVictory dataset={dataset}/>}/>
          <Route path="Priority%20Concerns" element={<PriorityConcerns dataset={dataset}/>}/>
          <Route path="Growing%20Reasons" element={<PrimaryGrowingReasons dataset={dataset}/>}/>
          <Route path="Priority%20Effect" element={<AffectVictory dataset={dataset}/>}/>
          <Route path="Information%20Sources" element={<InfoSourcesBarChart dataset={dataset}/>}/>
          <Route path="UCCE%20Engagement" element={<EngageVictory dataset={dataset}/>}/>
          <Route path="Value%20Assessment" element={<AmountVictory dataset={dataset}/>}/>
          <Route path="Priority%20Satisfaction" element={<PrioritySatisfaction dataset={dataset}/>}/>
          <Route path="Internet%20Sources" element={<InternetSourcesBarChart dataset={dataset}/>}/>
        </Route>
        {/* <Route path=":topic" element={getNewDisplay(dual_display)}/> */}

        <Route path="about" element={<InfoSummary/>}/>
        <Route path="team" element={<AboutSummary/>}/>
        <Route path="survey" element={<MiniSurvey/>}/>
        <Route path="feedback" element={<Login/>}/>
      </Routes>
    </div>
  )
}
