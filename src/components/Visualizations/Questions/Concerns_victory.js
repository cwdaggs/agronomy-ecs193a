
import { Background, VictoryTheme, VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCropOrRegion, filterByVocation, useData} from '../UseData.js'
import "typeface-abeezee";
import React, { useState, useEffect } from "react";
import { color } from 'd3';
    
// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: String(datum.Concern + " n = " + totals[i]), y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Concern };
    });
  });
}

export function ConcernsVictory(props) {
  if ((!props.dataset) || (!props.filter)) {
      return <pre>Loading...</pre>;
  }

  var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, props.filter), props.vocationFilter);
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_very(data_by_concern)
  const dataset = transformData(data_sorted);
  const width = 1920;
  const height = 1080;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };
  const colorScale = ["#00471A", "#009141", "#02D46F"];
  const fontSize = 20
  const legend_data = [{name: "Very Concerned"}, {name: "Somewhat Concerned"}, {name: "Not Concerned"}]

  return (
    <div class='visualization-window'>
    
      <VictoryChart
        horizontal={true}
        animate={{
            duration: 500,               
        }}
        height={height} 
        width={width}
        domainPadding={{ x: margin.right/10, y: margin.top/10 }}
        padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}   
      >
        <VictoryLegend 
              x={width/2 - 300}
              y={10}
              title="Level of Concern"
              centerTitle
              orientation="horizontal"
              colorScale={colorScale}
              borderPadding = {{right: 10}}
              gutter={20}
              style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: 20}, 
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
  );
}