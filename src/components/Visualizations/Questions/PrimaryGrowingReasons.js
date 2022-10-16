import {filterByCropOrRegion, filterByVocation, parseCropURLCompare} from "../UseData.js";
import {VictoryTooltip, VictoryChart, VictoryAxis, VictoryBar, VictoryLabel} from 'victory';
import {OnlyCrops, OnlyCropsCompare} from "../Menus/OnlyCrops.js"
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const colorScale = 
[
  "#002360", 
  "#003F72",
  "#006083",
  "#008694",
  "#00A498", 
  "#02B488",
  "#29C37A",
  "#52D176", 
  "#7ADE7F",
  "#A9E9A3",
  "#C3EFB8",
  "#D8F4CC"
]

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const mobileWidth=1000;
const margin = { top: height/20, right: width/6, bottom: height/3.5, left: width/6 };
const fontSize = (width >= mobileWidth) ? 18: 6;

function calculateAllPrimaryGrowingReasons(data, filter) {

  var columns = [filter.split(' ').join('_') + "_Growing_Reasons"]
  let modified_data = [];
  if(filter === "All"){
    columns = ["Alfalfa_Growing_Reasons", "Cotton_Growing_Reasons", "Rice_Growing_Reasons", "Wild_Rice_Growing_Reasons", "Wheat_Growing_Reasons", "Triticale_Growing_Reasons",    
                "Barley_Growing_Reasons",    "Oats_Growing_Reasons",    "Corn_Growing_Reasons",    "Sorghum_Growing_Reasons",    "Corn_Silage_Growing_Reasons", "Small_Grain_Silage_Growing_Reasons",
                "Small_Grain_Hay_Growing_Reasons", "Grass_and_Grass_Mixtures_Hay_Growing_Reasons",    "Grass_and_Grass_Mixtures_Pasture_Growing_Reasons",    "Sorghum_Sudangrass_Sudan_Growing_Reasons",    
                "Mixed_Hay_Growing_Reasons", "Dry_Beans_Growing_Reasons",    "Sunflower_Growing_Reasons", "Oilseeds_Growing_Reasons", "Sugar_Beets_Growing_Reasons", "Hemp_Growing_Reasons", "Other_Growing_Reasons"]
  } 

 const myMap = new Map()

 data.forEach(farmer => {
  const reasons = new Set(); 
  columns.forEach(crop =>{
    farmer[crop].split(",").forEach(reason => {
      if((String(reason) !== "NA") && (String(reason) !== "")){
        if(reason === "I am limited by farm resources to grow other crops (equipment" || reason ===  " water" || reason ===  " land" || reason === " capital" || reason === " know-how" || reason === " etc.)"){
          if(!reasons.has("Limited by farm resources")){
            reasons.add("Limited by farm resources")
          } 
        }else{
          if(!reasons.has(reason)){
            reasons.add(reason)
          }
        }
      }
    });
  });
  reasons.forEach(reason => {
    myMap.has(reason) ? myMap.set(reason, myMap.get(reason) + 1) : myMap.set(reason, 1)
  })
 });
 for (const [key, value] of new Map([...myMap].sort())) {
    modified_data.push({x: key, y: value});
  }
 return modified_data;
}

