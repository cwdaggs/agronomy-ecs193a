import {VictoryBar, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, filterByCrop, trendLineSatisfactions } from '../UseData';
import * as d3 from 'd3'
import React, {useState} from 'react';

function getScatterData(dataset, filter) {

  var data_filtered = filterByCrop(dataset, filter)
  var data = averageSatisfaction(data_filtered)

  return data
}

function getTrendLineData(dataset, filter) {

  var data_filtered = filterByCrop(dataset, filter)
  var data = averageSatisfaction(data_filtered)

  var trendData = trendLineSatisfactions(data)

  return trendData
}

function handleZoom(domain, state) {
  state.selectedDomain = domain
}

function handleBrush(domain, state) {
  state.zoomDomain = domain
}

export const PrioritySatisfactionScatter = ({dataset, filter}) => {

  if (!dataset) {
    return <pre>Loading...</pre>;
  }

  const width = 250;
  const height = 100;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };

  const fontSize = 2

  var data = getScatterData(dataset, filter)
  var trendData = getTrendLineData(dataset, filter)

  var state = {
    data: data,
    trendData: trendData,
    selectedDomain: null,
    zoomDomain: null
  }
  var domain = d3.extent(state.data, function(d) { return d.Priority; })
  var range = d3.extent(state.data, function(d) { return d.Satisfaction; })
  var domainPadding = 0.1

  state.selectedDomain = domain

return (
  <div>
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [domain[0] - domainPadding, domain[1] + domainPadding], y: [range[0] - domainPadding, range[1] + domainPadding] }}
      animate={{
        duration: 500,               
      }}
      height={height} 
      width={width}
      domainPadding={{ x: margin.right/10, y: margin.top/10 }}
      padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}  
      containerComponent={
        <VictoryBrushContainer responsive={false}/>
      }
    >
      <VictoryScatter
        x={(d) => d.Priority}
        y={(d) => d.Satisfaction}
        style={{
          data: {
            fill: "#c43a31",
            stroke: "#756f6a",
            fillOpacity: 0.7,
            strokeWidth: 0.5
          },
          axis: {stroke: "#756f6a"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: fontSize, padding: 5}
        }}
        size={1}
        data={state.data}

      />
      <VictoryAxis dependentAxis
        label="Satisfaction"
        tickFormat={(tick) => `${tick}`}
        style={{
          axis: {stroke: "#756f6a"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: fontSize, padding: 5},
          axisLabel: {fontSize: fontSize*2, padding: 15 }
        }}
      />
      <VictoryAxis
        label="Importance"
        style={{
          axis: {stroke: "#756f6a"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: fontSize, padding: 0},
          axisLabel: {fontSize: fontSize*2 }
        }}
      />
    </VictoryChart>
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [domain[0] - domainPadding, domain[1] + domainPadding], y: [range[0] - domainPadding, range[1] + domainPadding] }}
      animate={{
        duration: 500,               
      }}
      height={height} 
      width={width}
      domainPadding={{ x: margin.right/10, y: margin.top/10 }}
      padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}  
    >
      <VictoryScatter
        x={(d) => d.Priority}
        y={(d) => d.Satisfaction}
        style={{
          data: {
            fill: "#c43a31",
            stroke: "#756f6a",
            fillOpacity: 0.7,
            strokeWidth: 0.5
          },
          axis: {stroke: "#756f6a"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: fontSize, padding: 5}
        }}
        size={1}
        data={state.data}
        labels={({datum}) => datum.Topic + "\nSatisfaction Avg: " + String(datum.Satisfaction).substring(0, 3) + "\nPriority Avg: " + String(datum.Priority).substring(0,3)}
        labelComponent={
          <VictoryTooltip 
            style={{
              fontSize:fontSize
            }}
            flyoutHeight={10}
            flyoutWidth={30}
            dy={-3}    
          />
        }

      />
      <VictoryAxis dependentAxis
        label="Satisfaction"
        tickFormat={(tick) => `${tick}`}
        style={{
          axis: {stroke: "#756f6a"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: fontSize, padding: 5},
          axisLabel: {fontSize: fontSize*2, padding: 15 }
        }}
      />
      <VictoryAxis
        label="Importance"
          style={{
            axis: {stroke: "#756f6a"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: fontSize, padding: 0},
            axisLabel: {fontSize: fontSize*2 }
          }}
      />
      
      <VictoryLine
            
        style={{ 
          data: { 
            stroke: "#756f6a", 
            strokeWidth:0.3, 
            strokeLinecap: "round" 
          } 
        }}
        events={[{
          target: "parent",
          eventHandlers: {
            onMouseOver: () => {
              return [
                {
                  target: "data",
                  eventKey: "all",
                  mutation: ({ style }) => {
                    return style.stroke === "red"
                      ? null
                      : { style: { stroke: "black", strokeWidth: 1 } };
                  }
                },
              ];
            },
            onMouseOut: () => {
              return [
                {
                  target: "data",
                  eventKey: "all",
                  mutation: ({style}) => {
                    return style.stroke === "red"
                    ? null
                    : { style: { stroke: "#756f6a", strokeWidth: 0.3 } };;
                  }
                }];
            }
          }
        }]}
        x={(d) => d.x}
        y={(d) => d.y}
        data={state.trendData}
      />
      
    </VictoryChart>

    <VictoryChart
      theme={VictoryTheme.material}
      animate={{
        duration: 500,               
      }}
      height={height} 
      width={width}
      domainPadding={{ x: margin.right/10, y: margin.top/10 }}
      padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}      

    >
      <VictoryBar
        barRatio={0.8}
        style={{
          data: { fill: "red" }
        }}
        data={state.data}
        x={(d) => d.Topic}
        y={(d) => d.Satisfaction_votes}
      />
      <VictoryBar
        barRatio={0.8}
        style={{
          data: { fill: "blue" }
        }}
        data={state.data}
        x={(d) => d.Topic}
        y={(d) => d.Priority_votes}
      />    
    </VictoryChart> 

  </div>
)};
