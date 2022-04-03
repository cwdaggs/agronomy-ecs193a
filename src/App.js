import React, {useState} from 'react';
import './App.css';
import {TabGroup, ToggleGroup, Checkbox} from './Button.js'
import 'react-pro-sidebar/dist/css/styles.css';
import {InfoSummary} from './components/Pages/InfoSummary'
import {AboutSummary} from './components/Pages/AboutSummary'
import {Visualizations} from './components/Pages/Visualization'
import {Home} from './components/Pages/Home'
import background from "./images/farming-background.jfif";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div id="outerContainer" class='font-metropolis'>
             <div id="heading">
               <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
             </div>
             <nav
              style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
              }}
             >
               <Link to ="/info">Info</Link> |{" "}
               <Link to ="/about">About</Link>
             </nav>
               <footer></footer>
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
