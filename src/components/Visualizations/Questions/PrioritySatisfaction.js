import {VictoryLegend, VictoryBar, VictorySelectionContainer, VictoryAxis, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, filterByCropOrRegion, trendLineSatisfactions, filterByVocation } from '../UseData';
import * as d3 from 'd3'
import React, { useState } from "react";
import "typeface-abeezee";
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
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

export const PrioritySatisfaction = (props) => {
    
  

    const [vis,setVis]=useState(<p id="vis-question-label">Click and drag an area of points for more information</p>);

    const vocationArray = ["All", "Growers", "Consultants"];

    const baseURL = "/results/Priority%20Satisfaction";
    const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
    const [activeVocation, setActiveVocation] = useState(filters.vocation);
    const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);

    if (!props.dataset) {
      return <pre>Loading...</pre>;
    }


    function vocationFunction(newValue){
      setActiveVocation(newValue);
    }

    function regionOrCropFunction(newValue) {
      setActiveRegionOrCrop(newValue);
    }  



    var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
    var data = averageSatisfaction(data_filtered)

    var domain = d3.extent(data, function(d) { return d.Priority; })
    var range = d3.extent(data, function(d) { return d.Satisfaction; })
    var domainPadding = 0.1

    var trendData = trendLineSatisfactions(data)
    var selectedData = data

    function makeVis(data){
      setVis(
        ( 
          <div>
           <h5><br></br><br></br><br></br>Selected Node's Average Importance/Satisfaction of Information Delivery on Topic as Surplus/Deficiency:</h5>
            <VictoryChart 
              x={50}
              animate={{
                duration: 500,               
              }}
              height={height} 
              width={width}

              padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}
              
            >
            <VictoryLegend 
              x={(width>=mobileWidth)?width/4 + margin.left:0}
              title="Engagement Frequency"
              centerTitle
              orientation="horizontal"
              itemsPerRow={3}
              gutter={30}
              style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: fontSize}, 
                      // border: { stroke: "black" }, 
                      title: {fontSize: fontSize }, 
                      data: {fontSize: fontSize, stroke: "black", strokeWidth: 1}}}
              data={[
                { name: "Sufficient", symbol: { fill: "green", type:"square"} },
                { name: "Surplus", symbol: { fill: "green", fillOpacity:0.5, type:"square" } },
                { name: "Deficient", symbol: { fill: "tomato", fillOpacity:0.7, type:"square" } }
                
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
                      fontFamily: 'ABeeZee'
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
              labels={({datum}) => "Satisfaction of " + datum.x.split('_').join(" ") + "\n" + datum.z.toFixed(2) + "\nImportance of " + datum.x.split('_').join(" ") + "\n" + datum.y.toFixed(2)}
              labelComponent={
                  <VictoryTooltip 
                  orientation={"bottom"}
                  pointerOrientation={"top"}
                    style={{
                      fontSize:fontSize-3,
                      strokeWidth: 1,
                      fontFamily: 'ABeeZee'
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
                tickLabels: {fontSize: fontSize, padding: 5},
                axisLabel: {fontSize: fontSize}
              }}
            />
            <VictoryAxis
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0}
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


    return (

      <>
        <div id='vis-question-label'>
          <h3>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3). </h3>
        </div>
        <div className="inline-child">
            <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>

        <div class='visualization-window'>
            <VictoryChart 
                containerComponent=
                  {<VictorySelectionContainer
                    onSelection={(points, bounds, props) => handleSelection(points, bounds, props)}
                    onSelectionCleared={(props) => handleSelectionCleared(props)}
                  />}
                theme={VictoryTheme.material}
                domain={{ x: [domain[0] - domainPadding, domain[1] + domainPadding], y: [range[0] - domainPadding, range[1] + domainPadding] }}
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
                       title: {fontSize: fontSize, fontFamily: 'ABeeZee' }, 
                       labels: {fontSize: fontSize, fontFamily: 'ABeeZee'}}}
              data={[
                { name: "Topic", symbol: { fill: "tomato", stroke: "#756f6a"} },
                { name: "Average", symbol: { fill: "red", type:"square" } },
                { name: "Trend Line", symbol: { fill: "#756f6a", type:"square" } }
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
                    tickLabels: {fontSize: fontSize, padding: 5}
                  }}
                size={(width>=mobileWidth) ? fontSize/2 : fontSize/5}
                data={data}
                labels={({datum}) => datum.Topic.split('_').join(' ') + "\nSatisfaction Avg: " + String(datum.Satisfaction).substring(0, 4) + "\nPriority Avg: " + String(datum.Priority).substring(0,4)}
                labelComponent={
                    <VictoryTooltip 
                        style={{
                          fontSize:fontSize-5,
                          strokeWidth:0.1,
                          fontFamily: 'ABeeZee'
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
                        tickLabels: {fontSize: fontSize, padding: 5},
                        axisLabel: {fontSize: (width>=mobileWidth) ? fontSize*2 : fontSize, fontFamily: 'ABeeZee', padding: 60 }
                        }}
                />
                <VictoryAxis
                    label="Importance"
                    style={{
                        axis: {stroke: "#756f6a"},
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: {fontSize: fontSize, padding: 0},
                        axisLabel: {fontSize: (width>=mobileWidth) ? fontSize*2 : fontSize, fontFamily: 'ABeeZee', padding: (width>=mobileWidth) ? 60 : 35 }
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

    </>
    )};