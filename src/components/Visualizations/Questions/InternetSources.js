import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
import {useState} from 'react';
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";

function getInternetSources(data){
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

  var colors = [
    "#212011",
    "#2C2D17",
    "#35381D",
    "#3D4323",
    "#444F2A",
    "#4A5A30",
    "#4F6536",
    "#53703D",
    "#577B44",
    "#59864A",
    "#5B9151",
    "#699759",
    "#769C60",
    "#83A268",
    "#90A770",
    "#9CAD78",
    "#A8B280",
    "#B2B888",
    "#BDBD90",
    "#C2BE98",
    "#C7BFA0",
  ];

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
  sources[5] = "UC Cooperative Extension\nMagazine Articles"
  sources[6] = "Personal contact\n(phone, email, on-farm consultation)";
  sources[7] = "In-person meetings\n(Field Days, Grower Meetings)";

  for(var l=0; l<totals.length; l++){
    modified_data.push({x: sources[l], y: totals[l]});
  }
  modified_data.sort(function(a,b){return a.y - b.y;});
  for(var l=0; l<modified_data.length; l++){
    modified_data[l].fill = colors[l];
  }
  return modified_data;
}

export function InternetSourcesBarChart(props) {
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

    var data = filterByCropOrRegion(props.dataset, activeRegionOrCrop);
    if ((activeVocation === "Allied Industry" || activeVocation === "Other") && crops.includes(activeRegionOrCrop)) {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, activeVocation);
    var graph_data = getInternetSources(filtered_data);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh*0.9;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
    const fontSize = 18;

    return (
      <>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
      </div>
        <div class='visualization-window'>
          
          <VictoryChart height={height} width={width}
            domainPadding={{ x: margin.right/10, y: margin.top/10 }}
            padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}   
            animate={{duration: 800}}
          >
            {/* <VictoryLabel 
            x={width/2 - 300} 
            y={80}
            style ={{fontSize:fontSize +10}}/> */}
            <VictoryBar horizontal
              data={graph_data}
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
              label = {"Number of Responses " + "(n = " + filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 5},
                axisLabel: {fontSize: fontSize*2, padding: 50}
              }}
            />
            <VictoryAxis
              label = {"Online Sources"}
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