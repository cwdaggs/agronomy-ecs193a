import {VictoryLegend, VictoryLabel, VictoryBar, VictorySelectionContainer, VictoryAxis, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
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
var mobileFontSize = 5
if(width < mobileWidth){
  fontSize = mobileFontSize;
}


function GetChart(props){

  var toolTipFontSize = fontSize;

  if(props.compare){
    toolTipFontSize = fontSize + 1.5;
  }

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
          <p id="vis-question-label"><br></br><br></br><br></br>Selected Node's Average Priority/Satisfaction of Information Delivery on Topic as Surplus/Deficiency:</p>
          <div id="vis-legend">
            <div id="legend-values">
              <div className='legend-square' id="square-color-first"></div>
              <span className='legend-value'>Meeting Information Demand</span>
              <div className='legend-square' id="square-color-second"></div>
              <span className='legend-value'>Exceeding Information Demand</span>
              <div className='legend-square' id="square-color-third"></div>
              <span className='legend-value'>Not Meeting Information Demand</span>
            </div>
          </div>
          
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
          <VictoryBar horizontal
            alignment='center'
            labels={({datum}) => "Priority of " + datum.x.split('_').join(" ") + "\n" + datum.y.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                orientation={"bottom"}
                pointerOrientation={"top"}
                  style={{
                    fontSize:toolTipFontSize,
                    strokeWidth:1,
                    fontFamily: 'Roboto'
                  }}
                  flyoutHeight={toolTipFontSize*6}
                  flyoutWidth={toolTipFontSize*25}      
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
            alignment='center'
            labels={({datum}) => "Satisfaction of " + datum.x.split('_').join(" ") + "\n" + datum.z.toFixed(2) + "\nPriority of " + datum.x.split('_').join(" ") + "\n" + datum.y.toFixed(2)}
            labelComponent={
                <VictoryTooltip 
                orientation={"bottom"}
                pointerOrientation={"top"}
                  style={{
                    fontSize:toolTipFontSize,
                    strokeWidth: 1,
                    fontFamily: 'Roboto'
                  }}
                  flyoutHeight={toolTipFontSize*6}
                  flyoutWidth={toolTipFontSize*25}    
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
              axisLabel: {fontSize: fontSize - 4, fontFamily: 'Roboto'}
            }}
          />
          <VictoryAxis
            style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize - 5, padding: 0, fontFamily: 'Roboto'}

            }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="start"
                style={{fill: "white", fontSize: fontSize}}
                dx={fontSize}
                events={{onClick: (evt) => console.log(evt)}}
              />   
            }
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
        <div id="vis-legend">
          <div id="legend-title">
            {props.titleText}
          </div>
          <div id="legend-values">
            <div className='legend-circle' id="square-color-third"></div>
            <span className='legend-value'>Topic of Interest</span>
            <div className='legend-square' id="square-color-fourth"></div>
            <span className='legend-value'>Not Valuable</span>
          </div>
        </div>
        <div id="vis-question-label">{props.title}</div>
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
            {/* <VictoryLegend 
              x={(width>=mobileWidth) ? width*.1 :0}
              y={(width>=mobileWidth) ? height*.1 :40}
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
            /> */}
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
                          fontSize:toolTipFontSize,
                          strokeWidth:0.1,
                          fontFamily: 'Roboto'
                        }}
                        flyoutHeight={toolTipFontSize*4}
                        flyoutWidth={toolTipFontSize*20}    
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
             {/*
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
              */}
          </VictoryChart>
          {vis}
      </div>
  )
}


export const PrioritySatisfaction = (props) => {

    const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

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

    var titleText = "Priority Vs Satisfaction of Information Availability";

    if (activeCrop !== "All" || activeVocation !== "All") {
      titleText += " for";
    }

    if (activeCrop !== "All") {
      if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
        titleText += " " + activeCrop;
      }
    }

    if(activeVocation !== "All"){
      if (activeVocation === "Other") {
        titleText += " " + "Other Vocations";
      } else {
        titleText += " " + activeVocation;
      }
    }

    if (activeRegion !== "All") {
      titleText += " in the " + activeRegion + " Region";
    }

    titleText += " (n = " + data_filtered.length + ")";

    return (

      <>
        <div id='vis-question-label'>
          <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3).</h2>
        </div>
        <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>

        <GetChart data={data} title={titleText}/>

    </>
    )};

    export function PrioritySatisfactionCompare(props){

      const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];
  
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

      const baseURL = "/results/compare/Priority%20Satisfaction";
      const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
      const [activeVocation, setActiveVocation] = useState(filters.vocation);
      const [activeRegion, setActiveRegion] = useState(filters.region);
      const [activeCrop, setActiveCrop] = useState(filters.crop)

      const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
      const [activeRegion2, setActiveRegion2] = useState(filters.region2);
      const [activeCrop2, setActiveCrop2] = useState(filters.crop2)
  
      if (!props.dataset) {
        return <pre>Loading...</pre>;
      }
  
      function vocationFunction(newValue){
        setActiveVocation(newValue);
      }
    
      function regionFunction(newValue) {
        setActiveRegion(newValue);
      }
    
      function cropFunction(newValue) {
        setActiveCrop(newValue)
      }  

      function vocationFunction2(newValue){
        setActiveVocation2(newValue);
      }
    
      function regionFunction2(newValue) {
        setActiveRegion2(newValue);
      }
    
      function cropFunction2(newValue) {
        setActiveCrop2(newValue)
      }
  
      var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
      var data = averageSatisfaction(data_filtered)
  
      var data_filtered2 = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), activeVocation2);
      var data2 = averageSatisfaction(data_filtered2)
      
      var titleText = "Priority Vs Satisfaction of Information Availability";

      if (activeCrop !== "All" || activeVocation !== "All") {
        titleText += " for";
      }
  
      if (activeCrop !== "All") {
        if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
          titleText += " " + activeCrop;
        }
      }
  
      if(activeVocation !== "All"){
        if (activeVocation === "Other") {
          titleText += " " + "Other Vocations";
        } else {
          titleText += " " + activeVocation;
        }
      }
  
      if (activeRegion !== "All") {
        titleText += " in the " + activeRegion + " Region";
      }
  
      titleText2 += " (n = " + data_filtered.length + ")";

      var titleText2 = "Priority Vs Satisfaction of Information Availability";

      if (activeCrop2 !== "All" || activeVocation2 !== "All") {
        titleText2 += " for";
      }
  
      if (activeCrop2 !== "All") {
        if (activeVocation2 !== "Allied Industry" && activeVocation2 !== "Other") {
          titleText2 += " " + activeCrop2;
        }
      }
  
      if(activeVocation2 !== "All"){
        if (activeVocation2 === "Other") {
          titleText2 += " " + "Other Vocations";
        } else {
          titleText2 += " " + activeVocation2;
        }
      }
  
      if (activeRegion2 !== "All") {
        titleText2 += " in the " + activeRegion2 + " Region";
      }
  
      titleText2 += " (n = " + data_filtered.length + ")";
  
      return (
  
        <>
          <div id='vis-question-label'>
            <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3).</h2>
          </div>

          <div className='dual-display'>
            <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
            <div id="vis-a">
              <GetChart data={data} title={titleText} compare={true}/>
            </div>
            <div id="vis-b">
              <GetChart data={data2} title={titleText2} compare={true}/>
            </div>
          </div>   
      </>
      )};