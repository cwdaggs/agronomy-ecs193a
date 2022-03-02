import {VictoryLegend, VictoryHistogram, VictoryBar, VictorySelectionContainer, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, filterByCrop, trendLineSatisfactions, filterByVocation } from '../UseData';
import * as d3 from 'd3'
import React, { useState, useEffect } from "react";

function barData(dataset, topic){
  var values = []
  console.log(dataset)
  for(var i = 0; i < dataset.length; i++){
    values.push({x: dataset[i].Topic, y: dataset[i].Priority, z: dataset[i].Satisfaction})
  }
  console.log(values)
  return values.sort((a,b) => a.y-b.y)
}

export const PrioritySatisfaction = (props) => {
    const [vis,setVis]=useState(<p>Click and drag an area of points for more information</p>);
    //const [occupation, setOccupation] = useState("All");
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data_filtered = filterByVocation(filterByCrop(props.dataset, props.filter), props.vocationFilter)
    var data = averageSatisfaction(data_filtered)

    var domain = d3.extent(data, function(d) { return d.Priority; })
    var range = d3.extent(data, function(d) { return d.Satisfaction; })
    var domainPadding = 0.1

    var trendData = trendLineSatisfactions(data)
    var selectedData = data

    function makeVis(data){
      setVis(
        (<VictoryChart 
          animate={{
            duration: 500,               
          }}
          height={height} 
          width={width}

          padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}
        >
          <VictoryBar horizontal
            labels={({datum}) => "Priority of " + datum.x + ":\n" + datum.y.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize,
                    strokeWidth:1,
                    fontFamily: 'ABeeZee'
                  }}
                  flyoutHeight={15}
                  flyoutWidth={30}    
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
            labels={({datum}) => "Satisfaction of " + datum.x + ":\n" + datum.z.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize
                  }}
                  flyoutHeight={15}
                  flyoutWidth={30}    
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
              tickLabels: {fontSize: fontSize, padding: 5}
            }}
          />
          <VictoryAxis
            style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0}
            }}
          />
        </VictoryChart>)
        )
    }

    function handleSelection(points, bounds, props){
      selectedData = (barData(props.selectedData[0].data))
      console.log(selectedData)
      makeVis(selectedData)
      
    }

    function handleSelectionCleared(props){
      console.log("cleared")
    }
    

    const width = 1920;
    const height = 1080;
    const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };
  
    const fontSize = 20

    return (

        <div>
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
                padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}  
                
            >
            <VictoryLegend x={0}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={4}
              style={{ border: { stroke: "black" }, title: {fontSize: 3 }, data: {fontSize:20 }}}
              data={[
                { name: "Topic", symbol: { fill: "tomato", stroke: "#756f6a", strokeWidth: 0.5 }, labels:{fontSize: 20} },
                { name: "Average", symbol: { fill: "red", type:"square" }, labels:{fontSize: 20} },
                { name: "Trend Line", symbol: { fill: "#756f6a", type:"square" }, labels:{fontSize: 20} }
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
                        strokeWidth: 0.5
                    },
                    axis: {stroke: "#756f6a"},
                    ticks: {stroke: "grey", size: 20},
                    tickLabels: {fontSize: fontSize, padding: 5}
                  }}
                size={10}
                data={data}
                labels={({datum}) => datum.Topic + "\nSatisfaction Avg: " + String(datum.Satisfaction).substring(0, 3) + "\nPriority Avg: " + String(datum.Priority).substring(0,3)}
                labelComponent={
                    <VictoryTooltip 
                        style={{
                          fontSize:fontSize-5,
                          strokeWidth:0.1,
                          fontFamily: 'ABeeZee'
                        }}
                        flyoutHeight={75}
                        flyoutWidth={100}    
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
            <VictoryLine horizontal
              style={{ 
                data: { 
                    stroke: "red", 
                    strokeWidth:1, 
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
                    strokeWidth:1, 
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
                        strokeWidth:1.3, 
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
                                : { style: { stroke: "black", strokeWidth: 4 } };
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
                            : { style: { stroke: "#756f6a", strokeWidth: 2 } };;
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
    )};