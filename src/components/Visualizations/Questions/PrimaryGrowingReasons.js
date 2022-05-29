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

export function calculateAllPrimaryGrowingReasons(data, filter) {
  var columns = ["Alfalfa_Growing_Reasons", "Cotton_Growing_Reasons", "Rice_Growing_Reasons", "Wild_Rice_Growing_Reasons", "Wheat_Growing_Reasons", "Triticale_Growing_Reasons",	
                "Barley_Growing_Reasons",	"Oats_Growing_Reasons",	"Corn_Growing_Reasons",	"Sorghum_Growing_Reasons",	"Corn_Silage_Growing_Reasons", "Small_Grain_Silage_Growing_Reasons",
                "Small_Grain_Hay_Growing_Reasons", "Grass_and_Grass_Mixtures_Hay_Growing_Reasons",	"Grass_and_Grass_Mixtures_Pasture_Growing_Reasons",	"Sorghum_Sudangrass_Sudan_Growing_Reasons",	
                "Mixed_Hay_Growing_Reasons", "Dry_Beans_Growing_Reasons",	"Sunflower_Growing_Reasons", "Oilseeds_Growing_Reasons", "Sugar_Beets_Growing_Reasons", "Hemp_Growing_Reasons", "Other_Growing_Reasons"]

  const myMap = new Map()
  if (filter === "All" || filter === "") {
    var new_modified_data = []
    for (var col in columns) {
      var modified_data = calculatePrimaryGrowingReasons(data, columns[col])
      for (var item in modified_data) {
        let key_data = modified_data[item].x
        let value_data = modified_data[item].y
        if (key_data !== "NA") {
          myMap.has(key_data) ? myMap.set(key_data, myMap.get(key_data) + value_data) : myMap.set(key_data, value_data)
        }
      }
    }
    for (const [key, value] of myMap) {
      new_modified_data.push({x: key, y: value});
    }
    return new_modified_data
  } else {
    var new_filter = filter.split(' ').join('_') + "_Growing_Reasons"
    return calculatePrimaryGrowingReasons(data, new_filter)
  }
}
  
export function calculatePrimaryGrowingReasons(data, filter) {
  var modified_data = []
  const myMap = new Map()
  for (var farmer in data) {
    const reasons = String(data[farmer][filter]).split(',')
    for (var reason in reasons) {
      var key = reasons[reason]
      if (key === " water" || key === " land" || key === " capital" || key === " know-how" || key === " etc.)" || key === "I am limited by farm resources to grow other crops (equipment") {
        key = "Limited by farm resources"
      }
      if (key !== "NA") {
        myMap.has(key) ? myMap.set(key, myMap.get(key) + 1) : myMap.set(key, 1)
      }
    }
  }

  for (const [key, value] of new Map([...myMap].sort())) {
    if (key === "Limited by farm resources") {
      modified_data.push({x: key, y: value/6});
    } else {
      modified_data.push({x: key, y: value});
    }
  }

  return modified_data
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
    if (activeRegion === "NSJV") {
      titleText += " North San Joaquin Valley";
    }
    else if (activeRegion === "SSJV") {
      titleText += " South San Joaquin Valley";
    }
    else {
      titleText += " " + activeRegion;
    }
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
    if(props.data_filtered.length === 0){
      return (
        <>
          <p>Insufficient data for this set of filters. (n=0)</p>         
        </>
        )
    }
    return(
      <>
      <div class='visualization-window'>
            <VictoryChart horizontal={false} height={props.height} width={props.width}
              domainPadding={{ x: props.margin.right/5.3, y: props.margin.top }}
              padding={{top: props.margin.top, bottom: props.margin.bottom, left: props.margin.left, right: props.margin.right}}
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
                    fontSize: props.fontSize,
                    fontFamily: 'Roboto'
                  }}
                  constrainToVisibleArea={'true'}    
                />
            }
            />
            <VictoryAxis dependentAxis
            label = {String(props.titleText + " (n=" + props.n + ")")}
            style={{
              fontFamily: 'Roboto',
              tickLabels: {fontSize: props.fontSize, padding: 15, fontFamily: 'Roboto'},
              axisLabel: {fontSize: props.fontSize, fontFamily: 'Roboto', padding: (props.width >= props.mobileWidth) ? 60: 35}
            }}
            
            />
            <VictoryAxis
              label={props.labelText}
              style={{
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize, fontFamily: 'Roboto', padding: (props.width >= props.mobileWidth) ? 60: 20}
                }}

                tickLabelComponent={       
                  <VictoryLabel    
                      textAnchor="start"
                      angle={25}
                      style={{fill: "gray", fontSize: props.fontSize}}
                      
                  />   
                }
            />                        
          </VictoryChart>
      </div>
    </>
    )
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
  var data_by_reason = calculateAllPrimaryGrowingReasons(data_filtered, active)
  

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
    obj.fill = colorScale[counter];
    counter--;
  }

  // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  // const height = vw;
  // const width = vw;
  // var fontSize = 12
  // var mobileFontSize = 6
  // const mobileWidth = 1000;
  // const laptopWidth = 1500;
  // if(width < laptopWidth){
  //   fontSize = mobileFontSize*2
  // }
  // if(width < mobileWidth){
  //   fontSize = mobileFontSize;
  // }
  // const margin = { top: 0, right: 0, bottom: 0, left: 0 };

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const height = vw*0.5;
  const width = vw;
  const mobileWidth=1000;
  var fontSize = (width >= mobileWidth) ? 20: 10;
  const margin = { top: height/20, right: width/8, bottom: height/4, left: width/8 };


  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    <div className="inline-child">
      <OnlyCrops changeFunc={changeFunc} changeRegionFunc={changeRegionFunc} active={active} activeRegion={activeRegion} baseAll={filter.baseAll}/>
    </div>
      <GetChart titleText={titleText} mobileWidth={mobileWidth} width={width} height={height} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason} data_filtered={data_filtered}/>
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
  var data_by_reason = calculateAllPrimaryGrowingReasons(data_filtered, active)

  var titleText2 = DetermineTitleText(active2, activeRegion2);

  var data_filtered2 = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active2), activeRegion2), "Growers")
  var data_by_reason2 = calculateAllPrimaryGrowingReasons(data_filtered2, active2)

  // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const height = vw;
  // const width = vw;
  // var fontSize = 15
  // var mobileFontSize = 6
  // const mobileWidth = 1000;
  // const laptopWidth = 1500;
  // if(width < laptopWidth){
  //   fontSize = mobileFontSize*2
  // }
  // if(width < mobileWidth){
  //   fontSize = mobileFontSize;
  // }
  // const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const height = vw*0.5;
  const width = vw;
  const mobileWidth=1000;
  var fontSize = (width >= mobileWidth) ? 20: 10;
  const margin = { top: height/20, right: width/8, bottom: height/4, left: width/8 };


  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    
      <div className='dual-display'>
          <OnlyCropsCompare changeFunc={changeFunc} changeFunc2={changeFunc2} changeRegion1Func={changeRegion1Func} changeRegion2Func={changeRegion2Func} active={active} active2={active2} activeRegion1={activeRegion1} activeRegion2={activeRegion2} baseAll={filter.baseAll}/>
          <div id="vis-a">
            <GetChart titleText={titleText} mobileWidth={mobileWidth} width={width} height={height} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason} data_filtered={data_filtered}/>
          </div>
          <div id="vis-b">
            <GetChart titleText={titleText2} mobileWidth={mobileWidth} width={width} height={height} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason2} data_filtered={data_filtered2}/>
          </div>
      </div>
    </>  
  );
}