import React, {useState} from 'react';
import './App.css';
import {TabGroup, ToggleGroup} from './Button.js'
import 'react-pro-sidebar/dist/css/styles.css';
import {InfoSummary} from './components/Pages/InfoSummary'
import {AboutSummary} from './components/Pages/AboutSummary'
import {Visualizations} from './components/Pages/Visualization'


function App() {
  const [display, setDisplay] = useState("Visualizations");

  function changeDisplay(newDisplay) {
    setDisplay(newDisplay);
  }

  if (display === "Info") {
    return (
      <div id="outerContainer">
        <div id="heading">
          <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
          <TabGroup changeFunc={changeDisplay}/>
        </div>
          <InfoSummary />
      </div>
    );
  }
  if (display === "About") {
    return (
      <div id="outerContainer">
        <div id="heading">
          <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
          <TabGroup changeFunc={changeDisplay}/>
        </div>
        <AboutSummary/>
      </div>
    );
  }
  return (
    <div id="outerContainer">
      <div id="heading">
        <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
        <TabGroup changeFunc={changeDisplay}/>
      </div>
        <Visualizations/>
    </div>
  );
}

export default App;
