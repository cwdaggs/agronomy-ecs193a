import React, { useState } from "react";
import {getFarmersCrops } from './UseData';
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from './StyledDivs';
import {PrioritySatisfaction} from './Questions/PrioritySatisfaction.js'
import {AffectVictory} from './Questions/Affect_victory';
import {ConcernsVictory} from './Questions/Concerns_victory';
import {AcresManagedBarChart} from './Questions/AcresManaged.js';
import { CropPercentages } from "./Questions/CropPercentages";
import {InfoSourcesBarChart} from "./Questions/InfoSources";
import {InternetSourcesBarChart} from "./Questions/InternetSources";
import { PriorityConcerns } from "./Questions/PriorityConcerns";
import { AmountVictory } from "./Questions/AmountValued";
import { EngageVictory } from "./Questions/Engage_victory";
import { PrimaryGrowingReasons } from "./Questions/PrimaryGrowingReasons";
import {MapChart} from "./CaliforniaCounties"

function GetTypes(dataset){
    return getFarmersCrops(dataset) 
}

function getVis(vis_name, active, dataset){

  var vis_key = { 
              "PrioritySatisfaction" :  (<PrioritySatisfaction filter={active} dataset={dataset}/>),
              "CropPercentages":        (<CropPercentages filter={active} dataset={dataset}/>),
              "Affect":                 (<AffectVictory filter={active} dataset={dataset}/>),
              "Concerns":               (<ConcernsVictory filter={active} myDataset={dataset}/>),
              "AcresManaged":           (<AcresManagedBarChart filter={active} dataset={dataset}/>),
              "InfoSources":            (<InfoSourcesBarChart filter={active} dataset={dataset}/>),
              "InternetSources":        (<InternetSourcesBarChart filter={active} dataset={dataset}/>),
              "PriorityConcerns":       (<PriorityConcerns filter={active} myDataset={dataset}/>),
              "AmountValued":           (<AmountVictory filter={active} dataset={dataset}/>),
              "Engage":                 (<EngageVictory filter={active} dataset={dataset}/>),
              "PrimaryGrowingReasons":  (<PrimaryGrowingReasons filter={active} myDataset={dataset}/>),
              "Map":                    (<MapChart filter={active} data={dataset}/>)
            }
  return vis_key[vis_name]
}

function VisMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
  const [active, setActive] = useState("All");

  const vis = getVis(props.vis, active, dataset);
  
  return (
    <>
    <div>
      <StyledUl>
        <DropDownLi>
          <Dropbtn onClick={() => this.handleClick("DropDown")}>
            Filter Crops
          </Dropbtn>
          <DropDownContent>
            {" "}
            {types.map(type => (
                <SubA 
                  key={type}
                  active={active === type}
                  onClick={() => {setActive(type);}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
      </StyledUl>
    </div> 
    <p><b >{active}</b> Data: </p>
    <div className='row' align-items='center'> </div>
    <div align-items='center'>
    {vis}
    </div>
    </>     
  )
}
export {VisMenu};