import React from 'react';
import './App.css';
import {Tab, Button} from './Button.js';
import {InfoSummary} from './components/Pages/InfoSummary';
import {Team} from './components/Pages/Team';
import Login from './components/Pages/Login.js';
// import {CommentBox} from './components/Pages/Comments'
import {Visualizations} from './components/Pages/Visualization';
import {Home} from './components/Pages/Home';
import {NavLink, Outlet,Routes, Route } from "react-router-dom";
import {useData} from './components/Visualizations/UseData';
// import { MiniSurvey } from './components/Pages/Survey'; 
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
            <Tab style={{opacity: 1, backgroundColor: '#f1f1f1', borderBottom: '2px solid black'}}>
              {pageName}
            </Tab> 
            : 
            <Tab style={{opacity: 0.7, backgroundColor: '#ffffff', borderBottom: '0px solid black'}}>
              {pageName}
            </Tab>)
  }

  const dataset = useData('./data/Filtered_Crop_Data.csv');

  return (
    <div>
      <div id="heading">
        <NavLink to ="/" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "Home")}
        </NavLink>
        <NavLink to ="/results" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "Explore Results")}
        </NavLink>
        <NavLink to ="/about" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "About")}
        </NavLink>
        <NavLink to ="/team" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "Team")}
        </NavLink>
        {/* <NavLink to ="/survey" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "Survey")}
        </NavLink> */}
        {/*<NavLink to ="/feedback" className={"hover-link"}>
          {({ isActive }) => getActiveTab(isActive, "Feedback")}
        </NavLink>*/}
        <a rel="noreferrer" href="https://ucanr.edu/" target="_blank" className={"hover-link"}>
          <Tab>
            About UCCE
          </Tab>
        </a>
      </div>
      
      <Outlet/>
      <footer></footer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="results/" element={
          <div className='vis-page'>
            <div id="visTop">
            Select a topic to view responses for the respective question. Results can be sorted by vocation, regions that growers/consultants operate in, and top crops managed (in that region or others). 
            Hovering over a data element will provide more detailed information. Be cautious interpreting results with small sample sizes (e.g. n = 10 or less)
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
            <Route path=":crop/:region" element={<PrimaryGrowingReasons dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Effect" element={<AffectVictory dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region" element={<AffectVictory dataset={dataset}/>}/>
          </Route>
          <Route path="Information%20Network" element={<InfoSourcesBarChart dataset={dataset}/>}>
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
          <div className='vis-page'>
            <div id="visTop">
            Select a topic to compare responses for the respective question. Results can be sorted by vocation, regions that growers/consultants operate in, and top crops managed (in that region or others). 
            Hovering over a data element will provide more detailed information. Be cautious interpreting results with small sample sizes (e.g. n = 10 or less)
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
            <Route path=":crop/:crop2/:region/:region2" element={<PrimaryGrowingReasonsCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Priority%20Effect" element={<AffectVictoryCompare dataset={dataset}/>}>
            <Route path=":vocation/:crop/:region/:vocation2/:crop2/:region2" element={<AffectVictoryCompare dataset={dataset}/>}/>
          </Route>
          <Route path="Information%20Network" element={<InfoSourcesBarChartCompare dataset={dataset}/>}>
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
        <Route path="team" element={<Team/>}/>
        {/* <Route path="survey" element={<MiniSurvey/>}/> */}
        <Route path="feedback" element={<Login/>}/>
        <Route path = "*" element={<Home/>}/>
      </Routes>
    </div>
  )
}
