import React, {useState} from 'react';
import './App.css';
import {Checkbox, Tab, Button} from './Button.js';
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
import { AcresManagedBarChart, AcresManagedBarChartCompare } from './components/Visualizations/Questions/AcresManaged';
import { CropPercentages } from './components/Visualizations/Questions/CropPercentages';
import { ConcernsVictory, ConcernsVictoryCompare } from './components/Visualizations/Questions/Concerns_victory';
import { PriorityConcerns, PriorityConcernsCompare } from './components/Visualizations/Questions/PriorityConcerns';
import { PrimaryGrowingReasons, PrimaryGrowingReasonsCompare } from './components/Visualizations/Questions/PrimaryGrowingReasons';
import { InfoSourcesBarChart, InfoSourcesBarChartCompare } from './components/Visualizations/Questions/InfoSources';
import { EngageVictory, EngageVictoryCompare } from './components/Visualizations/Questions/Engage_victory';
import { AffectVictory, AffectVictoryCompare } from './components/Visualizations/Questions/Affect_victory';
import { AmountVictory, AmountVictoryCompare } from './components/Visualizations/Questions/AmountValued';
import { PrioritySatisfaction, PrioritySatisfactionCompare } from './components/Visualizations/Questions/PrioritySatisfaction';
import { InternetSourcesBarChart, InternetSourcesBarChartCompare } from './components/Visualizations/Questions/InternetSources';
import { VisualizationLandingPage } from './components/Visualizations/Questions/VisualizationLandingPage'

export default function App() {

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
              Select a topic to view responses for each question. The responses can also be sorted by vocation and crop/region. 
            </div>
            <div id="compare-box">
              <NavLink to="/results/compare">
                <Button>Compare</Button>
              </NavLink>
            </div>
              {<Visualizations/>}
          </div>
        }>
          <Route index element={<VisualizationLandingPage/>}/>
          <Route path="Acres%20Managed/" element={<AcresManagedBarChart dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<AcresManagedBarChart dataset={dataset}/>}/>
          </Route>
          <Route path="Crop%20Percentages" element={<CropPercentages dataset={dataset}/>}/>
          <Route path="Production%20Concerns" element={<ConcernsVictory dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<ConcernsVictory dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Concerns" element={<PriorityConcerns dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<PriorityConcerns dataset={dataset}/>}/>
          </Route>
          <Route path="Growing%20Reasons" element={<PrimaryGrowingReasons dataset={dataset}/>}>
            <Route path=":crop" element={<PrimaryGrowingReasons dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Effect" element={<AffectVictory dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<AffectVictory dataset={dataset}/>}/>
          </Route>
          <Route path="Information%20Sources" element={<InfoSourcesBarChart dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<InfoSourcesBarChart dataset={dataset}/>}/>
          </Route>
          <Route path="UCCE%20Engagement" element={<EngageVictory dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<EngageVictory dataset={dataset}/>}/>
          </Route>
          <Route path="Value%20Assessment" element={<AmountVictory dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<AmountVictory dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Satisfaction" element={<PrioritySatisfaction dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<PrioritySatisfaction dataset={dataset}/>}/>
          </Route>
          <Route path="Internet%20Sources" element={<InternetSourcesBarChart dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<InternetSourcesBarChart dataset={dataset}/>}/>
          </Route>
        </Route>

        <Route path="results/compare/" element={
          <div>
            <div id="visTop">
              Select a topic to view responses for each question. The responses can also be sorted by vocation and crop/region. 
            </div>
            <div id="compare-box">
              <NavLink to="/results">
                <Button>Single Visualization</Button>
              </NavLink>
            </div>
              {<Visualizations/>}
          </div>
        }>
          <Route index element={<VisualizationLandingPage/>}/>
          <Route path="Acres%20Managed/" element={<AcresManagedBarChartCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<AcresManagedBarChartCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Crop%20Percentages" element={<CropPercentages dataset={dataset}/>}/>

          <Route path="Production%20Concerns" element={<ConcernsVictoryCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<ConcernsVictoryCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Concerns" element={<PriorityConcernsCompare dataset={dataset}/>}>
          <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<PriorityConcernsCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Growing%20Reasons" element={<PrimaryGrowingReasonsCompare dataset={dataset}/>}>
            <Route path=":crop/:crop2" element={<PrimaryGrowingReasonsCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Effect" element={<AffectVictoryCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<AffectVictoryCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Information%20Sources" element={<InfoSourcesBarChartCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<InfoSourcesBarChartCompare dataset={dataset}/>}/>
          </Route>
          <Route path="UCCE%20Engagement" element={<EngageVictoryCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<EngageVictoryCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Value%20Assessment" element={<AmountVictoryCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<AmountVictoryCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Satisfaction" element={<PrioritySatisfactionCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<PrioritySatisfactionCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Internet%20Sources" element={<InternetSourcesBarChartCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<InternetSourcesBarChartCompare dataset={dataset}/>}/>
          </Route>
        </Route>

        <Route path="about" element={<InfoSummary dataset={dataset}/>}/>
        <Route path="team" element={<AboutSummary/>}/>
        <Route path="survey" element={<MiniSurvey/>}/>
        <Route path="feedback" element={<Login/>}/>
      </Routes>
    </div>
  )
}