function GetResponses(data, filter){
  var columns = [filter.split(' ').join('_') + "_Growing_Reasons"]

  if(filter === "All"){
    columns = ["Alfalfa_Growing_Reasons", "Cotton_Growing_Reasons", "Rice_Growing_Reasons", "Wild_Rice_Growing_Reasons", "Wheat_Growing_Reasons", "Triticale_Growing_Reasons",    
                "Barley_Growing_Reasons",    "Oats_Growing_Reasons",    "Corn_Growing_Reasons",    "Sorghum_Growing_Reasons",    "Corn_Silage_Growing_Reasons", "Small_Grain_Silage_Growing_Reasons",
                "Small_Grain_Hay_Growing_Reasons", "Grass_and_Grass_Mixtures_Hay_Growing_Reasons",    "Grass_and_Grass_Mixtures_Pasture_Growing_Reasons",    "Sorghum_Sudangrass_Sudan_Growing_Reasons",    
                "Mixed_Hay_Growing_Reasons", "Dry_Beans_Growing_Reasons",    "Sunflower_Growing_Reasons", "Oilseeds_Growing_Reasons", "Sugar_Beets_Growing_Reasons", "Hemp_Growing_Reasons", "Other_Growing_Reasons"]
  } 
  console.log(data);
  var amount = 0

  for (var j in data){
    if(data[j][String(columns[0])] === "NA"){
      for (var i in columns){
        if(data[j][String(columns[i])] !== "NA"){
          amount += 1;
          break;
        }
      }
    }else{
      amount += 1;
    }    
  }

  console.log(amount)
  return amount;
}


function parseURL(baseURL, path) {
  var pathname = path;
  var crop = "All";
  var region = "All";
  var baseAll = true;
  const cropChoices = [
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
  ];

  const regionTypes = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

  if (baseURL !== pathname) {
    pathname = pathname.replace(baseURL, "");
    pathname = pathname.replaceAll("%20", " ");
    const filters = pathname.split("/");
    filters.shift();
    if (filters[0] !== "Select%20Crop" && cropChoices.includes(filters[0])) {
      crop = filters[0];
      baseAll = false;
    }
    if (filters[1] !== "Select%20Region" && regionTypes.includes(filters[1])) {
      region = filters[1];
      baseAll = false;
    }
  }
  return {crop: crop, region: region, baseAll: baseAll};
}
  
function DetermineTitleText(activeCrop, activeRegion) {
  var titleText = "";
  if (activeRegion !== "All") {
    titleText += " " + activeRegion;
  }
  if (activeCrop === "All") {
    if (activeRegion === "All") {
      titleText += "All";
    }
    titleText += " Crops"
  } else {
    titleText +=  " " + activeCrop;
  }
  return titleText;
}

function GetChart(props){
    if(props.responses === 0){
      return (
        <>
          <p>Insufficient data for this set of filters. (n=0)</p>         
        </>
        )
    }
    return(
      <>
      <div class='visualization-window'>
            <VictoryChart horizontal={false} height={height} width={width}
              domainPadding={{ x: margin.right/5.3, y: margin.top }}
              padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
              animate={{duration: 800}}
            >
            <VictoryBar
              data={props.data_by_reason}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill, strokeWidth: 1, stroke: 'black'}}}
              labels={({ datum }) => `${datum.y + " Respondents"}`}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize: fontSize,
                    fontFamily: 'Roboto'
                  }}
                  constrainToVisibleArea={'true'}    
                />
            }
            />
            <VictoryAxis dependentAxis
            label = {String(props.titleText + " (n=" + props.responses + ")")}
            style={{
              fontFamily: 'Roboto',
              tickLabels: {fontSize: fontSize*1.5, padding: 15, fontFamily: 'Roboto'},
              axisLabel: {fontSize: fontSize*1.5, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 80: 50}
            }}
            
            />
            <VictoryAxis
              style={{
                tickLabels: {fontSize: fontSize*5, padding: 5, fontFamily: 'Roboto'},
                axisLabel: {fontSize: fontSize*5, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 60: 20}
                }}
                tickLabelComponent={       
                  <VictoryLabel    
                      textAnchor="start"
                      angle={25}
                      style={{fontSize: (width >= mobileWidth) ? fontSize*1.25: fontSize}}
                  />   
                }
            />                        
          </VictoryChart>
      </div>
    </>
    )
}

