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
import "@fontsource/metropolis";

function GetTypes(dataset){
  let types = getFarmersCrops(dataset).sort();
  types.splice(types.indexOf("All"), 1);
  types.unshift("All");
  types.push(types.splice(types.indexOf("Other"), 1)[0]);
  return types; 
}

function getVis(vis_name, active, activeVocation, dataset){

  var vis_key = { 
              "PrioritySatisfaction" :  (<PrioritySatisfaction filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "CropPercentages":        (<CropPercentages filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Affect":                 (<AffectVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Concerns":               (<ConcernsVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "AcresManaged":           (<AcresManagedBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "InfoSources":            (<InfoSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "InternetSources":        (<InternetSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "PriorityConcerns":       (<PriorityConcerns filter={active} vocationFilter={activeVocation} myDataset={dataset}/>),
              "AmountValued":           (<AmountVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Engage":                 (<EngageVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "PrimaryGrowingReasons":  (<PrimaryGrowingReasons filter={active} vocationFilter={activeVocation} myDataset={dataset}/>),
              "Map":                    (<MapChart filter={active} vocationFilter={activeVocation} data={dataset}/>)
            }
  return vis_key[vis_name]
}

function VisMenu(props) {

  const dataset = props.dataset
  const types = GetTypes(dataset);
  
  const [active, setActive] = useState("All");

  const vocationTypes = ["All", "Allied Industry", "Consultants", "Growers", "Other"]
  const limitedVocationTypes = ["All", "Growers", "Consultants"]
  const evenMoreLimitedVocationTypes = ["Growers", "Consultants"]
  const [activeVocation, setActiveVocation] = useState("Growers");

  const vis = getVis(props.vis, active, activeVocation, dataset);

  function OnlyCrops() {
    return (
        <>
        <div>
          <StyledUl>
            <DropDownLi>
              <Dropbtn>
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
        <p><b >&ensp;Crop: </b>{active}</p>
        <div className='row' align-items='center'> </div>
        <div align-items='center'>
        {vis}
        </div>
        </>     
      )
  }

  function MoreLimitedVocation(props) {
    return (
      <>
      <div>
        <StyledUl>
        <DropDownLi>
          <Dropbtn>
              Filter Vocation
            </Dropbtn>
            <DropDownContent>
              {" "}
              {props.vocationArray.map(type => (
                  <SubA 
                    key={type}
                    active={activeVocation === type}
                    onClick={() => {setActiveVocation(type);}}
                    >{type}
                </SubA>
                ))}
              </DropDownContent>
          </DropDownLi>
          <DropDownLi>
            <Dropbtn>
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
      <p><b >Vocation: </b>{activeVocation} &ensp; <b >Crop: </b>{active}</p>
      <div className='row' align-items='center'> </div>
      <div align-items='center'>
      {vis}
      </div>
      </>  
    )
  }

  switch(vis.type.name){
    // Visualizations with no filters
    case "CropPercentages": {
        return (
          <>
          <h3>Of the total acres, what percentage are in the following categories? (Field Crops, Vegetable Crops, Tree and Vine Crops, or Other)</h3>
          {vis}
          </>
        )
      }
    // Visualizations that can only be filtered by crop
    case "MapChart": {
      return (
        <>
        <h3>Density of Survey Responses By County</h3> 
        <OnlyCrops/>
        </>   
      )
    }
    case "PrimaryGrowingReasons": {
      return (
        <>
        <h3>What are the primary reasons you grow the following field crops?</h3> 
        <OnlyCrops/>
        </>   
      )
    }
    // case "AcresManagedBarChart": {
    //   return (
    //     <>
    //     <h3>How many acres do you manage/consult annually?</h3> 
    //     <OnlyCrops/>
    //     </>   
    //   )
    // }
    // Visualizations that can strictly only be filtered by grower or consultant
    case "PriorityConcerns": {
      return (
        <>
        <h3>What are the highest priority management challenges/concerns?</h3>
        <MoreLimitedVocation vocationArray={evenMoreLimitedVocationTypes}/>
        </>
      )
    }
    case "AffectVictory": {
      // let blah = ""
      // if ({activeVocation} === "Consultants") {
      //   blah = "How often do the following priorities affect your recommendations for field crop production?"
      // } else {
      //   blah = "How often do the following priorities affect your management decisions for field crop production?"
      // }
      return (
          <>
          <h3>How often do the following priorities affect your managements/recommendations for field crop production?</h3>
          <MoreLimitedVocation vocationArray={evenMoreLimitedVocationTypes}/>
          </>
      )
    }
    // Visualizations that can be filtered by all, growers, or consultants
    case "AcresManagedBarChart": {
      return (
        <>
        <h3>How many acres do you manage/consult annually?</h3> 
        <MoreLimitedVocation vocationArray={limitedVocationTypes}/>
        </>   
      )
    }
    case "AmountVictory": {
      return (
        <>
        <h3>How much do you value the following:</h3>
        <MoreLimitedVocation vocationArray={limitedVocationTypes}/>
        </>   
      )
    }
    case "PrioritySatisfaction": {
      return (
        <>
        <MoreLimitedVocation vocationArray={limitedVocationTypes}/>
        </>   
      )
    }
    case "ConcernsVictory": {
      return (
        <>
        <h3>In regards to the production of field crops in California, rate your concern for the following:</h3>
        <MoreLimitedVocation vocationArray={limitedVocationTypes}/>
        </>   
      )
    }
    // Visualizations that can be filtered by all vocations and crops
    case "InternetSources": {
      return (
        <>
        <h3>Where do you most often look for field crop production information on the internet?</h3>
        <MoreLimitedVocation vocationArray={vocationTypes}/>
        </>   
      )
     
    }
    case "InfoSources": {
      return (
        <>
        <h3>Who do you communicate with when seeking information about field crop production?</h3>
        <MoreLimitedVocation vocationArray={vocationTypes}/>
        </>   
      )
    }
    default: {
      return (
        <>
        <MoreLimitedVocation vocationArray={vocationTypes}/>
        </>     
      )
    }
  } 
}



export {VisMenu};