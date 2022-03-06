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

function OnlyCrops(props) {
  const [activeName, setActiveName] = useState("Select Crop");
  return (
      <>
      <div>
        <StyledUl>
          <DropDownLi>
            <Dropbtn>
              {activeName}
            </Dropbtn>
            <DropDownContent>
              {" "}
              {props.types.map(type => (
                  <SubA 
                    key={type}
                    active={props.active === type}
                    onClick={() => {props.setActive(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim())}}
                    >{type}
                </SubA>
                ))}
              </DropDownContent>
          </DropDownLi>
        </StyledUl>
      </div> 
      {/* <p><b >&ensp;Crop: </b>{props.active}</p> */}
      <div className='row' align-items='center'> </div>
      <div align-items='center'>
      {props.vis}
      </div>
      </>     
    )
}

function LimitedVocation(props) {
  const [activeCropName, setActiveCropName] = useState("Select Crop");
  const [activeName, setActiveName] = useState("Select Vocation");
  return (
    <>
    <div>
      <StyledUl>
      <DropDownLi>
        <Dropbtn>
            {activeName}
          </Dropbtn>
          <DropDownContent>
            {" "}
            {props.vocationArray.map(type => (
                <SubA 
                  key={type}
                  active={props.activeType === type}
                  onClick={() => {props.func(type); setActiveName(type.replace(/([A-Z])/g, ' $1').trim())}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
        <DropDownLi>
          <Dropbtn>
            {activeCropName}
          </Dropbtn>
          <DropDownContent>
            {" "}
            {props.types.map(type => (
                <SubA 
                  key={type}
                  active={props.active === type}
                  onClick={() => {props.setActive(type);setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim())}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
      </StyledUl>
    </div> 
    {/* <p><b >Vocation: </b>{props.activeType} &ensp; <b >Crop: </b>{props.active}</p> */}
    <div className='row' align-items='center'> </div>
    <div align-items='center'>
    {props.vis}
    </div>
    </>  
  )
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
  return (vis_key[vis_name])
}

function VisMenu(props) {

  const dataset = props.dataset
  const types = [
    "All", 
    "Alfalfa", 
    "Barley", 
    "Corn", 
    "Corn Silage", 
    "Cotton", 
    "Dry Beans", 
    "Rice", 
    "Small Grain Silage", 
    "Sunflower", 
    "Wheat"
  ]; // GetTypes(dataset);

  const [active, setActive] = useState("All");

  const vocationTypes = ["All", "Allied Industry", "Consultants", "Growers", "Other"]
  const limitedVocationTypes = ["All", "Growers", "Consultants"]
  const evenMoreLimitedVocationTypes = ["Growers", "Consultants"]
  const [activeVocation, setActiveVocation] = useState("All");
  const [moreLimitedVocation, setMoreLimitedVocation] = useState("Growers");

  const vis = getVis(props.vis, active, activeVocation, dataset);
  console.log(vis)
  console.log(vis.type.name)
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

    case "PrimaryGrowingReasons": {
      return (
        <>
        <h3>What are the primary reasons you grow the following field crops?</h3> 
        <OnlyCrops active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }

    // Visualizations that can strictly only be filtered by grower or consultant
    case "PriorityConcerns": {
      let pcVis = getVis("PriorityConcerns", active, moreLimitedVocation, dataset);
      return (
        <>
        <h3>What are the highest priority management challenges/concerns?</h3>
        <LimitedVocation vocationArray={evenMoreLimitedVocationTypes} func={setMoreLimitedVocation} activeType={moreLimitedVocation} active={active} types={types} setActive={setActive} vis={pcVis}/>
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
      let affectVis = getVis("Affect", active, moreLimitedVocation, dataset);
      return (
          <>
          <h3>How often do the following priorities affect your managements/recommendations for field crop production?</h3>
          <LimitedVocation vocationArray={evenMoreLimitedVocationTypes} func={setMoreLimitedVocation} activeType={moreLimitedVocation} active={active} types={types} setActive={setActive} vis={affectVis}/>
          </>
      )
    }
    // Visualizations that can be filtered by all, growers, or consultants
    case "AcresManagedBarChart": {
      return (
        <>
        <h3>How many acres do you manage/consult annually?</h3> 
        <LimitedVocation vocationArray={limitedVocationTypes}  func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "AmountVictory": {
      return (
        <>
        <h3>How much do you value the following:</h3>
        <LimitedVocation vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "PrioritySatisfaction": {
      return (
        <>
        <div>
          <h3>Rate what you believe should be the UCCE's priorities for field crop production, and 
              rate your satisfaction with the UCCE's delivery of information on these topics. </h3>
        </div>
        <LimitedVocation vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "ConcernsVictory": {
      return (
        <>
        <h3>In regards to the production of field crops in California, rate your concern for the following:</h3>
        <LimitedVocation vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    // Visualizations that can be filtered by all vocations and crops
    case "InternetSourcesBarChart": {
      return (
        <>
        <h3>Where do you most often look for field crop production information on the internet?</h3>
        <LimitedVocation vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
     
    }
    case "InfoSourcesBarChart": {
      return (
        <>
          <h3>Who do you communicate with when seeking information about field crop production?</h3>
          <LimitedVocation vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "EngageVictory":{
      return (
        <>
          <h3>How often do you engage with the UCCE in the following ways?</h3>
          <LimitedVocation vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    default: {
      return (
        <>
          <LimitedVocation vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>     
      )
    }
  } 
}



export {VisMenu};