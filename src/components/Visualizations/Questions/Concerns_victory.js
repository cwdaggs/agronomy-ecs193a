
import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCropOrRegion, filterByVocation} from '../UseData.js'
import "typeface-abeezee";
import React, { useState} from "react";
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { parseURL, parseURLCompare } from '../UseData.js';
import { useLocation } from 'react-router-dom';
import "./Legends.css";
    
// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: String(datum.Concern), y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Concern };
    });
  });
}

function calculateAverageResponses(dataset) {
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  var sum = 0;
  for (var i = 0; i < totals.length; i++) {
    sum += totals[i];
  }
  return Math.round(sum / totals.length);
}

function GetChart(props){
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
          height={props.height} 
          width={props.width}
          domainPadding={{ x: props.margin.right/5, y: props.margin.top/10 }}
          padding={{ top: (props.width>=props.mobileWidth)?props.margin.top:props.margin.top*2, bottom: props.margin.bottom, left: props.margin.left/1.5, right: (props.width>=props.mobileWidth)?props.margin.right:props.margin.right/2 }}   
        >
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 1}, fontFamily: 'Roboto'
            }}
            colorScale={props.colorScale}
          >
            {props.dataset.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => Math.round(datum.y) + "%"}
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:props.fontSize, fontFamily: 'Roboto'
                      }}
                      flyoutHeight={25}
                      flyoutWidth={40}    
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
            // label = "Concerns"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                // axisLabel: {fontSize: 30, padding: 380}
              }}
            tickLabelComponent={       
              <VictoryLabel    
                  textAnchor="end"
              />   
            }
          />
        </VictoryChart>
      </div>
    </div>
  )
}

export function ConcernsVictory(props) {

  const crops = [
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

  const vocationArray = ["All", "Growers", "Consultants"];
  const baseURL = "/results/Production%20Concerns";
  const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionOrCropFunction(newValue) {
    setActiveRegionOrCrop(newValue);
  }  

  if ((!props.dataset)) {
      return <pre>Loading...</pre>;
  }

  var titleText = "Level of Concern";
  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for " + activeRegionOrCrop;
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeRegionOrCrop)) {
      titleText += " " + activeVocation;
    } else {
      titleText += " for " + activeVocation;
    }
  }
  if (!crops.includes(activeRegionOrCrop) && activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered);
  var data_sorted = sort_by_very(data_by_concern);
  const dataset = transformData(data_sorted);
  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };

  var colorScale = 
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
  var fontSize = 18
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const legend_data = [{name: "Very Concerned"}, {name: "Somewhat Concerned"}, {name: "Not Concerned"}]

  return (
    <>
      <div id='vis-question-label'>
        <h2>In regards to the production of field crops in California, rate your concern for the following:</h2>
      </div>
      <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <GetChart titleText={titleText} dataset={dataset} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin}/>
    </>
  );
}

export function ConcernsVictoryCompare(props) {

  const crops = [
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

  const vocationArray = ["All", "Growers", "Consultants"];
  const baseURL = "/results/compare/Production%20Concerns";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);
  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
  const [activeRegionOrCrop2, setActiveRegionOrCrop2] = useState(filters.cropOrRegion2);

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionOrCropFunction(newValue) {
    setActiveRegionOrCrop(newValue);
  }  

  function vocationFunction2(newValue){
    setActiveVocation2(newValue);
  }

  function regionOrCropFunction2(newValue) {
    setActiveRegionOrCrop2(newValue);
  }  

  if ((!props.dataset)) {
      return <pre>Loading...</pre>;
  }

  var titleText2 = "Level of Concern";
  if (crops.includes(activeRegionOrCrop2)) {
    titleText2 += " for " + activeRegionOrCrop2;
  }
  if (activeVocation2 !== "All") {
    if (crops.includes(activeRegionOrCrop2)) {
      titleText2 += " " + activeVocation2;
    } else {
      titleText2 += " for " + activeVocation2;
    }
  }
  if (!crops.includes(activeRegionOrCrop2) && activeRegionOrCrop2 !== "All") {
    titleText2 += " in the " + activeRegionOrCrop2 + " Region";
  }

  var titleText = "Level of Concern";
  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for " + activeRegionOrCrop;
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeRegionOrCrop)) {
      titleText += " " + activeVocation;
    } else {
      titleText += " for " + activeVocation;
    }
  }
  if (!crops.includes(activeRegionOrCrop) && activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data2 = props.dataset

  var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered);
  var data_sorted = sort_by_very(data_by_concern);
  const dataset = transformData(data_sorted);

  var data_filtered2 = filterByVocation(filterByCropOrRegion(data2, activeRegionOrCrop2), activeVocation2);
  var data_by_concern2 = calculateConcernTotalsForEachElement(data_filtered2);
  var data_sorted2 = sort_by_very(data_by_concern2);
  const dataset2 = transformData(data_sorted2);

  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";
  titleText2 += " (n = " + calculateAverageResponses(data_sorted2) + ")";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/20, right: width/16, bottom: height/8, left: width/6 };
  
  var colorScale = 
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
  var fontSize = 25
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2.5
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const legend_data = [{name: "Very Concerned"}, {name: "Somewhat Concerned"}, {name: "Not Concerned"}]

  return (
    <>
      <div id='vis-question-label'>
        <h2>In regards to the production of field crops in California, rate your concern for the following:</h2>
      </div>
      <div className="inline-child">
      <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <div className='dual-display'>

          <GetChart titleText={titleText} dataset={dataset} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin}/>
          <GetChart titleText={titleText2} dataset={dataset2} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin}/>

      </div>
    </>
  );
}