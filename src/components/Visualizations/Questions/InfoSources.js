import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip, VictoryZoomContainer} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
import {useState} from 'react';
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";

export function calculateInformationSources(data){
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

  var colors = [
    "#021837", "#031544", "#051050", "#07085B", "#150A67", "#260D71", "#3A117C", 
    "#4F1586", "#65198F", "#682D99", "#6E40A2", "#7554AC", "#7E67B5", "#887BBF", 
    "#958EC8", "#A3A2D2", "#B5B8DB"
  ];

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
  modified_data.sort(function(a,b){return a.y - b.y;});
  return modified_data;
}

export function InfoSourcesBarChart(props) {
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const [activeVocation, setActiveVocation] = useState("All");
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState("All");

  function vocationFunction(newValue){
    setActiveVocation(newValue);
  }

  function regionOrCropFunction(newValue) {
    setActiveRegionOrCrop(newValue);
  }

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }
    
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

    var labelText = activeRegionOrCrop;
    if ((activeVocation === "Allied Industry" || activeVocation === "Other") && crops.includes(activeRegionOrCrop)) {
      labelText = activeVocation;
    } else {
      if (activeVocation !== "All") {
        labelText += " " + activeVocation;
      }
    }
    labelText += " Responses ";

    var data = filterByCropOrRegion(props.dataset, activeRegionOrCrop);
    if ((activeVocation === "Allied Industry" || activeVocation === "Other") && crops.includes(activeRegionOrCrop)) {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, activeVocation);
    var info_data = calculateInformationSources(filtered_data);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };

    const mobileWidth = 1000;
    var fontSize = 20
    var mobileFontSize = 6
    if(width < mobileWidth){
      fontSize = mobileFontSize;
    }

    return (
      <>
        <div id='vis-question-label'>
          <h3>Who do you communicate with when seeking information about field crop production?</h3>
        </div>
        <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
        </div>
        <div class='visualization-window'>
          <VictoryChart height={height} width={width}
            animate={{
              duration: 500,               
            }}
            domainPadding={{ x: margin.right/10, y: margin.top/10 }}
            padding={{ top: margin.top, bottom: margin.bottom, left: (width>=mobileWidth)?margin.left:margin.left*1.25, right: margin.right }}  
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
              />
            }
          >

            <VictoryBar horizontal
              data={info_data}
              sortKey = "y"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize
                  }}
                  flyoutHeight={25}
                  flyoutWidth={40}    
                />
            }
            />
            <VictoryAxis dependentAxis
              label = {labelText + "(n = " + filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 5},
                axisLabel: {fontSize: fontSize*2, padding: 50}
              }}
            />
            <VictoryAxis
              label = {"Information Sources"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0},
                axisLabel: {fontSize: fontSize*2, padding: 350}
              }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="end"
              />   
            }
            />
          </VictoryChart>
        </div>
      </>
    );
}