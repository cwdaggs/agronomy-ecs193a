import {VictoryLabel, VictoryBar, VictorySelectionContainer, VictoryAxis, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, trendLineSatisfactions, filterByVocation, parseURLCompare, filterByRegion, filterByCrop } from '../UseData';
import * as d3 from 'd3'
import React, { useState } from "react";
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';
import "./Legends.css";

function BarData(dataset, topic){
  var values = []

  for(var i = 0; i < dataset.length; i++){
    values.push({x: String(dataset[i].Topic.split('_').join(" ")), y: dataset[i].Priority, z: dataset[i].Satisfaction})
  }

  return values.sort((a,b) => a.y-b.y)
}


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const margin = { top: height/8, right: width/8, bottom: height/6, left: width/4 };

const mobileWidth = 1000;
var fontSize = 20
var mobileFontSize = 5
if(width < mobileWidth){
  fontSize = mobileFontSize;
}


function GetChart(props, setSelection){
  var toolTipFontSize = fontSize;

  if(props.compare){
    toolTipFontSize = fontSize + 1.5;
  }
  
  var domain = d3.extent(props.data, function(d) { return d.Priority; })
  var range = d3.extent(props.data, function(d) { return d.Satisfaction; })
  var domainPadding = 0.1

  var trendData = trendLineSatisfactions(props.data)
  
  if(props.data_filtered.length === 0){
    return (

      <div className='dual-display-child'>
        <div id="vis-legend">
          <div id="legend-title">
            {props.titleText}
          </div>
            <div id="legend-values">
            <div className='legend-circle' id="square-color-third"></div>
            <span className='legend-value'>Topic of Interest</span>
            <div className='legend-square' id="square-color-fourth"></div>
            <span className='legend-value'>Average Priority/Satisfaction Over All Topics</span>
            </div>
        </div>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }

  function selectNodes(nodes){
    props.setSelection(nodes)
  }

  function handleSelection(points, bounds, props){
    selectNodes(BarData(props.selectedData[0].data))
  }

  function handleSelectionCleared(){
    selectNodes(BarData(props.data))
  }  

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
            <span className='legend-value'>Average Priority/Satisfaction Over All Topics</span>
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
                padding={{ top: margin.top, bottom: margin.bottom, left: margin.left/1.5, right: margin.right }}
            >
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
                        constrainToVisibleArea={'true'}    
                    />
                    
                }
                
                onMouseEnter={(props) => props.style.data.stroke = "black"}
                onMouseLeave={(props) => props.style.data.stroke = "#756f6a"}

                />

              <VictoryScatter
                x={(d) => d.y}
                y={(d) => d.x}
                style={{ 
                    data: {
                      fill: "#000000",
                      stroke: "#756f6a",
                      strokeWidth: 1,
                      fontFamily: 'Roboto'
                    },
                    axis: {stroke: "#756f6a"},
                    ticks: {stroke: "grey", size: fontSize},
                    tickLabels: {fontSize: fontSize, padding: 5}, 
                    fontFamily: 'Roboto'
                  }}
                size={(width>=mobileWidth) ? fontSize/2 : fontSize/5}
                data= {[
                  { x: Math.min(domain[0], range[0]) - domainPadding, y: Math.max(domain[1], range[1]), z: "I: Concentrate Here" },
                  { x: Math.max(domain[1], range[1]) - domainPadding, y: Math.max(domain[1], range[1]), z: "II: Keep Up The Good Work" },
                  { x: Math.min(domain[0], range[0]) - domainPadding, y: Math.min(domain[0], range[0]), z: "III: Lower Priority" },
                  { x: Math.max(domain[1], range[1]) - domainPadding, y: Math.min(domain[0], range[0]), z: "IV: Possible Overkill" }
                ]}
                labels={({datum}) => datum.z}
                labelComponent={
                  <VictoryLabel
                    textAnchor="start"
                    style={[
                      { fill: "black", fontSize: 20, fontFamily: "Roboto" },
                    ]}   
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
          </VictoryChart>
          <div>
          <p id="vis-question-label"><br></br><br></br><br></br>Selected Topic's Average Priority/Satisfaction of Information Delivery on Topic as Surplus/Deficiency:<br></br>(Click and Drag in the Scatter Plot to Select Specific Topics)</p>
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
                  constrainToVisibleArea={'true'}     
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
            data={props.selectedNodes}
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
                  constrainToVisibleArea={'true'} 
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
            data={props.selectedNodes}
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
    </div>
  )
}

function DetermineTitleText(activeVocation, activeCrop, activeRegion, data_filtered) {
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

  titleText += " (n = " + data_filtered.length + ")";
  return titleText
}

