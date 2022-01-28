import React, {useState} from 'react';
import './App.css';
import {TabGroup, ToggleGroup} from './Button.js'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";


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
        <div id="infosummary">
          Cameron joined the Department of Plant Sciences in 2019. He is an agronomist who places equal emphasis on food security and 
          environmental sustainability. His research is focused on developing cropping systems and management strategies to enhance 
          productivity while minimizing nitrogen, carbon, water, and energy footprints in agriculture. Cameron was Assistant Professor 
          at the University of Illinois from 2014-2019 before moving to UC Davis. He maintains Adjunct status there while finishing 
          projects and advising graduate students until completion of their degrees. He received his BA in Environmental Biology from 
          Colgate University, and his MS and PhD degrees from UC Davis in International Agricultural Development and Agronomy, 
          respectively.
        </div>
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
        <div id="aboutsummary">
          Cooperative Extension (CE) is a nationwide network of land-grant university researchers and educators who solve problems 
          in agriculture, the environment, and human and community well-being. They work to foster a connection between the university 
          and the public by delivering science-based information. However, UC Cooperative Extension is facing reductions in personnel, 
          meaning current advisors are stretched thin and need to prioritize their efforts. At the same time, the landscape of 
          California agriculture is rapidly changing and farmers are encountering new challenges such as regulations on labor and 
          inputs. We recently conducted a statewide collaborative needs assessment to give a voice to farmers and others in agriculture
          to understand their priorities and inform future UCCE programs, increasing engagement and impact. Specifically, we
          administered an online survey to shed light on common challenges and top concerns of growers, consultants, and allied
          industry for agronomic crops across the state. Now, our team hopes to disseminate the findings to the general public
          through an interactive website. This resource will also be critical for state regulatory agencies and policy-makers
          to identify new opportunities for research, extension, and collaboration.
        </div>
      </div>
    );
  }
  return (
    <div id="outerContainer">
      <div id="heading">
        <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
        <TabGroup changeFunc={changeDisplay}/>
      </div>
      <div id="sidebar">
        <ProSidebar id="sidebar-container">
          <Menu iconShape="square" id="menu">
            <MenuItem icon={<FaGem/>} >Topic 1</MenuItem>
            <MenuItem icon={<GiCorn/>}>Topic 2</MenuItem>
            <MenuItem icon={<AiFillAndroid/>}>Topic 3</MenuItem>
            <MenuItem icon={<SiAdblock/>}>Topic 4</MenuItem>
            <MenuItem icon={<GrHorton/>}>Topic 5</MenuItem>
          {/* <SubMenu title="Components" icon={<FaEdgeLegacy />}>
          </SubMenu> */}
          </Menu>
        </ProSidebar>
      </div> {/* visualizations go here */}
    </div>
  );
}

export default App;
