import {VictoryLegend, VictoryBar, VictorySelectionContainer, VictoryAxis, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, filterByCropOrRegion, trendLineSatisfactions, filterByVocation, parseURLCompare, filterByRegion, filterByCrop } from '../UseData';
import * as d3 from 'd3'
import React, { useState } from "react";
import "typeface-abeezee";
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';

function barData(dataset, topic){
  var values = []

  for(var i = 0; i < dataset.length; i++){
    values.push({x: String(dataset[i].Topic.split('_').join(" ")), y: dataset[i].Priority, z: dataset[i].Satisfaction})
  }

  return values.sort((a,b) => a.y-b.y)
}


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const height = vw*0.5;
const width = vw;
const margin = { top: height/8, right: width/8, bottom: height/6, left: width/4 };

const mobileWidth = 1000;
var fontSize = 20
var mobileFontSize = 10
if(width < mobileWidth){
  fontSize = mobileFontSize;
}


function GetChart(props){

  const [vis,setVis]=useState(<p id="vis-question-label">Click and drag on an area of points for more information.</p>);
  
  var domain = d3.extent(props.data, function(d) { return d.Priority; })
  var range = d3.extent(props.data, function(d) { return d.Satisfaction; })
  var domainPadding = 0.1

  var trendData = trendLineSatisfactions(props.data)
  var selectedData = props.data
  
  function makeVis(data){
    setVis(
      ( 
        <div>
         <h5><br></br><br></br><br></br>Selected Node's Average Priority/Satisfaction of Information Delivery on Topic as Surplus/Deficiency:</h5>
          <VictoryChart 
            x={50}
            animate={{
              duration: 500,               
            }}
            height={height} 
            width={width}
            domainPadding={{ x: margin.right/5, y: margin.top/10 }}
            padding={{ top: margin.top, bottom: margin.bottom, left: margin.left/1.5, right: margin.right }}
            
          >
          <VictoryLegend 
            x={(width>=mobileWidth)?width/5.4+ margin.left:0}
            title="Satisfaction of Information Availability"
            centerTitle
            orientation="horizontal"
            itemsPerRow={3}
            gutter={30}
            style={{labels: {fill: "black", fontFamily: 'Roboto', fontSize: fontSize}, 
                    // border: { stroke: "black" }, 
                    title: {fontSize: fontSize + 4, fontFamily: 'Roboto'  }, 
                    data: {fontSize: fontSize, fontFamily: 'Roboto', stroke: "black", strokeWidth: 1}}}
            data={[
              { name: "Meeting Information Demand", symbol: { fill: "green", type:"square"} },
              { name: "Exceeding Information Demand", symbol: { fill: "green", fillOpacity:0.5, type:"square" } },
              { name: "Not Meeting Information Demand", symbol: { fill: "tomato", fillOpacity:0.7, type:"square" } }
              
            ]}
          />
          <VictoryBar horizontal
            alignment='start'
            labels={({datum}) => "Priority of " + datum.x.split('_').join(" ") + "\n" + datum.y.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                orientation={"bottom"}
                pointerOrientation={"top"}
                  style={{
                    fontSize:fontSize-3,
                    strokeWidth:1,
                    fontFamily: 'Roboto'
                  }}
                  flyoutHeight={40}
                  flyoutWidth={345}    
                />
            }
            style={{ 
              data: { 
                fill: "#c43a31",
                stroke: "#756f6a",
                fillOpacity: 0.7,
                strokeWidth: 0.5
              } 
            }}
            data={data}
          />
          <VictoryBar horizontal
            alignment='start'
            labels={({datum}) => "Satisfaction of " + datum.x.split('_').join(" ") + "\n" + datum.z.toFixed(2) + "\nPriority of " + datum.x.split('_').join(" ") + "\n" + datum.y.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                orientation={"bottom"}
                pointerOrientation={"top"}
                  style={{
                    fontSize:fontSize-3,
                    strokeWidth: 1,
                    fontFamily: 'Roboto'
                  }}
                  flyoutHeight={100}
                  flyoutWidth={400}    
                />
            }
            style={{ 
              data: { 
                fill: "green",
                stroke: "#756f6a",
                fillOpacity: 0.7,
                strokeWidth: 0.5 
              } 
            }}
            data={data}
            y={(d)=>d.z}
          />
          <VictoryAxis dependentAxis
            label="Ranking"
            tickFormat={(tick) => `${tick}`}
            style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 5, fontFamily: 'Roboto'},
              axisLabel: {fontSize: fontSize, fontFamily: 'Roboto'}
            }}
          />
          <VictoryAxis
            style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0, fontFamily: 'Roboto'}
            }}
          />
        </VictoryChart>
      </div>
      )
    )
  }

  function handleSelection(points, bounds, props){
    selectedData = (barData(props.selectedData[0].data))
    makeVis(selectedData)
    
  }

  function handleSelectionCleared(props){}  
  return(
      <div class='visualization-window'>
            <VictoryChart 
                containerComponent=
                  {<VictorySelectionContainer
                    onSelection={(points, bounds, props) => handleSelection(points, bounds, props)}
                    onSelectionCleared={(props) => handleSelectionCleared(props)}
                  />}
                theme={VictoryTheme.material}
                domain={{ x: [Math.min(domain[0], range[0]) - domainPadding, Math.max(domain[1], range[1]) + domainPadding], y: [Math.min(domain[0], range[0]) - domainPadding, Math.max(domain[1], range[1]) + domainPadding] }}
                animate={{
                    duration: 500,               
                }}
                height={height} 
                width={width}
                domainPadding={{ x: margin.right/10, y: margin.top/10 }}
                padding={{ top: margin.top, bottom: margin.bottom, left:width/3.2, right: margin.right }}  
                
            >
            <VictoryLegend 
              x={(width>=mobileWidth) ? width*.1 :0}
              y={(width>=mobileWidth) ? height*.1 :0}
              title="Legend"
              centerTitle
              orientation="vertical"
              gutter={(width>=mobileWidth) ? 50 : 5}
              style={{ border: { stroke: "black" }, 
                       title: {fontSize: fontSize, fontFamily: 'Roboto' }, 
                       labels: {fontSize: fontSize, fontFamily: 'Roboto'}}}
              data={[
                { name: "Topic of Interest", symbol: { fill: "tomato", stroke: "#756f6a"} },
                { name: "Average Priority/Satisfaction overall", symbol: { fill: "red", type:"square" } },
                
              ]}
            />
            <VictoryScatter
                x={(d) => d.Priority}
                y={(d) => d.Satisfaction}
                style={{
                    data: {
                        fill: ({ active }) => active ? "#285f1e" : "#c43a31",
                        stroke: "#756f6a",
                        fillOpacity: ({ active }) => active ? 1 : 0.7,
                        strokeWidth: 1
                    },
                    axis: {stroke: "#756f6a"},
                    ticks: {stroke: "grey", size: fontSize},
                    tickLabels: {fontSize: fontSize, padding: 5}, 
                    fontFamily: 'Roboto'
                  }}
                size={(width>=mobileWidth) ? fontSize/2 : fontSize/5}
                data={props.data}
                labels={({datum}) => datum.Topic.split('_').join(' ') + "\nSatisfaction Avg: " + String(datum.Satisfaction).substring(0, 4) + "\nPriority Avg: " + String(datum.Priority).substring(0,4)}
                labelComponent={
                    <VictoryTooltip 
                        style={{
                          fontSize:fontSize-5,
                          strokeWidth:0.1,
                          fontFamily: 'Roboto'
                        }}
                        flyoutHeight={60}
                        flyoutWidth={270}    
                    />
                    
                }
                
                onMouseEnter={(props) => props.style.data.stroke = "black"}
                onMouseLeave={(props) => props.style.data.stroke = "#756f6a"}

                />
                <VictoryAxis dependentAxis
                    label="Satisfaction"
                    tickFormat={(tick) => `${tick}`}
                    style={{
                        axis: {stroke: "#756f6a"},
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: {fontSize: fontSize, padding: 0},
                        axisLabel: {fontSize: (width>=mobileWidth) ? fontSize*2 : fontSize, fontFamily: 'Roboto', padding: 60 }
                        }}
                />
                <VictoryAxis
                    label="Priority"
                    style={{
                        axis: {stroke: "#756f6a"},
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: {fontSize: fontSize, padding: 0},
                        axisLabel: {fontSize: (width>=mobileWidth) ? fontSize*2 : fontSize, fontFamily: 'Roboto', padding: (width>=mobileWidth) ? 60 : 35 }
                        }}
                />
            <VictoryLine horizontal
              style={{ 
                data: { 
                    stroke: "red", 
                    strokeWidth: 2, 
                    strokeLinecap: "round" 
                } 
              }}
              x={(d) => d.x}
              y={(d) => d.y}
              data={trendData[2]}
            />

            <VictoryLine

              style={{ 
                data: { 
                    stroke: "red", 
                    strokeWidth: 2, 
                    strokeLinecap: "round" 
                } 
              }}
              data={trendData[1]}
              x={(d) => d.x}
              y={(d) => d.y}
            />
            <VictoryLine
                
                style={{ 
                    data: { 
                        stroke: "#756f6a", 
                        strokeWidth:3, 
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
                                : { style: { stroke: "black", strokeWidth: 5 } };
                            }
                          },
                        ];
                      },
                      onMouseOut: () => {
                        return [{
                          target: "data",
                          eventKey: "all",
                          mutation: ({style}) => {
                            return style.stroke === "red"
                            ? null
                            : { style: { stroke: "#756f6a", strokeWidth: 3 } };;
                          }
                        }];
                      }
                    }
                  }]
                }
                x={(d) => d.x}
                y={(d) => d.y}
                data={trendData[0]}
            />
          </VictoryChart>
          {vis}
      </div>
  )
}


