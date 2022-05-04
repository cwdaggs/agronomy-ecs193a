
import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCropOrRegion, filterByVocation} from '../UseData.js'
import "typeface-abeezee";
import React, { useState} from "react";
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';
    
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
  const mobileWidth = 1000;
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
  //const colorScale = ["#00471A", "#009141", "#02D46F"]; 
  // var colorScale = [   
  //   "#577B44",  
  //   "#90A770",
  //   "#C7BFA0",
  // ];
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
  var fontSize = 20
  var mobileFontSize = 6
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const legend_data = [{name: "Very Concerned"}, {name: "Somewhat Concerned"}, {name: "Not Concerned"}]

  return (
    <>
      <div id='vis-question-label'>
        <h3>In regards to the production of field crops in California, rate your concern for the following:</h3>
      </div>
      <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>

      <div class='visualization-window'>
      
        <VictoryChart
          horizontal={true}
          animate={{
              duration: 500,               
          }}
          height={height} 
          width={width}
          domainPadding={{ x: margin.right/10, y: margin.top/10 }}
          padding={{ top: (width>=mobileWidth)?margin.top:margin.top*2, bottom: margin.bottom, left: margin.left, right: (width>=mobileWidth)?margin.right:margin.right/2 }}   
        >
          <VictoryLegend 
                x={(width>=mobileWidth) ? (width/2 - margin.right): width/4}
                y={(width>=mobileWidth) ? (0):15}
                width={width-margin.left-margin.right}
                title={titleText}
                centerTitle
                orientation="horizontal"
                colorScale={colorScale}
                borderPadding = {{right: height/100}}
                gutter={20}
                style={{labels: {fill: "black", fontFamily: 'Roboto', fontSize: fontSize}, 
                        // border: { stroke: "black" }, 
                        title: {fontSize: fontSize }, 
                        data: {fontSize: fontSize, stroke: "black", strokeWidth: 1}}}
                data={legend_data}
              />
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 1}, fontFamily: 'Roboto'
            }}
            colorScale={colorScale}
          >
            {dataset.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => Math.round(datum.y) + "%"}
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:fontSize, fontFamily: 'Roboto'
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
                tickLabels: {fontSize: fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
            // label = "Concerns"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0, fontFamily: 'Roboto'},
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
    </>
  );
}