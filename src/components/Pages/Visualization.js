import React, { useState } from "react";
import {TabVisualizations} from '../Visualizations/StyledDivs';
import {Tab} from "../../Button"
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { rgb } from "d3";


function getActiveTab(visName, location){
  return (location === visName
          ? 
          <TabVisualizations style={{opacity: 1, background: `linear-gradient(-70deg, rgba(47, 185, 201, 0.3) 50%, rgba(0, 35, 96, 0.3) )`}}>
            {visName}
          </TabVisualizations> 
          : 
          <TabVisualizations style={{opacity: 1}}>
            {visName}
          </TabVisualizations>)
}

export const Visualizations = (props) => {
    var preLocation = useLocation().pathname.split("/")
    var location = preLocation[2].replace("%20", " ");
    const types = [
        "Acres Managed", //Q2
        "Crop Percentages", //Q3
        "Production Concerns", //Q6
        "Priority Concerns", //Q7
        "Growing Reasons", //Q8
        "Priority Effect", //Q9
        "Information Sources", //Q10
        "UCCE Engagement", //Q11
        "Value Assessment", //Q12
        "Priority Satisfaction", //Q13
        "Internet Sources", //Q16
    ]
    var test_str = "";

    const [active, setActive] = useState(test_str);
    const [key, setKey] = useState(0);

    var path = useLocation().pathname;

    if(!props.dual || (path === "/results")){
      return(
        <div className='inline-parent'>
          <div>

            <div id='vis-buttons-label'>
                Survey Questions
            </div>        
            <nav className='vis-buttons-parent'>
              {types.map(type => (
                <NavLink
                key={type}
                onClick={() => {setKey(key+1); setActive(type)}}
                
                active={active === type}
                to={`/results/${type}`}>
                  <div className='vis-buttons-child'>
                  {getActiveTab(type, location)}
                  </div>
                </NavLink>
              ))}
              
            </nav>
          <Outlet/>
          </div>
        </div>
      );
    }else{
      return(
         <div className='inline-parent'>
          <div>
            
            <div id='vis-buttons-label'>
                Survey Questions
            </div>        
            <nav className='vis-buttons-parent'>
              {types.map(type => (
                <NavLink
                key={type}
                onClick={() => {setKey(key+1); setActive(type)}}
                
                active={active === type}
                to={`/results/${type}`}>
                  <div className='vis-buttons-child'>
                  {getActiveTab(type, location)}
                  </div>
                </NavLink>
              ))}
              
            </nav>
          </div>
          <div className='dual-display'>
            <div id='dual-display-child'>
              <Outlet/>
            </div>
            <div id='dual-display-child'>
              <Outlet/>
            </div>
          </div>
        </div>
      )
    }
}