import {VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByVocation, filterByRegion, filterByCrop} from '../UseData.js'
import React, { useState} from "react";
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { parseURL, parseURLCompare } from '../UseData.js';
import { useLocation } from 'react-router-dom';
import "./Legends.css";
    
const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];
const colorScale = 
  [  
    "#003F72",   
    "#00728C",
    "#00A498",
    "#01AC90",
    "#02B488",
    "#15BC80",
    "#29C37A",
    "#3DCA77",
    "#52D176",
    "#66D779",
    "#7ADE7F",
    "#8FE48F",
    "#A9E9A3",
    "#C3EFB8",
    "#D8F4CC"
  ]

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
const mobileWidth = 1000;
const laptopWidth = 1500;

// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  for (var i = 0; i < totals.length; i++) {
    if (totals[i] === 0) {
      totals[i] = 1;
    }
  }
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: String(datum.Concern), y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Concern };
    });
  });
}

// function calculateAverageResponses(dataset) {
//   const totals = dataset[0].map((data, i) => {
//     return dataset.reduce((memo, curr) => {
//       return memo + curr[i].Total;
//     }, 0);
//   });
//   var sum = 0;
//   for (var i = 0; i < totals.length; i++) {
//     sum += totals[i];
//   }
//   return Math.round(sum / totals.length);
// }

function GetResponses(data){
  var topics = ["Concern_Air_Quality","Concern_Changing_Weather_and_Climate","Concern_Chemical_Regulations",
  "Concern_Commodity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
  "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"]

  //console.log(data);
  var amount = 0
  for (var j in data){

    if(data[j][String(topics[0])] === "NA"){
      for (var i in topics){
        if(data[j][String(topics[i])] !== "NA"){
          amount += 1;
          break;
        }
      }
    }else{
      amount += 1;
    }    
  }
  //console.log(amount)
  return amount;
}

function GetChart(props){
  if(props.data.length === 0){
    return (
      <div className='dual-display-child'>
        <div id="vis-legend">
          <div id="legend-title">
            {props.titleText}
          </div>
          <div id="legend-values">
            <div className='legend-circle' id="three-color-first"></div>
            <span className='legend-value'>Very Concerned</span>
            <div className='legend-circle' id="three-color-second"></div>
            <span className='legend-value'>Somewhat Concerned</span>
            <div className='legend-circle' id="three-color-third"></div>
            <span className='legend-value'>Not Concerned</span>
          </div>
        </div>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }

  return(
    <div className='dual-display-child'>
      <div id="vis-legend">
        <div id="legend-title">
          {props.titleText}
        </div>
        <div id="legend-values">
          <div className='legend-circle' id="three-color-first"></div>
          <span className='legend-value'>Very Concerned</span>
          <div className='legend-circle' id="three-color-second"></div>
          <span className='legend-value'>Somewhat Concerned</span>
          <div className='legend-circle' id="three-color-third"></div>
          <span className='legend-value'>Not Concerned</span>
        </div>
      </div>
      <div class='visualization-window'>
        <VictoryChart
          horizontal={true}
          animate={{
              duration: 500,               
          }}
          height={height} 
          width={width}
          domainPadding={{ x: margin.right/5, y: margin.top/10 }}
          padding={{ top: (width>=mobileWidth)?margin.top:margin.top*2, bottom: margin.bottom, left: margin.left/1.5, right: (width>=mobileWidth)?margin.right:margin.right/2 }}   
        >
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 1}, fontFamily: 'Roboto'
            }}
            colorScale={colorScale}
          >
            {props.dataset.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => datum.concern + ": " + Math.round(datum.y) + "%"}
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:props.fontSize, fontFamily: 'Roboto'
                      }}
                      constrainToVisibleArea={'true'}     
                    />
                }/>;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis
            tickFormat={(tick) => `${tick}%`}
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
              }}
            tickLabelComponent={       
              <VictoryLabel    
                  textAnchor="start"
                  style={{fill: "white", fontSize: props.fontSize}}
                  dx={props.fontSize}
              />   
            }
          />
        </VictoryChart>
      </div>
    </div>
  )
}

