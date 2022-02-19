import React, { useState } from "react";
import {getFarmersCrops } from './UseData';
import {StyledUl, DropDownLi, Dropbtn, DropDownContent, SubA} from './StyledDivs';
import {PrioritySatisfaction} from './Questions/PrioritySatisfaction.js'
import {PrioritySatisfactionScatter} from './Questions/PrioritySatisfaction copy'
import {AffectVictory} from './Questions/Affect_victory';
import {ConcernsVictory} from './Questions/Concerns_victory';
import {AcresManagedBarChart} from './Questions/AcresManaged.js';
import { CropPercentages } from "./Questions/CropPercentages";

function GetTypes(dataset){
    return getFarmersCrops(dataset, "Crops") 
}

function getVis(vis_name, active, dataset){

  var vis_key = { 
              "PrioritySatisfaction" :  (<PrioritySatisfaction filter={active} dataset={dataset} population={"Growers"}/>),
              "CropPercentages":        (<CropPercentages filter={active} dataset={dataset} population={"Growers"}/>),
              "Affect":                 (<AffectVictory filter={active} dataset={dataset} population={"Growers"}/> ),
              "Concerns":               (<ConcernsVictory filter={active} myDataset={dataset} population={"Growers"}/>),
              "AcresManaged":           (<AcresManagedBarChart filter={active} dataset={dataset} population={"Growers"}/>),
              "Affect2":                (<p>Coming soon...</p>)
            }
  return vis_key[vis_name]
}

function VisMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
  const [active, setActive] = useState("Barley");

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