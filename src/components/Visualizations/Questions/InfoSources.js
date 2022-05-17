import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip, VictoryZoomContainer} from 'victory';
import {filterByCropOrRegion, filterByVocation, parseURLCompare} from '../UseData.js';
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';

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

  // var colors = [
  //   "#021837", "#031544", "#051050", "#07085B", "#150A67", "#260D71", "#3A117C", 
  //   "#4F1586", "#65198F", "#682D99", "#6E40A2", "#7554AC", "#7E67B5", "#887BBF", 
  //   "#958EC8", "#A3A2D2", "#B5B8DB"
  // ];
  // var colors = [
  //   "#212011",
  //   "#2C2D17",
  //   "#35381D",
  //   "#3D4323",
  //   "#444F2A",
  //   "#4A5A30",
  //   "#4F6536",
  //   "#53703D",
  //   "#577B44",
  //   "#59864A",
  //   "#5B9151",
  //   "#699759",
  //   "#769C60",
  //   "#83A268",
  //   "#90A770",
  //   "#9CAD78",
  //   "#A8B280",
  //   "#B2B888",
  //   "#BDBD90",
  //   "#C2BE98",
  //   "#C7BFA0",
  // ];
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
  modified_data.sort(function(a,b){return a.y - b.y;});
  for(var l=0; l<modified_data.length; l++){
    modified_data[l].fill = colors[l];
  }
  return modified_data;
}

function GetChart(props){
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
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:props.fontSize, fontFamily: 'Roboto'
                  }}
                  flyoutHeight={25}
                  flyoutWidth={40}    
                />
            }
            />
            <VictoryAxis dependentAxis
              label = {props.labelText + "(n = " + props.filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 50, fontFamily: 'Roboto'},
                fontFamily: 'Roboto'
              }}
            />
            <VictoryAxis
              label = {"Information Sources"}
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
  const vocationArray = ["All", "Consultants", "Growers"];

  const baseURL = "/results/Information%20Sources";
  const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation.replace("%20", " "));
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
        <div className="inline-child">
          <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>
        <GetChart labelText={labelText} info_data={info_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
      </>
    );
}

export function InfoSourcesBarChartCompare(props) {
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/compare/Information%20Sources";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation.replace("%20", " "));
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);

  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2.replace("%20", " "));
  const [activeRegionOrCrop2, setActiveRegionOrCrop2] = useState(filters.cropOrRegion2);

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


    var labelText2 = activeRegionOrCrop2;
    if ((activeVocation2 === "Allied Industry" || activeVocation2 === "Other") && crops.includes(activeRegionOrCrop2)) {
      labelText2 = activeVocation2;
    } else {
      if (activeVocation2 !== "All") {
        labelText2 += " " + activeVocation2;
      }
    }
    labelText2 += " Responses ";

    var data2 = filterByCropOrRegion(props.dataset, activeRegionOrCrop2);
    if ((activeVocation2 === "Allied Industry" || activeVocation2 === "Other") && crops.includes(activeRegionOrCrop2)) {
      data2 = props.dataset;
    }
    var filtered_data2 = filterByVocation(data2, activeVocation2);
    var info_data2 = calculateInformationSources(filtered_data2);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
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
        <div className="inline-child">
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>
        <div className='dual-display'>
        <GetChart labelText={labelText} info_data={info_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
        <GetChart labelText={labelText2} info_data={info_data2} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data2}/>
        </div>
      </>
    );
}