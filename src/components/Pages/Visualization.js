import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab, TabVisualizations} from '../Visualizations/StyledDivs'
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../Visualizations/StyledDivs';
import { NavLink, Outlet, Routes, Route, useLocation } from 'react-router-dom';
import { AboutSummary } from './AboutSummary';

// function QueryNavLink({ to, ...props }) {
//   let location = useLocation();
//   return <NavLink to={to + location.search} {...props} />;
// }

export const Visualizations = () => {
    
    const types = [
        "Acres Managed", //Q2
        "Crop Percentages", //Q3
        "Production Concerns", //Q6
        "Priority Concerns", //Q7
        "Primary Growing Reasons", //Q8
        "Priority Effect", //Q9
        "Information Sources", //Q10
        "UCCE Engagement", //Q11
        "Values", //Q12
        "Priorities vs Satisfaction", //Q13
        "Internet Sources", //Q16
    ]
    var test_str = "";
    // ----- Production ------------///
    if(String(window.location.href).includes("ucce")){
      if (window.location.href === "http://www.uccesurveyresults.com/#/results") {
        test_str = "Acres Managed";
      } else {
        test_str = String(window.location.href).replace("http://www.uccesurveyresults.com/#/results/", "").replace("%20", " ");
        test_str = test_str.replace("%20", " ");
      }
    }else{
      if (window.location.href === "http://localhost:3000/#/results") {
        test_str = "Acres Managed";
      } else {
        test_str = String(window.location.href).replace("http://localhost:3000/#/results/", "").replace("%20", " ");
        test_str = test_str.replace("%20", " ");
      }
    }

    const [active, setActive] = useState(test_str);
   
    const [activeName, setActiveName] = useState("Select Topic");
    const [key, setKey] = useState(0);

 
    return(
      <div className='inline-parent'>
        
        <div className='vis-buttons-parent'>
          <div id='vis-buttons-label'>
            Survey Questions
          </div>
          <nav>
            {types.map(type => (
              <NavLink
              key={type}
              onClick={() => {setKey(key+1); setActiveName(type); setActive(type)}}
              
              active={active === type}
              to={`/results/${type}`}>
                <div className='vis-buttons-child'>
                  <TabVisualizations>{type+" "}</TabVisualizations>
                </div>
              </NavLink>
            ))}
            
          </nav>
        </div>
        {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active} key={key}/>}  
      </div>
    );
}