export const PrioritySatisfaction = (props) => {
    const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];
    const baseURL = "/results/Priority%20Satisfaction";
    const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
    const [activeVocation, setActiveVocation] = useState(filters.vocation);
    const [activeRegion, setActiveRegion] = useState(filters.region);
    const [activeCrop, setActiveCrop] = useState(filters.crop)
    const [selectedNodes, setSelectedNodes] = useState(props.dataset ? BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, filters.crop), filters.region), filters.vocation))): []);

    function vocationFunction(newValue){
      setActiveVocation(newValue);
      setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), newValue))))
    }
  
    function regionFunction(newValue) {
      setActiveRegion(newValue);
      setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), newValue), activeVocation))))
    }
  
    function cropFunction(newValue) {
      setActiveCrop(newValue)
      setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, newValue), activeRegion), activeVocation))))
    }

    function setSelection(newValue){
      setSelectedNodes(newValue)
    }

    if (!props.dataset) {
      return <pre>Loading...</pre>;
    }

    var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
    var data = averageSatisfaction(data_filtered)
    var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, data_filtered)

    return (
      <>
        <div id='vis-question-label'>
          <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3).</h2>
        </div>
        <div id='priority-satisfaction-infos-label'>
          <p>To help identify needs and prioritize program activities that should receive more time and resources, we compared how respondents ranked the importance of different topics for UCCE 
            extension with their level of satisfaction regarding delivery of information on these topics. Topics are placed into four different quadrants following the methodology in <a rel="noreferrer" href="https://tigerprints.clemson.edu/joe/vol54/iss6/21/" target="_blank" className={"hover-link"}>Warner et al.
            2016</a> based on the combination of priority (high vs. low) and satisfaction (high vs. low). Drag over multiple topics to visualize whether satisfaction with information delivery was below
             or above what respondents felt should be UCCE's priorities for field crop production.</p>
        </div>
        <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>
        <GetChart data={data} title={titleText} data_filtered={data_filtered} selectedNodes={selectedNodes} setSelection={setSelection}/>
    </>
    )};

export function PrioritySatisfactionCompare(props){
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];
  const baseURL = "/results/compare/Priority%20Satisfaction";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegion, setActiveRegion] = useState(filters.region);
  const [activeCrop, setActiveCrop] = useState(filters.crop)
  const [selectedNodes, setSelectedNodes] = useState(props.dataset ? BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, filters.crop), filters.region), filters.vocation))): []);

  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
  const [activeRegion2, setActiveRegion2] = useState(filters.region2);
  const [activeCrop2, setActiveCrop2] = useState(filters.crop2)
  const [selectedNodes2, setSelectedNodes2] = useState(props.dataset ? BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, filters.crop2), filters.region2), filters.vocation2))): []);
  

  if (!props.dataset) {
    return <pre>Loading...</pre>;
  }

  function vocationFunction(newValue){
    setActiveVocation(newValue);
    setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), newValue))))
  }

  function regionFunction(newValue) {
    setActiveRegion(newValue);
    setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), newValue), activeVocation))))
  }

  function cropFunction(newValue) {
    setActiveCrop(newValue)
    setSelectedNodes(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, newValue), activeRegion), activeVocation))))
  }

  function setSelection(newValue){
    setSelectedNodes(newValue)
  }

  function vocationFunction2(newValue){
    setActiveVocation2(newValue);
    setSelectedNodes2(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), newValue))))
  }

  function regionFunction2(newValue) {
    setActiveRegion2(newValue);
    setSelectedNodes2(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), newValue), activeVocation2))))
  }

  function cropFunction2(newValue) {
    setActiveCrop2(newValue)
    setSelectedNodes2(BarData(averageSatisfaction(filterByVocation(filterByRegion(filterByCrop(props.dataset, newValue), activeRegion2), activeVocation2))))
  }

  function setSelection2(newValue){
    setSelectedNodes2(newValue)
  }

  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
  var data = averageSatisfaction(data_filtered)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, data_filtered)

  var data_filtered2 = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), activeVocation2);
  var data2 = averageSatisfaction(data_filtered2)
  var titleText2 = DetermineTitleText(activeVocation2, activeCrop2, activeRegion2, data_filtered2)

  return (
    <>
      <div id='vis-question-label'>
        <h2>Rate what you believe should be the UCCE's priorities for field crop production (1-3), and rate your satisfaction with the UCCE's delivery of information on these topics (1-3).</h2>
      </div>

      <div id='priority-satisfaction-infos-label'>
      <p>To help identify needs and prioritize program activities that should receive more time and resources, we compared how respondents ranked the importance of different topics for UCCE 
        extension with their level of satisfaction regarding delivery of information on these topics. Topics are placed into four different quadrants following the methodology in <a rel="noreferrer" href="https://tigerprints.clemson.edu/joe/vol54/iss6/21/" target="_blank" className={"hover-link"}>Warner et al.
        2016</a> based on the combination of priority (high vs. low) and satisfaction (high vs. low). Drag over multiple topics to visualize whether satisfaction with information delivery was below
          or above what respondents felt should be UCCE's priorities for field crop production.</p>
      </div>

      <div className='dual-display'>
        <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        <div id="vis-a">
          <GetChart data={data} title={titleText} data_filtered={data_filtered} selectedNodes={selectedNodes} setSelection={setSelection}/>
        </div>
        <div id="vis-b">
          <GetChart data={data2} title={titleText2} compare={true} data_filtered={data_filtered2} selectedNodes={selectedNodes2} setSelection={setSelection2}/>
        </div>
      </div>   
    </>
  )};