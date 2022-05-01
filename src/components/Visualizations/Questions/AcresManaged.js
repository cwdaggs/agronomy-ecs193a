import {VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import {useState} from "react";
import { useLocation } from 'react-router-dom';
import { parseURL } from '../UseData.js';

import "typeface-abeezee";

function calculateAcres(data){
  var names = ["< 500", "< 1000", "< 1500", "< 2000", "< 2500", "2500+"]
  var colors = ["#c9d2b7", "#b1b8a2", "#79917c", "#647766", "#343f36", "#212121"]
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

// function parseURL(baseURL, path) {
//   var pathname = path;
//   var vocation = "All";
//   var cropOrRegion = "All";
//   if (baseURL !== pathname) {
//     pathname = pathname.replace(baseURL, "");
//     const filters = pathname.split("/");
//     filters.shift();
//     // console.log(filters);
//     if (filters[0] !== "Select%20Vocation") {
//       vocation = filters[0];
//     }
    
//     if (filters[1] === "Select%20Crop" && filters[2] === "Select%20Region") {
//       cropOrRegion = "All";
//     } else if (filters[1] === "Select%20Crop"){
//       cropOrRegion = filters[2].replaceAll("%20", " ");
//     } else {
//       cropOrRegion = filters[1].replaceAll("%20", " ");
//     }
//   } 
//   // console.log("vocation: " + vocation + ", croporreg: " + cropOrRegion);
//   return {vocation: vocation, cropOrRegion: cropOrRegion};
// }

export function AcresManagedBarChart(props) {
    const vocationArray = ["All", "Growers", "Consultants"];
    const baseURL = "/results/Acres%20Managed";
    const filters = parseURL(baseURL, useLocation().pathname);
    const [activeVocation, setActiveVocation] = useState(filters.vocation);
    const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);

    function vocationFunction(newValue){
      setActiveVocation(newValue);
    }

    function regionOrCropFunction(newValue) {
      setActiveRegionOrCrop(newValue);
    }

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }
    var data = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation);
    var acre_data = calculateAcres(data);
    var dataLength = calculateSizeOfDataSet(acre_data)
    var lengthString = String("Number of Farms (n = " + dataLength + ")");
    
    var labelText = "Acres";
    if (activeVocation === "Growers") {
      labelText = "Acres Managed by " + activeRegionOrCrop + " Growers";
    } else if (activeVocation === "Consultants") {
      labelText = "Acres Consulted by " + activeRegionOrCrop + " Consultants";
    } else {
      if (activeRegionOrCrop !== "All") {
        labelText = activeRegionOrCrop + " " + labelText;
      }
    }
    
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const mobileWidth=1000;
    var fontSize = (width >= mobileWidth) ? 20: 10;
    const margin = { top: height/20, right: width/8, bottom: height/4, left: width/8 };

    return (
      <>
      <div id='vis-question-label'>
          <h3>How many acres do you manage/consult annually?</h3>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
      </div>
        <div class='visualization-window'>
          <VictoryChart height={height} width={width}
            //domainPadding={45}
            domainPadding={{ x: margin.right/5.3, y: margin.top }}
            padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
            animate={{duration: 800}}
          >
            <VictoryAxis
              label={labelText}
              style={{
                tickLabels: {fontSize: fontSize*1.25, padding: 5},
                axisLabel: {fontSize: fontSize*1.5, padding: (width >= mobileWidth) ? 60: 20}
                }}
              // style={{
              //   tickLabels: {fontSize: 30, padding: 5},
              //   axisLabel: {fontSize: 40, padding: {top: 0}}
              // }}
            />
            <VictoryAxis dependentAxis
            label = {lengthString}
            style={{
              tickLabels: {fontSize: fontSize, padding: 15},
              axisLabel: {fontSize: fontSize*1.5, padding: (width >= mobileWidth) ? 60: 35}
            }}/>
            <VictoryBar
              // barRatio={0.6}
              data={acre_data}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:30
                  }}
                  flyoutHeight={45}
                  flyoutWidth={60}    
                />
            }
            />
          </VictoryChart>
          
        </div>
        </>
      );
}