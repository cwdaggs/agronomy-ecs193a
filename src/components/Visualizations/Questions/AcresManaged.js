import {VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByVocation, filterByCrop, filterByRegion} from '../UseData.js';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import {useState} from "react";
import { useLocation } from 'react-router-dom';
import { parseURL, parseURLCompare } from '../UseData.js';

const vocationArray = ["All", "Growers", "Consultants"];
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const mobileWidth = 1000;
const margin = { top: height/20, right: width/8, bottom: height/4, left: width/8 };

function calculateAcres(data){
  var names = ["< 500", "500 - 1000", "1000 - 1500", "1500 - 2000", "2000 - 2500", "2500+"]
  var colors = [ 
  "#003F72",
  "#006083",
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
  var columns = ["Acres_Managed", "Acres_Consulted"]
  var modified_data=[]
  var bin_count = [0,0,0,0,0,0]

  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < columns.length; j++){
      var num = parseInt(data[i][columns[j]], 10)
      // Remove NAs and outliers
      if(Number.isInteger(num)){
          if(num > 10000){
            continue;
          }
          if(num < 500){
              bin_count[0]++
          }
          else if (num < 1000){
            bin_count[1]++
          }
          else if (num < 1500){
            bin_count[2]++
          }
          else if (num < 2000){
            bin_count[3]++
          }
          else if (num < 2500){
            bin_count[4]++
          }
          else{
            bin_count[5]++
          }   
        }
      }
    }
  for(var k=0; k<bin_count.length; k++){
    modified_data.push({x: names[k], y: bin_count[k], fill: colors[k]});
  }
  return modified_data
}

function calculateSizeOfDataSet(data){
  var size = 0;
  for(var i = 0; i < data.length; i++){
    size += data[i].y;
  }
  return size;
}

function GetChart(props){
  var toolTipFontSize = 30;
  if(props.data.length === 0){
    return (
      <>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </>
      )
  }
  return(
    <>
    <div class='visualization-window'>
          <VictoryChart height={height} width={width}
            domainPadding={{ x: margin.right/5.3, y: margin.top }}
            padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
            animate={{duration: 800}}
          >
          <VictoryAxis
            label={props.labelText}
            style={{
              tickLabels: {fontSize: props.fontSize*1.25, padding: 5, fontFamily: 'Roboto'},
              axisLabel: {fontSize: props.fontSize*2, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 60: 20}
              }}
          />
          <VictoryAxis dependentAxis
          label = {props.lengthString}
          style={{
            fontFamily: 'Roboto',
            tickLabels: {fontSize: props.fontSize*1.25, padding: 15, fontFamily: 'Roboto'},
            axisLabel: {fontSize: props.fontSize*1.5, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 60: 45}
          }}/>
          <VictoryBar
            data={props.acre_data}
            alignment="middle"
            style={{ data:  { fill: ({datum}) => datum.fill}}}
            labels={({ datum }) => `${datum.y + " Respondents"}`}
            labelComponent={
              <VictoryTooltip 
                style={{
                  fontSize: toolTipFontSize,
                  fontFamily: 'Roboto'
                }}
                constrainToVisibleArea={'true'}    
              />
          }
          />
        </VictoryChart>
    </div>
  </>
  )
}

function DetermineLabelText(activeVocation, activeCrop, activeRegion) {
  var labelText = "Acres";
  if (activeVocation === "Growers") {
    labelText = "Acres Managed";
  } else if (activeVocation === "Consultants") {
    labelText = "Acres Consulted";
  }
  if(activeRegion !== "All"){
    if (activeRegion === "NSJV") {
      labelText = "North San Joaquin Valley " + labelText;
    }
    else if (activeRegion === "SSJV") {
      labelText = "South San Joaquin Valley " + labelText;
    }
    else {
      labelText = activeRegion + " " + labelText;
    }
  }
  if(activeCrop !== "All"){
    labelText += " for " + activeCrop;
  }
  return labelText
}

export function AcresManagedBarChart(props) {
  const baseURL = "/results/Acres%20Managed";
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

  var data = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
  var acre_data = calculateAcres(data);
  var dataLength = calculateSizeOfDataSet(acre_data)
  var lengthString = String("Number of Farms (n = " + dataLength + ")");
  var labelText = DetermineLabelText(activeVocation, activeCrop, activeRegion)
  var fontSize = (width >= mobileWidth) ? 20: 10;
  
  return (
    <>
      <div id='vis-question-label'>
          <h2>How many acres do you manage/consult annually?</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <GetChart fontSize={fontSize} acre_data={acre_data} labelText={labelText} lengthString={lengthString} filters={filters} visIndex={1} data={data}/>   
    </>
  );
}

export function AcresManagedBarChartCompare(props) {
  const baseURL = "/results/compare/Acres%20Managed";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegion, setActiveRegion] = useState(filters.region);
  const [activeCrop, setActiveCrop] = useState(filters.crop)

  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
  const [activeRegion2, setActiveRegion2] = useState(filters.region2);
  const [activeCrop2, setActiveCrop2] = useState(filters.crop2)

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

  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }
  var data = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation);
  var acre_data = calculateAcres(data);
  var dataLength = calculateSizeOfDataSet(acre_data)
  var lengthString = String("Number of Farms (n = " + dataLength + ")");
  var labelText = DetermineLabelText(activeVocation, activeCrop, activeRegion)

  var data2 = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), activeVocation2);
  var acre_data2 = calculateAcres(data2);
  var dataLength2 = calculateSizeOfDataSet(acre_data2)
  var lengthString2 = String("Number of Farms (n = " + dataLength2 + ")");
  var labelText2 = DetermineLabelText(activeVocation2, activeCrop2, activeRegion2)
  
  var fontSize = (width >= mobileWidth) ? 20: 10;

  return (
    <>
      <div id='vis-question-label'>
          <h2>How many acres do you manage/consult annually?</h2>
      </div>
      <div className='dual-display'>
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
          <div id="vis-a">
            <GetChart fontSize={fontSize} acre_data={acre_data} labelText={labelText} lengthString={lengthString} filters={filters} visIndex={1} compare={true} data={data}/>
          </div>
          <div id="vis-b">
            <GetChart fontSize={fontSize} acre_data={acre_data2} labelText={labelText2} lengthString={lengthString2} filters={filters} visIndex={2} compare={true} data={data2}/>
          </div>
      </div>
    </>
  );
}