import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip, VictoryZoomContainer} from 'victory';
import {filterByCrop, filterByRegion, filterByVocation, parseURLCompare} from '../UseData.js';
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';

export function calculateInformationSources(data, sorted){
  var sources = [
    "Industry",
    "Other Growers",
    "UC Cooperative Extension",
    "Pesticide Control Advisor",
    "Certified Crop Advisor",
    "NRCS",
    "Input Supplier",
    "Family members",
    "Field crew",
    "County Agricultural Commissioner",
    "Environmental Groups",
    "Resource Conservation Districts",
    "State or County Farm Bureau",
    "Non-Profit Organization",
    "Commodity Boards",
    "Water Quality Coalition",
  ];

  var colors = 
  [
    "#002360",
    "#003069",
    "#003F72",
    "#004F7B",
    "#006083",
    "#00728C",
    "#008694",
    "#009B9C",
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

  var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var modified_data = [];

  for (var i = 0; i < data.length; i++) {
    var values = String(data[i]["Information_Sources"]).split(',');
    for (var v in values) {
      for (var j = 0; j < sources.length; j++) {
        if (values[v].includes(sources[j])) {
          totals[j]++;
        }
      }
    }
  }

  for(var k=0; k<totals.length; k++){
    modified_data.push({x: sources[k], y: totals[k], fill: colors[k]});
  }
  if (sorted) {
    modified_data.sort(function(a,b){return a.y - b.y;});
  }
  for(var l=0; l<modified_data.length; l++){
    modified_data[l].fill = colors[l];
  }
  return modified_data;
}

function GetChart(props){
  if(props.filtered_data.length === 0){
    return (
      <div className='dual-display-child'>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }
  return(
        <div class='visualization-window'>
          <VictoryChart height={props.height} width={props.width}
            animate={{
              duration: 500,               
            }}
            domainPadding={{ x: props.margin.right/10, y: props.margin.top/10 }}
            margin={{top: props.height/8, right: props.width/8, bottom: props.height/4, left: props.width/4 }}
            padding={{ top: props.margin.top, bottom: props.margin.bottom, left: (props.width>=props.mobileWidth)?props.margin.left/1.5:props.margin.left*1.25, right: props.margin.right }}  
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
              />
            }
          >

            <VictoryBar horizontal
              data={props.info_data}
              sortKey = "y"
              style={{ data:  { fill: ({datum}) => datum.fill}, fontFamily: 'Roboto'}}
              labels={({datum}) => datum.y + " Respondents"}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:props.fontSize, fontFamily: 'Roboto'
                  }}
                  constrainToVisibleArea={'true'}  
                />
            }
            />
            <VictoryAxis dependentAxis
              label = {props.labelText + " (n = " + props.filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 50, fontFamily: 'Roboto'},
                fontFamily: 'Roboto'
              }}
            />
            <VictoryAxis
              label = {"Information Network Sources"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 350, fontFamily: 'Roboto'},
                fontFamily: 'Roboto'
              }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="end"
              />   
            }
            />
          </VictoryChart>
        </div>  
  )
}

function GetUnsortedChart(props){

  if(props.filtered_data.length === 0){
    return (
      <div className='dual-display-child'>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }

  return(
        <div class='visualization-window'>
          <VictoryChart height={props.height} width={props.width}
            animate={{
              duration: 500,               
            }}
            domainPadding={{ x: props.margin.right/10, y: props.margin.top/10 }}
            margin={{top: props.height/8, right: props.width/8, bottom: props.height/4, left: props.width/4 }}
            padding={{ top: props.margin.top, bottom: props.margin.bottom, left: (props.width>=props.mobileWidth)?props.margin.left/1.5:props.margin.left*1.25, right: props.margin.right }}  
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
              />
            }
          >

            <VictoryBar horizontal
              data={props.info_data}
              style={{ data:  { fill: ({datum}) => datum.fill}, fontFamily: 'Roboto'}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:props.fontSize, fontFamily: 'Roboto'
                  }}
                  constrainToVisibleArea={'true'}  
                />
            }
            />
            <VictoryAxis dependentAxis
              label = {props.labelText + " (n = " + props.filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 50, fontFamily: 'Roboto'},
                fontFamily: 'Roboto'
              }}
            />
            <VictoryAxis
              label = {"Information Network Sources"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 350, fontFamily: 'Roboto'},
                fontFamily: 'Roboto'
              }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="end"
              />   
            }
            />
          </VictoryChart>
        </div>  
  )
}

