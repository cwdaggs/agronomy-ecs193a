import {useData} from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import React, { useState } from "react";
import {Tab} from '../Visualizations/StyledDivs'
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA, TabVisualizations} from '../Visualizations/StyledDivs';
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

    const [active, setActive] = useState(test_str);
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
              onClick={() => {setKey(key+1); setActive(type)}}
              
              active={active === type}
              to={`/results/${type}`}>
                <div className='vis-buttons-child'>
                  <TabVisualizations>{type+" "}</TabVisualizations>
                </div>
              </NavLink>
            ))}
            
          </nav>
        </div>
        <Outlet/>
      </div>
    );
}