function AdjustColorAndNames(data_by_reason) {
  var counter = colorScale.length - 1;
  for (var obj of data_by_reason) {
    if(obj.x === "Soil is not suitable for other crops") {
      obj.x = "Soil unsuitable for other crops"
    }
    if (obj.x === "Capacity for deficit irrigation or fallowing") {
      obj.x = "Capacity for deficit irrigation/fallowing"
    }
    if (obj.x === "Crop is traditionally grown on my farm") {
      obj.x = "Traditionally grown crop on farm"
    }
    if (obj.x === "Suitability for saline/alkaline soils") {
      obj.x = "Saline/alkaline soils"
    }
    if (obj.x === "Crop Rotation Benefits") {
      obj.x = "Crop rotation benefits"
    }
    if (obj.x === "Stable Markets") {
      obj.x = "Stable markets"
    }
    obj.fill = colorScale[counter];
    counter--;
  }
  return data_by_reason
}

export function PrimaryGrowingReasons(props) { 
  const baseURL = "/results/Growing%20Reasons";
  const filter = parseURL(baseURL, useLocation().pathname);

  const [active, setActive] = useState(filter.crop);
  const [activeRegion, setActiveRegion] = useState(filter.region);

  function changeFunc(newValue){
    setActive(newValue);
  }

  function changeRegionFunc(newValue){
    setActiveRegion(newValue);
  }

  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }

  var titleText = DetermineTitleText(active, activeRegion);
  var data_filtered = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active), activeRegion), "Growers")
  var data_by_reason = AdjustColorAndNames(calculateAllPrimaryGrowingReasons(data_filtered, active))

  var responses = GetResponses(data_filtered, active)
  console.log(responses)

  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    <div className="inline-child">
      <OnlyCrops changeFunc={changeFunc} changeRegionFunc={changeRegionFunc} active={active} activeRegion={activeRegion} baseAll={filter.baseAll}/>
    </div>
      <GetChart titleText={titleText} data_by_reason={data_by_reason} data_filtered={data_filtered} responses={responses}/>
    </>  
  );
}

export function PrimaryGrowingReasonsCompare(props) {
  const baseURL = "/results/compare/Growing%20Reasons";
  const filter = parseCropURLCompare(baseURL, useLocation().pathname, ["All"]);
  const [active, setActive] = useState(filter.crop1);
  const [active2, setActive2] = useState(filter.crop2);
  const [activeRegion1, setActiveRegion1] = useState(filter.region1);
  const [activeRegion2, setActiveRegion2] = useState(filter.region2);

  function changeFunc(newValue){
    setActive(newValue);
  }

  function changeFunc2(newValue){
    setActive2(newValue);
  }

  function changeRegion1Func(newValue){
    setActiveRegion1(newValue);
  }

  function changeRegion2Func(newValue){
    setActiveRegion2(newValue);
  }

  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }

  var titleText = DetermineTitleText(active, activeRegion1);
  var data_filtered = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active), activeRegion1), "Growers")
  var data_by_reason = AdjustColorAndNames(calculateAllPrimaryGrowingReasons(data_filtered, active))
  var responses = GetResponses(data_filtered, active)

  var titleText2 = DetermineTitleText(active2, activeRegion2);
  var data_filtered2 = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active2), activeRegion2), "Growers")
  var data_by_reason2 = AdjustColorAndNames(calculateAllPrimaryGrowingReasons(data_filtered2, active2))
  var responses2 = GetResponses(data_filtered2, active2)

  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    
    <div className='dual-display'>
        <OnlyCropsCompare changeFunc={changeFunc} changeFunc2={changeFunc2} changeRegion1Func={changeRegion1Func} changeRegion2Func={changeRegion2Func} active={active} active2={active2} activeRegion1={activeRegion1} activeRegion2={activeRegion2} baseAll={filter.baseAll}/>
        <div id="vis-a">
          <GetChart titleText={titleText} data_by_reason={data_by_reason} data_filtered={data_filtered} responses={responses}/>
        </div>
        <div id="vis-b">
          <GetChart titleText={titleText2} data_by_reason={data_by_reason2} data_filtered={data_filtered2} responses={responses2}/>
        </div>
    </div>
    </>  
  );
}