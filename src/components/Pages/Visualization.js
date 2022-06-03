import React, { useState } from "react";
import {TabVisualizations} from '../Visualizations/StyledDivs';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import "./Visualization.css";

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

export const Visualizations = () => {
    
    const types = [
        "Acres Managed", //Q2
        "Crop Percentages", //Q3
        "Production Concerns", //Q6
        "Priority Concerns", //Q7
        "Growing Reasons", //Q8
        "Priority Effect", //Q9
        "Information Network", //Q10
        "UCCE Engagement", //Q11
        "Value Assessment", //Q12
        "Priority Satisfaction", //Q13
        "Information Delivery", //Q16
    ]
    var test_str = "";

    const [active, setActive] = useState(test_str);
    const [key, setKey] = useState(0);

    var path = useLocation().pathname;
    var preLocation = useLocation().pathname.split("/")
    var location ="";
    if (path !== "/results") {
      if(preLocation[2] != "compare"){
        location = preLocation[2].replace("%20", " ");
      }else{
        if(path !== "/results/compare"){
          location = preLocation[3].replace("%20", " ");
        }
      }
      
    }

      return(
        <div className='inline-parent'>
          <div>

            <div className='vis-buttons-label'>
                Survey Questions
            </div>        
            <nav className='vis-buttons-parent'>
              {types.map(type => (
                <NavLink
                key={type}
                onClick={() => {setKey(key+1); setActive(type)}}
                
                active={active === type}
                to={`${type}`}>
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
}