function DetermineTitleText(activeVocation, activeCrop, activeRegion, responses) {
  var titleText = "Level of Concern";
  if (activeCrop !== "All" || activeVocation !== "All") {
    titleText += " for";
  }
  if (activeCrop !== "All") {
    if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
      titleText += " " + activeCrop;
    }
  }
  if (activeVocation !== "All") {
    if (activeVocation === "Other") {
      titleText += " Other Vocations";
    } else {
      titleText += " " + activeVocation;
    }
  }
  if (activeRegion !== "All") {
    if (activeRegion === "NSJV") {
      titleText += " in the North San Joaquin Valley Region";
    }
    else if (activeRegion === "SSJV") {
      titleText += " in the South San Joaquin Valley Region";
    }
    else {
      titleText += " in the " + activeRegion + " Region";
    }
  }
  titleText += " (n = " + responses + ")";
  return titleText
}

function DetermineFontSize() {
  var fontSize = 22
  const mobileFontSize = 8
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  return fontSize
}

export function ConcernsVictory(props) {
  const baseURL = "/results/Production%20Concerns";
  const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegion, setActiveRegion] = useState(filters.region);
  const [activeCrop, setActiveCrop] = useState(filters.crop);

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionFunction(newValue) {
    setActiveRegion(newValue);
  }  

  function cropFunction(newValue) {
    setActiveCrop(newValue);
  }  

  if ((!props.dataset)) {
      return <pre>Loading...</pre>;
  }

  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered);
  var data_sorted = sort_by_very(data_by_concern);
  const dataset = transformData(data_sorted);
  var responses = GetResponses(data_filtered)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses)
  var fontSize = DetermineFontSize()
  //console.log(data_filtered)
  //console.log(data_by_concern)


  //console.log(responses)

  return (
    <>
      <div id='vis-question-label'>
        <h2>In regards to the production of field crops in California, rate your concern for the following:</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <GetChart titleText={titleText} dataset={dataset} fontSize={fontSize} data={data_filtered}/>
    </>
  );
}

export function ConcernsVictoryCompare(props) {
  const baseURL = "/results/compare/Production%20Concerns";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);

  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegion, setActiveRegion] = useState(filters.region);
  const [activeCrop, setActiveCrop] = useState(filters.crop);

  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
  const [activeRegion2, setActiveRegion2] = useState(filters.region2);
  const [activeCrop2, setActiveCrop2] = useState(filters.crop2);

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionFunction(newValue) {
    setActiveRegion(newValue);
  }  

  function cropFunction(newValue) {
    setActiveCrop(newValue);
  }
  
  function vocationFunction2(newValue){
    setActiveVocation2(newValue);
  }

  function regionFunction2(newValue) {
    setActiveRegion2(newValue);
  }  

  function cropFunction2(newValue) {
    setActiveCrop2(newValue);
  }  

  if ((!props.dataset)) {
      return <pre>Loading...</pre>;
  }

  // Data previously sorted by very after by_concern
  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered);
  const dataset = transformData(data_by_concern);
  var responses = GetResponses(data_filtered)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses)

  var data_filtered2 = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), activeVocation2);
  var data_by_concern2 = calculateConcernTotalsForEachElement(data_filtered2);
  const dataset2 = transformData(data_by_concern2);
  var responses2 = GetResponses(data_filtered2)
  var titleText2 = DetermineTitleText(activeVocation2, activeCrop2, activeRegion2, responses2)
  
  var fontSize = DetermineFontSize()

  return (
    <>
      <div id='vis-question-label'>
        <h2>In regards to the production of field crops in California, rate your concern for the following:</h2>
      </div>

      <div className='dual-display'>
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
          <div id="vis-a">
            <GetChart titleText={titleText} dataset={dataset} fontSize={fontSize} compare={true} data={data_filtered}/>
          </div>
          <div id="vis-b">
            <GetChart titleText={titleText2} dataset={dataset2} fontSize={fontSize} compare={true} data={data_filtered2}/>
          </div>
      </div>
    </>
  );
}