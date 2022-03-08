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
      <br></br>
      {/* <p><b >&ensp;Crop: </b>{props.active}</p> */}
      <div className='row' align-items='center'> </div>
      <div align-items='center'>
      {props.vis}
      </div>
      </>     
    )
}

// For all visualizations that can be filtered by region, crop, and vocation
function VocationAndRegion(props) {
  const [activeCropName, setActiveCropName] = useState("Select Crop");
  const [activeRegionName, setActiveRegionName] = useState("Select Region");
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
                  onClick={() => {props.setActive(type);setActiveRegionName("Select Region");setActiveCropName(type.replace(/([A-Z])/g, ' $1').trim());}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
        <DropDownLi>
          <Dropbtn>
            {activeRegionName}
          </Dropbtn>
          <DropDownContent>
            {" "}
            {props.regionArray.map(type => (
                <SubA 
                  key={type}
                  active={props.active === type}
                  onClick={() => {props.setActive(type);setActiveCropName("Select Crop");setActiveRegionName(type)}}
                  >{type}
              </SubA>
              ))}
            </DropDownContent>
        </DropDownLi>
      </StyledUl>
    </div> 
    <br></br>
    {/* <p><b >Vocation: </b>{props.activeType} &ensp; <b >Crop/Region: </b>{props.active}</p> */}
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
              "Priorities vs Satisfaction" :        (<PrioritySatisfaction filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Crop Percentages":                   (<CropPercentages filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Priority Effect":                    (<AffectVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Production Concerns":                (<ConcernsVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Acres Managed":                      (<AcresManagedBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Information Sources":                (<InfoSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Internet Sources":                   (<InternetSourcesBarChart filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Priority Concerns":                  (<PriorityConcerns filter={active} vocationFilter={activeVocation} myDataset={dataset}/>),
              "Values":                             (<AmountVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "UCCE Engagement":                    (<EngageVictory filter={active} vocationFilter={activeVocation} dataset={dataset}/>),
              "Primary Growing Reasons":            (<PrimaryGrowingReasons filter={active} vocationFilter={activeVocation} myDataset={dataset}/>)
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

  const regionTypes = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

  const vis = getVis(props.vis, active, activeVocation, dataset);

  switch(vis.type.name){
    // Visualizations with no filters
    case "CropPercentages": {
        return (
          <>
          <h3>Of the total acres, what percentage of the crops grown are in each of the following categories?</h3>
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
      let pcVis = getVis("Priority Concerns", active, moreLimitedVocation, dataset);
      return (
        <>
        <h3>What are the highest priority management challenges/concerns?</h3>
        <VocationAndRegion regionArray={regionTypes} vocationArray={evenMoreLimitedVocationTypes} func={setMoreLimitedVocation} activeType={moreLimitedVocation} active={active} types={types} setActive={setActive} vis={pcVis}/>
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
      let affectVis = getVis("Priority Effect", active, moreLimitedVocation, dataset);
      return (
          <>
          <h3>How often do the following priorities affect your managements/recommendations for field crop production?</h3>
          <VocationAndRegion regionArray={regionTypes} vocationArray={evenMoreLimitedVocationTypes} func={setMoreLimitedVocation} activeType={moreLimitedVocation} active={active} types={types} setActive={setActive} vis={affectVis}/>
          </>
      )
    }
    // Visualizations that can be filtered by all, growers, or consultants
    case "AcresManagedBarChart": {
      return (
        <>
        <h3>How many acres do you manage/consult annually?</h3> 
        <VocationAndRegion regionArray={regionTypes} vocationArray={limitedVocationTypes}  func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "AmountVictory": {
      return (
        <>
        <h3>How much do you value the following:</h3>
        <VocationAndRegion regionArray={regionTypes} vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
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
        <VocationAndRegion regionArray={regionTypes} vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "ConcernsVictory": {
      return (
        <>
        <h3>In regards to the production of field crops in California, rate your concern for the following:</h3>
        <VocationAndRegion regionArray={regionTypes} vocationArray={limitedVocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    // Visualizations that can be filtered by all vocations and crops
    case "InternetSourcesBarChart": {
      return (
        <>
        <h3>Where do you most often look for field crop production information on the internet?</h3>
        <VocationAndRegion regionArray={regionTypes} vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
     
    }
    case "InfoSourcesBarChart": {
      return (
        <>
          <h3>Who do you communicate with when seeking information about field crop production?</h3>
          <VocationAndRegion regionArray={regionTypes} vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    case "EngageVictory":{
      return (
        <>
          <h3>How often do you engage with the UCCE in the following ways?</h3>
          <VocationAndRegion regionArray={regionTypes} vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>   
      )
    }
    default: {
      return (
        <>
          <VocationAndRegion regionArray={regionTypes} vocationArray={vocationTypes} func={setActiveVocation} activeType={activeVocation} active={active} types={types} setActive={setActive} vis={vis}/>
        </>     
      )
    }
  } 
}



export {VisMenu};