export const PrioritySatisfaction = (props) => {

    const vocationArray = ["All", "Growers", "Consultants"];

    const baseURL = "/results/Priority%20Satisfaction";
    const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
    const [activeVocation, setActiveVocation] = useState(filters.vocation);
    const [activeRegion, setActiveRegion] = useState(filters.region);
    const [activeCrop, setActiveCrop] = useState(filters.crop)
  

    function vocationFunction(newValue){
      setActiveVocation(newValue);
    }
  
    function regionFunction(newValue) {
      setActiveRegion(newValue);
    }
  
    function cropFunction(newValue) {
      setActiveCrop(newValue)
    }

    if (!props.dataset) {
      return <pre>Loading...</pre>;
    }

    var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
    var data = averageSatisfaction(data_filtered)


    return (

      <>
        <div id='vis-question-label'>
          <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3). </h2>
        </div>
        <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>

        <GetChart data={data}/>

    </>
    )};

    export function PrioritySatisfactionCompare(props){

      const vocationArray = ["All", "Growers", "Consultants"];
  
      const baseURL = "/results/compare/Priority%20Satisfaction";
      const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
      const [activeVocation, setActiveVocation] = useState(filters.vocation);
      const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);

      const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
      const [activeRegionOrCrop2, setActiveRegionOrCrop2] = useState(filters.cropOrRegion2);
  
      if (!props.dataset) {
        return <pre>Loading...</pre>;
      }
  
  
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
  
      var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
      var data = averageSatisfaction(data_filtered)
  
      var data_filtered2 = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop2), activeVocation2);
      var data2 = averageSatisfaction(data_filtered2)
  
  
      return (
  
        <>
          <div id='vis-question-label'>
            <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3). </h2>
          </div>
          <div className="inline-child">
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
          </div>
          <div className='dual-display'>
            <GetChart data={data}/>
            <GetChart data={data2}/>
          </div>
  
      </>
      )};