export function InfoSourcesBarChart(props) {

    const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

    const baseURL = "/results/Information%20Network";
    const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
    const [activeVocation, setActiveVocation] = useState(filters.vocation);
    const [activeRegion, setActiveRegion] = useState(filters.region);
    const [activeCrop, setActiveCrop] = useState(filters.crop);

    function vocationFunction(newValue){
      setActiveVocation(newValue);
    }

    function regionFunction(newValue) {
      setActiveRegion(newValue);
    }  

    function cropFunction(newValue) {
      setActiveCrop(newValue);
    }  

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
    var filtered_data = filterByVocation(data, activeVocation);
    var info_data = calculateInformationSources(filtered_data, true);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };

    var fontSize = 15
    var mobileFontSize = 6
    const mobileWidth = 1000;
    const laptopWidth = 1500;
    if(width < laptopWidth){
      fontSize = mobileFontSize*2
    }
    if(width < mobileWidth){
      fontSize = mobileFontSize;
    }

    var labelText = "Information Network"
    if (activeCrop !== "All" || activeVocation !== "All") {
      labelText += " for";
    }
    if (activeCrop !== "All") {
      if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
        labelText += " " + activeCrop;
      }
    }
    if (activeVocation !== "All") {
      if (activeVocation === "Other") {
        labelText += " Other Vocations";
      } else {
        labelText += " " + activeVocation;
      }
    }
    if (activeRegion !== "All") {
      if (activeRegion === "NSJV") {
        labelText += " in the North San Joaquin Valley Region";
      }
      else if (activeRegion === "SSJV") {
        labelText += " in the South San Joaquin Valley Region";
      }
      else {
        labelText += " in the " + activeRegion + " Region";
      }
    }

    return (
      <>
        <div id='vis-question-label'>
          <h2>Who do you communicate with when seeking information about field crop production?</h2>
        </div>
        <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>
        <GetChart labelText={labelText} info_data={info_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
      </>
    );
}

export function InfoSourcesBarChartCompare(props) {
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/compare/Information%20Network";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegion, setActiveRegion] = useState(filters.region);
  const [activeCrop, setActiveCrop] = useState(filters.crop);

  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
  const [activeRegion2, setActiveRegion2] = useState(filters.region2);
  const [activeCrop2, setActiveCrop2] = useState(filters.crop2);

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionFunction(newValue) {
    setActiveRegion(newValue);
  }  

  function cropFunction(newValue) {
    setActiveCrop(newValue);
  }  

  function vocationFunction2(newValue){
    setActiveVocation2(newValue);
  }

  function regionFunction2(newValue) {
    setActiveRegion2(newValue);
  }  

  function cropFunction2(newValue) {
    setActiveCrop2(newValue);
  }  

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var labelText = "Information Network"
    if (activeCrop !== "All" || activeVocation !== "All") {
      labelText += " for";
    }
    if (activeCrop !== "All") {
      if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
        labelText += " " + activeCrop;
      }
    }
    if (activeVocation !== "All") {
      if (activeVocation === "Other") {
        labelText += " Other Vocations";
      } else {
        labelText += " " + activeVocation;
      }
    }
    if (activeRegion !== "All") {
      if (activeRegion === "NSJV") {
        labelText += " in the North San Joaquin Valley Region";
      }
      else if (activeRegion === "SSJV") {
        labelText += " in the South San Joaquin Valley Region";
      }
      else {
        labelText += " in the " + activeRegion + " Region";
      }
    }

    var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
    var filtered_data = filterByVocation(data, activeVocation);
    var info_data = calculateInformationSources(filtered_data, false);

    var labelText2 = "Information Network"
    if (activeCrop2 !== "All" || activeVocation2 !== "All") {
      labelText2 += " for";
    }
    if (activeCrop2 !== "All") {
      if (activeVocation2 !== "Allied Industry" && activeVocation2 !== "Other") {
        labelText2 += " " + activeCrop2;
      }
    }
    if (activeVocation2 !== "All") {
      if (activeVocation2 === "Other") {
        labelText2 += " Other Vocations";
      } else {
        labelText2 += " " + activeVocation2;
      }
    }
    if (activeRegion2 !== "All") {
      if (activeRegion2 === "NSJV") {
        labelText2 += " in the North San Joaquin Valley Region";
      }
      else if (activeRegion2 === "SSJV") {
        labelText2 += " in the South San Joaquin Valley Region";
      }
      else {
        labelText2 += " in the " + activeRegion2 + " Region";
      }
    }

    var data2 = filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2);
    var filtered_data2 = filterByVocation(data2, activeVocation2);
    var info_data2 = calculateInformationSources(filtered_data2, false);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };

    var fontSize = 15
    var mobileFontSize = 6
    const mobileWidth = 1000;
    const laptopWidth = 1500;
    if(width < laptopWidth){
      fontSize = mobileFontSize*2
    }
    if(width < mobileWidth){
      fontSize = mobileFontSize;
    }

    return (
      <>
        <div id='vis-question-label'>
          <h2>Who do you communicate with when seeking information about field crop production?</h2>
        </div>

        <div className='dual-display'>
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
          <div id="vis-a">
            <GetUnsortedChart labelText={labelText} info_data={info_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
          </div>
          <div id="vis-b">
            <GetUnsortedChart labelText={labelText2} info_data={info_data2} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data2}/>
          </div>
        </div>        
      </>
    );
}