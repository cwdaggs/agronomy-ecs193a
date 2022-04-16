
import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCropOrRegion, filterByVocation} from '../UseData.js'
import "typeface-abeezee";
import React, { useState} from "react";
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
    
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

export function ConcernsVictory(props) {

  const vocationArray = ["All", "Growers", "Consultants"];

  const [activeVocation, setActiveVocation] = useState("All");
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState("All");

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionOrCropFunction(newValue) {
    setActiveRegionOrCrop(newValue);
  }  

  if ((!props.dataset)) {
      return <pre>Loading...</pre>;
  }
  var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered);
  var data_sorted = sort_by_very(data_by_concern);
  const dataset = transformData(data_sorted);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const mobileWidth = 1000;
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
  const colorScale = ["#00471A", "#009141", "#02D46F"];
  var fontSize = 20
  var mobileFontSize = 6
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  const legend_data = [{name: "Very Concerned"}, {name: "Somewhat Concerned"}, {name: "Not Concerned"}]

  return (
    <>
      <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
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
                title="Level of Concern"
                centerTitle
                orientation="horizontal"
                colorScale={colorScale}
                borderPadding = {{right: height/100}}
                gutter={20}
                style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: fontSize}, 
                        // border: { stroke: "black" }, 
                        title: {fontSize: fontSize }, 
                        data: {fontSize: fontSize, stroke: "black", strokeWidth: 1}}}
                data={legend_data}
              />
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 1}
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
                        fontSize:fontSize
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
                tickLabels: {fontSize: fontSize, padding: 5}
              }}
          />
          <VictoryAxis
            // label = "Concerns"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0},
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