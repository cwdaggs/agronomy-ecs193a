import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip, VictoryZoomContainer} from 'victory';
import {filterByCrop, filterByCropOrRegion, filterByRegion, filterByVocation, parseURLCompare} from '../UseData.js';
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';

function getInternetSources(data, sorted){
  var sources = [
    "Internet (websites)",
    "Blogs",
    "Webinars",
    "Virtual Meetings",
    "Newsletters",
    "UC Cooperative Extension Magazine Articles",
    "Personal contact (phone, email, on-farm consultation)",
    "In-person meetings (Field Days, Grower Meetings)",
    "Books/manuals",
    "Radio/Podcast",
    "Social Media",
    "Fact Sheets",
    "Interactive Web Tools",
    "Demonstration Videos",
    "Two or three day destination meetings",
    "\"California Agriculture\" Journal"
  ];

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
["#002360",
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
    var values = String(data[i]["UCCE_Information_Preferred_Contact"]).split(',(?![+ ])');
    for (var j in values) {
      for (var k = 0; k < sources.length; k++) {
        if (values[j].includes(sources[k])) {
          totals[k]++;
        }
      }
    }
  }
  sources[0] = "Internet";
  sources[5] = "UCCE Magazine Articles";
  sources[6] = "Personal Contact";
  sources[7] = "In-Person Meetings";
  sources[8] = "Books/Manuals"
  sources[14] = "2-3 Day Destination Meetings"


  for(var l=0; l<totals.length; l++){
    modified_data.push({x: sources[l], y: totals[l]});
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

  if(props.filtered_data.length == 0){
    return (
      <div className='dual-display-child'>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }

  return(
      <div class='visualization-window'>
          
          <VictoryChart height={props.height} width={props.width}
            domainPadding={{ x: (props.width>=props.mobileWidth) ? props.margin.right/10 : 0, y:props.margin.top/10 }}
            padding={{ top: props.margin.top, bottom: props.margin.bottom, left: (props.width>=props.mobileWidth)?props.margin.left/1.5:props.margin.left*1.25, right: props.margin.right }}   
            animate={{duration: 800}}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
              />
            }
          >
            {/* <VictoryLabel 
            x={width/2 - 300} 
            y={80}
            style ={{fontSize:fontSize +10}}/> */}
            <VictoryBar horizontal
              data={props.graph_data}
              sortKey = "y"
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
                axisLabel: {fontSize: props.fontSize*2, padding: 50, fontFamily: 'Roboto'}
              }}
            />
            <VictoryAxis
              label = {"Online Sources"}
              style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 350, fontFamily: 'Roboto'}
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
  if(props.filtered_data.length == 0){
    return (
      <div className='dual-display-child'>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }
  return(
      <div class='visualization-window'>
          
          <VictoryChart height={props.height} width={props.width}
            domainPadding={{ x: (props.width>=props.mobileWidth) ? props.margin.right/10 : 0, y:props.margin.top/10 }}
            padding={{ top: props.margin.top, bottom: props.margin.bottom, left: (props.width>=props.mobileWidth)?props.margin.left/1.5:props.margin.left*1.25, right: props.margin.right }}   
            animate={{duration: 800}}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
              />
            }
          >
            {/* <VictoryLabel 
            x={width/2 - 300} 
            y={80}
            style ={{fontSize:fontSize +10}}/> */}
            <VictoryBar horizontal
              data={props.graph_data}
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
                axisLabel: {fontSize: props.fontSize*2, padding: 50, fontFamily: 'Roboto'}
              }}
            />
            <VictoryAxis
              label = {"Online Sources"}
              style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                axisLabel: {fontSize: props.fontSize*2, padding: 350, fontFamily: 'Roboto'}
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

export function InternetSourcesBarChart(props) {
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/Internet%20Sources";
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

    var labelText = "Internet Sources"
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
        labelText += " " + "Other Vocations";
      } else {
        labelText += " " + activeVocation;
      }
    }
    if (activeRegion !== "All") {
      labelText += " in the " + activeRegion + " Region";
    }

    var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
    var filtered_data = filterByVocation(data, activeVocation);
    var graph_data = getInternetSources(filtered_data, true);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
    
    var fontSize = 18
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
          <h2>Where do you most often look for field crop production information on the internet?</h2>
        </div>
        <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        </div>
        <GetChart labelText={labelText} graph_data={graph_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
      </>
      );
}

export function InternetSourcesBarChartCompare(props) {
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/compare/Internet%20Sources";
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

    var labelText = "Internet Sources";
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
        labelText += " " + "Other Vocations";
      } else {
        labelText += " " + activeVocation;
      }
    }
    if (activeRegion !== "All") {
      labelText += " in the " + activeRegion + " Region";
    }

    var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
    var filtered_data = filterByVocation(data, activeVocation);
    var graph_data = getInternetSources(filtered_data, false);
    
    var labelText2 = "Internet Sources"
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
        labelText2 += " " + "Other Vocations";
      } else {
        labelText2 += " " + activeVocation2;
      }
    }
    if (activeRegion2 !== "All") {
      labelText2 += " in the " + activeRegion2 + " Region";
    }

    var data2 = filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2);
    var filtered_data2 = filterByVocation(data2, activeVocation2);
    var graph_data2 = getInternetSources(filtered_data2, false);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw*0.5;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
    
    var fontSize = 18
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
          <h2>Where do you most often look for field crop production information on the internet?</h2>
        </div>

        <div className='dual-display'>
          <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
          <div id="vis-a">
            <GetUnsortedChart labelText={labelText} graph_data={graph_data} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data}/>
          </div>
          <div id="vis-b">
            <GetUnsortedChart labelText={labelText2} graph_data={graph_data2} width={width} height={height} fontSize={fontSize} margin={margin} mobileWidth={mobileWidth} filtered_data={filtered_data2}/>
          </div>
        </div>   
      </>
      );
}