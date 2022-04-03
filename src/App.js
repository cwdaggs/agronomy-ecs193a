import React, {useState} from 'react';
import './App.css';
import {TabGroup, ToggleGroup, Checkbox, Tab} from './Button.js'
import 'react-pro-sidebar/dist/css/styles.css';
import {InfoSummary} from './components/Pages/InfoSummary'
import {AboutSummary} from './components/Pages/AboutSummary'
import {Visualizations} from './components/Pages/Visualization'
import {Home} from './components/Pages/Home'
import background from "./images/farming-background.jfif";
import { Link, NavLink, Outlet,Routes, Route } from "react-router-dom";

export default function App() {
  const [dual_display, checkDualDisplay] = useState(false);

  function changeDual(){
    checkDualDisplay(!dual_display);
  }

  function getDisplay(){
    if(dual_display){
      return(
        <div class='parent flex-parent'>
          <div class='child flex-child'><Visualizations/></div>
          <div class='child flex-child'><Visualizations/></div>
        </div>
        );
    }else{
      return(<Visualizations/>)
    }
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
    <div id="outerContainer" class='font-metropolis'>
      <div id="heading">
        <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
        <NavLink to ="/">
          {({ isActive }) => getActiveTab(isActive, "Home")}
        </NavLink>
        <NavLink to="/results">
          {({ isActive }) => getActiveTab(isActive, "Explore Results")}
        </NavLink>
        <NavLink to ="/info">
          {({ isActive }) => getActiveTab(isActive, "Info")}
        </NavLink>
        <NavLink to ="/about">
          {({ isActive }) => getActiveTab(isActive, "About")}
        </NavLink>
      </div>
      
      <Outlet/>
      <footer></footer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="results" element={
      //   <div>
      // <Checkbox label={"Compare"} checked={dual_display} onChange={changeDual}/>
      <Visualizations/>
      // </div>
    }/>
        <Route path="info" element={<InfoSummary/>}/>
        <Route path="about" element={<AboutSummary/>}/>
      </Routes>
    </div>
  )
}

// function App() {
//   const [display, setDisplay] = useState("Home");
//   const [key, setKey] = useState(0);

//   const [dual_display, checkDualDisplay] = useState(false);

//   function changeDisplay(newDisplay) {
//     if(newDisplay === "Visualizations" && dual_display){
//       changeDual();
//     }
//     setDisplay(newDisplay);
//   }

//   function changeDual(){
//     checkDualDisplay(!dual_display);
//   }

//   function getDisplay(){
//     if(dual_display){
//       return(
//         <div class='parent flex-parent'>
//           <div class='child flex-child'><Visualizations/></div>
//           <div class='child flex-child'><Visualizations/></div>
//         </div>
//         );
//     }else{
//       return(<Visualizations/>)
//     }
//   }
//   if (display === "Visualizations") {
//     return (
//       <div id="outerContainer" class='font-metropolis'>
//         <div id="heading">
//           <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
//           <TabGroup changeFunc={changeDisplay}/>
//         </div>
//           <div>
//           <Checkbox label={"Compare"} checked={false} onChange={changeDual}/>
//         </div>
//           {getDisplay()}
//           <footer></footer>
//       </div>
//     );
//   }

//   else if (display === "Info") {
//     return (
//       <div id="outerContainer" class='font-metropolis'>
//         <div id="heading">
//           <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
//           <TabGroup changeFunc={changeDisplay}/>
//         </div>
//           <InfoSummary />
//           <footer></footer>
//       </div>
//     );
//   }
//   if (display === "About") {
//     return (
//       <div id="outerContainer" class='font-metropolis'>
//         <div id="heading">
//           <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
//           <TabGroup changeFunc={changeDisplay}/>
//         </div>
//         <AboutSummary/>
//         <footer></footer>
//       </div>
//     );
//   }
//   return (
//     <div id="outerContainer" class='font-metropolis'>
//       <div id="heading">
//         <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
//         <TabGroup changeFunc={changeDisplay}/>
//       </div>
//       <div  style={{ backgroundImage: `url(${background})` }}>
//         <Home/>
//       </div>
//       <footer></footer>  
//     </div>
//   );
// }

// export default App;
