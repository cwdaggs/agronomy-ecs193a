import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from '../Visualizations/StyledDivs';
import { NavLink, Outlet, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { AboutSummary } from './AboutSummary';
import {PrioritySatisfaction} from '../Visualizations/Questions/PrioritySatisfaction.js'
import {AffectVictory} from '../Visualizations/Questions/Affect_victory';
import {ConcernsVictory} from '../Visualizations/Questions/Concerns_victory';
import {AcresManagedBarChart} from '../Visualizations/Questions/AcresManaged.js';
import { CropPercentages } from "../Visualizations/Questions/CropPercentages";
import {InfoSourcesBarChart} from "../Visualizations/Questions/InfoSources";
import {InternetSourcesBarChart} from "../Visualizations/Questions/InternetSources";
import { PriorityConcerns } from "../Visualizations/Questions/PriorityConcerns";
import { AmountVictory } from "../Visualizations/Questions/AmountValued";
import { EngageVictory } from "../Visualizations/Questions/Engage_victory";
import { PrimaryGrowingReasons } from "../Visualizations/Questions/PrimaryGrowingReasons";

function VisSelector(dataset, vis) {

  var vis_key = { 
    "Priorities vs Satisfaction" :        (<PrioritySatisfaction dataset={dataset}/>),
    "Crop Percentages":                   (<CropPercentages dataset={dataset}/>),
    "Priority Effect":                    (<AffectVictory dataset={dataset}/>),
    "Production Concerns":                (<ConcernsVictory dataset={dataset}/>),
    "Acres Managed":                      (<AcresManagedBarChart dataset={dataset}/>),
    "Information Sources":                (<InfoSourcesBarChart dataset={dataset}/>),
    "Internet Sources":                   (<InternetSourcesBarChart dataset={dataset}/>),
    "Priority Concerns":                  (<PriorityConcerns dataset={dataset}/>),
    "Values":                             (<AmountVictory dataset={dataset}/>),
    "UCCE Engagement":                    (<EngageVictory dataset={dataset}/>),
    "Primary Growing Reasons":            (<PrimaryGrowingReasons dataset={dataset}/>)
  }

  return (vis_key[vis])
}

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
    /*
    if (window.location.href === "http://uccesurveyresults.com/#/results") {
      test_str = "Acres Managed";
    } else {
      test_str = String(window.location.href).replace("http://uccesurveyresults.com/#/results/", "").replace("%20", " ");
    }
    */


    // if (window.location.href === "http://localhost:3000/#/results") {
    //   test_str = "Acres Managed";
    // } else {
    //   test_str = String(window.location.href).replace("http://localhost:3000/#/results/", "").replace("%20", " ");
    // }
    // console.log(window.location.pathname);
    // console.log(window.location.href);
    // console.log(test_str);
    // console.log(active);
    // const [active, setActive] = useState("Acres Managed");
    const [active, setActive] = useState(test_str);
    const [key, setKey] = useState(0);

    const questions = {      
      ["Acres Managed"]:"How many acres do you manage/consult annually?",
      ["Crop Percentages"]:"Of the total acres, what percentage of the crops grown are in each of the following categories?",
      ["Production Concerns"]:"In regards to the production of field crops in California, rate your concern for the following:",
      ["Priority Concerns"]:"What are the highest priority management challenges/concerns?",
      ["Primary Growing Reasons"]:"What are the primary reasons you grow the following field crops?",
      ["Priority Effect"]:"How often do the following priorities affect your recommendations/management decisions for field crop production?",
      ["Information Sources"]:"Who do you communicate with when seeking information about field crop production?",
      ["UCCE Engagement"]:"How often do you engage with the UCCE in the following ways?",
      ["Values"]:"How much do you value the following:",
      ["Priorities vs Satisfaction"]: "Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3). ",
      ["Internet Sources"]:"Where do you most often look for field crop production information on the internet?"
    };
    
    return(
      <div className='inline-parent'>
        <h3>{questions[String(active)]}</h3>
        <div className='inline-child'>
          <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
            {types.map(type => (
              <NavLink
              key={type}
              //setSearchParams({filter : type})
              onClick={() => {setKey(key+1); setActive(type);}}
              
              active={active === type}
              to={`/results/${type}`}>
                {type+" "}
              </NavLink>
            ))}
            
          </nav>
          <Outlet/>
        </div>
        {/* {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active} key={key}/>} */}
          {/* {VisSelector(useData('./data/Filtered_Crop_Data.csv'), active)} */}
      </div>
    );
}