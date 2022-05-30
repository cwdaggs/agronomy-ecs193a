import {filterByCrop, filterByCropOrRegion, filterByRegion, filterByVocation, parseCropURLCompare} from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {OnlyCrops, OnlyCropsCompare} from "../Menus/OnlyCrops.js"
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { map } from "d3";

  function calculateAllPrimaryGrowingReasons(data, filter) {

    var columns = [filter.split(' ').join('_') + "_Growing_Reasons"]
    let modified_data = [];
    if(filter === "All"){
      columns = ["Alfalfa_Growing_Reasons", "Cotton_Growing_Reasons", "Rice_Growing_Reasons", "Wild_Rice_Growing_Reasons", "Wheat_Growing_Reasons", "Triticale_Growing_Reasons",	
                  "Barley_Growing_Reasons",	"Oats_Growing_Reasons",	"Corn_Growing_Reasons",	"Sorghum_Growing_Reasons",	"Corn_Silage_Growing_Reasons", "Small_Grain_Silage_Growing_Reasons",
                  "Small_Grain_Hay_Growing_Reasons", "Grass_and_Grass_Mixtures_Hay_Growing_Reasons",	"Grass_and_Grass_Mixtures_Pasture_Growing_Reasons",	"Sorghum_Sudangrass_Sudan_Growing_Reasons",	
                  "Mixed_Hay_Growing_Reasons", "Dry_Beans_Growing_Reasons",	"Sunflower_Growing_Reasons", "Oilseeds_Growing_Reasons", "Sugar_Beets_Growing_Reasons", "Hemp_Growing_Reasons", "Other_Growing_Reasons"]
    } 
 
   const myMap = new Map()

   data.forEach(farmer => {
    const reasons = new Set(); 
    columns.forEach(crop =>{
      farmer[crop].split(",").forEach(reason => {
        if((String(reason) !== "NA") && (String(reason) !== "")){
          if(reason === "I am limited by farm resources to grow other crops (equipment" || reason ===  " water" || reason ===  " land" || reason === " capital" || reason === " know-how" || reason === " etc.)"){
            reasons.has("Limited by farm resources") ? console.log("duplicate") : reasons.add("Limited by farm resources")
          }else{
            reasons.has(reason) ? console.log("duplicate") : reasons.add(reason)
          }
        }
      });
      console.log(reasons)
    });
    reasons.forEach(reason => {
      //console.log(reasons)
      myMap.has(reason) ? myMap.set(reason, myMap.get(reason) + 1) : myMap.set(reason, 1)
    })
   });
   for (const [key, value] of new Map([...myMap].sort())) {
      modified_data.push({x: key, y: value});
    }
   return modified_data;
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
  

function GetChart(props){
  var toolTipFontSize = props.fontSize * 4
  return(
    <div class='visualization-window'>
          <div class='flex-parent'>
            <div class='flex-child'>
                <VictoryLegend      
                  x={150}
                  y={0}     
                    colorScale={props.colorScale}
                    gutter={20}
                    style={{labels: {fill: "black", fontFamily: 'Roboto', fontSize: 12}, 
                            title:  {fontFamily: 'Roboto', fontSize: 12},
                            data:   {stroke: "black", strokeWidth: 1}}}
                    title={String(props.titleText + " (n=" + props.n + ")")}
                    centerTitle
                    data={props.legend_data}
                />
                </div>
                <div class='flex-child'>
                <VictoryPie
                    animate={{
                      duration: 500,               
                    }}
                    width={props.width}
                    height={props.height/2}
                    padding={{
                      left: props.margin.left,
                        right: props.margin.right,
                        bottom: props.margin.bottom,
                        top: props.margin.top
                    }}
                    style={{ data: { stroke: "black", strokeWidth: 1}}}
                    colorScale={props.colorScale}
                    data={props.data_by_reason}
                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    labelComponent={<VictoryTooltip 
                        style={{
                          fontSize: toolTipFontSize,
                          fontFamily: 'Roboto'
                        }}
                        constrainToVisibleArea={'true'}    
                    />}
                />
            </div>
        </div>
      </div>
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
  if (active === "All") {
    if (activeRegion === "All") {
      titleText += "All";
    }
    titleText += " Crops"
  } else {
    titleText +=  " " + active;
  }

  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, active), activeRegion), "Growers")
  var data_by_reason = calculateAllPrimaryGrowingReasons(data_filtered, active)
  var legend_data = []

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw;
  const width = vw;
  var fontSize = 12
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };

  for (var i = 0; i < data_by_reason.length; i++) {
      legend_data.push({name: data_by_reason[i].x})
  }
  var n = data_filtered.length;

    var colorScale = 
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
  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    <div className="inline-child">
      <OnlyCrops changeFunc={changeFunc} changeRegionFunc={changeRegionFunc} active={active} activeRegion={activeRegion} baseAll={filter.baseAll}/>
    </div>

    <GetChart titleText={titleText} mobileWidth={mobileWidth} width={width} height={height} n={n} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason} colorScale={colorScale} legend_data={legend_data}/>
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

  var titleText = "";
  if (activeRegion1 !== "All") {
    if (activeRegion1 === "NSJV") {
      titleText += " North San Joaquin Valley";
    }
    else if (activeRegion1 === "SSJV") {
      titleText += " South San Joaquin Valley";
    }
    else {
      titleText += " " + activeRegion1;
    }
  }
  if (active === "All") {
    if (activeRegion1 === "All") {
      titleText += "All";
    }
    titleText += " Crops"
  } else {
    titleText +=  " " + active;
  }

  var data_filtered = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active), activeRegion1), "Growers")
  var data_by_reason = calculateAllPrimaryGrowingReasons(data_filtered, active)
  var legend_data = []
  var n = 0

  var titleText2 = "";
  if (activeRegion2 !== "All") {
    if (activeRegion2 === "NSJV") {
      titleText2 += " North San Joaquin Valley";
    }
    else if (activeRegion2 === "SSJV") {
      titleText2 += " South San Joaquin Valley";
    }
    else {
      titleText2 += " " + activeRegion2;
    }
  }
  if (active2 === "All") {
    if (activeRegion2 === "All") {
      titleText2 += "All";
    }
    titleText2 += " Crops"
  } else {
    titleText2 +=  " " + active2;
  }

  var data_filtered2 = filterByVocation(filterByCropOrRegion(filterByCropOrRegion(props.dataset, active2), activeRegion2), "Growers")
  var data_by_reason2 = calculateAllPrimaryGrowingReasons(data_filtered2, active2)
  var legend_data2 = []
  var n2 = 0

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw;
  const width = vw;
  var fontSize = 15
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };

  for (var i = 0; i < data_by_reason.length; i++) {
      legend_data.push({name: data_by_reason[i].x})
  }
  n = data_filtered.length;

  for (i = 0; i < data_by_reason2.length; i++) {
    legend_data2.push({name: data_by_reason2[i].x})
  }
  n2 = data_filtered2.length;

    var colorScale = 
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
  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the primary reasons you grow the following field crops?</h2>
    </div>
    
      <div className='dual-display'>
          <OnlyCropsCompare changeFunc={changeFunc} changeFunc2={changeFunc2} changeRegion1Func={changeRegion1Func} changeRegion2Func={changeRegion2Func} active={active} active2={active2} activeRegion1={activeRegion1} activeRegion2={activeRegion2} baseAll={filter.baseAll}/>
          <div id="vis-a">
            <GetChart titleText={titleText} mobileWidth={mobileWidth} width={width} height={height} n={n} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason} colorScale={colorScale} legend_data={legend_data}/>
          </div>
          <div id="vis-b">
            <GetChart titleText={titleText2} mobileWidth={mobileWidth} width={width} height={height} n={n2} fontSize={fontSize} margin={margin} data_by_reason={data_by_reason2} colorScale={colorScale} legend_data={legend_data2}/>
          </div>
      </div>
    </>  
  );
}