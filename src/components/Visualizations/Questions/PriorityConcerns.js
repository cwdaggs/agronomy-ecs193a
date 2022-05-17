import {filterByCropOrRegion, parseURLCompare, parseURL} from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import "typeface-abeezee";
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { useLocation } from 'react-router-dom';

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

function GetChart(props){
  return(
      <div class='parent flex-parent'>
          <div class='child flex-child'>
            <VictoryLegend
                x={150}
                y={0}
                colorScale={props.colorScale}
                gutter={20}
                style={{labels: {fill: "black", color: "white", fontFamily: 'Roboto', fontSize: props.fontSize}, 
                        title:  {fontFamily: 'Roboto', fontSize: props.fontSize},
                        data:   {stroke: "black", strokeWidth: 1}}}
                title={String(props.titleText + " (n=" + props.n + ")")}
                data={props.legend_data}
            />
          </div>
          <div class='child flex-child'>   
          <VictoryPie
              animate={{
                  duration: 500,               
              }}
              width={props.width}
              height={props.height/2}
              padding={{
                left: props.margin.left,
                  right: props.margin.right,
                  bottom: props.margin.bottom,
                  top: props.margin.top
              }}
              startAngle={0}
              style={{ data: { stroke: "black", strokeWidth: 1}}}
              colorScale={props.colorScale}
              data={props.data_by_reason}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={<VictoryTooltip 
                  style={{
                    fontSize:45,
                    fontFamily: 'Roboto'
                  }}
                  flyoutHeight={50}
                  flyoutWidth={100}    
              />}
          />
          </div>
      </div>    
  )
}

function calculateAllPriorityConcerns(data, filter, job) {
    if(job === "Growers"){
        job = "_Growing_";
    } else {
        job = "_Consulting_";
    }
    var columns = ["Alfalfa" + job + "Concerns",	"Cotton" + job + "Concerns",	"Rice" + job + "Concerns",	"Wild_Rice" + job + "Concerns",	"Wheat" + job + "Concerns",	"Triticale" + job + "Concerns",	
                 "Barley" + job + "Concerns",	"Oats" + job + "Concerns",	"Corn" + job + "Concerns",	"Sorghum" + job + "Concerns",	"Corn_Silage" + job + "Concerns", "Small_Grain_Silage" + job + "Concerns",
                 "Small_Grain_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Pasture" + job + "Concerns",	"Sorghum_Sudangrass_Sudan" + job + "Concerns",	
                 "Mixed_Hay" + job + "Concerns", "Dry_Beans" + job + "Concerns",	"Sunflower" + job + "Concerns",	"Oilseeds" + job + "Concerns", "Sugar_Beets" + job + "Concerns", "Hemp" + job + "Concerns", "Other" + job + "Concerns"]
 
   const myMap = new Map()
   if (filter === "All" || filter === "") {
     var new_modified_data = []
     for (var col in columns) {
       var modified_data = calculatePriorityConcerns(data, columns[col])
       for (var item in modified_data) {
         let key_data = modified_data[item].x
         let value_data = modified_data[item].y
         if (key_data !== "NA") {
           myMap.has(key_data) ? myMap.set(key_data, myMap.get(key_data) + value_data) : myMap.set(key_data, value_data)
         }
       }
     }
     for (const [key, value] of myMap) {
       new_modified_data.push({x: key, y: value});
     }
     return new_modified_data
   } else {
     var new_filter = filter.split(' ').join('_') + job + "Concerns"
     return calculatePriorityConcerns(data, new_filter)
   }
 }
 
function calculatePriorityConcerns(data, filter) { //labelled under concerns right before growing reasons, the q is about challenges
   var modified_data = []
   const myMap = new Map()
   for (var farmer in data) {
     const reasons = String(data[farmer][filter]).split(',')
     for (var reason in reasons) {
       var key = reasons[reason]
       if (key !== "NA" && key !== "undefined") {
         myMap.has(key) ? myMap.set(key, myMap.get(key) + 1) : myMap.set(key, 1)
       }
     }
   }
 
   for (const [key, value] of new Map([...myMap].sort())) {
     key === "Other:" ? modified_data.push({x: "Other", y: value}) : modified_data.push({x: key, y: value})
   }
   return modified_data
 }

export function PriorityConcerns(props) {
    const regionTypes = ["Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];
    const vocationArray = ["Growers", "Consultants"];

    const baseURL = "/results/Priority%20Concerns";
    const filters = parseURL(baseURL, useLocation().pathname, vocationArray);
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

    var titleText = "Concerns for ";
    if (activeRegionOrCrop !== "All") {
      titleText += activeRegionOrCrop + " ";
    }
    titleText += activeVocation;

    var data_filtered = filterByCropOrRegion(props.dataset, activeRegionOrCrop)

    var filter = activeRegionOrCrop
    if (regionTypes.includes(activeRegionOrCrop)){
      filter = "All";
    }
    var data_by_reason = calculateAllPriorityConcerns(data_filtered, filter, activeVocation)

    var legend_data = []
    var n = 0

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw;
    const width = vw;
    const margin = { top: 0, right: 0, bottom: 30, left: width/10 };
    var fontSize = 12;

    for (var i = 0; i < data_by_reason.length; i++) {
        legend_data.push({name: data_by_reason[i].x})
        n += data_by_reason[i].y
    }

    var colorScale = 
    [
      "#002360",    
      "#003F72", 
      "#006083",
      "#008694",
      "#00A498",
      "#02B488",
      "#29C37A",
      "#52D176", 
      "#7ADE7F",
      "#A9E9A3",
      "#D8F4CC"
    ]

    return (
      <>
      <div id='vis-question-label'>
        <h2>What are the highest priority management challenges/concerns?</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <div  class='visualization-window'>
        <GetChart titleText={titleText} width={width} height={height} fontSize={fontSize} margin={margin} colorScale={colorScale} data_by_reason={data_by_reason} legend_data={legend_data} n={n}/>
      </div>
      </>
    );
}

export function PriorityConcernsCompare(props) {
  const regionTypes = ["Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];
  const vocationArray = ["Growers", "Consultants"];

  const baseURL = "/results/compare/Priority%20Concerns";
  const filters = parseURLCompare(baseURL, useLocation().pathname, vocationArray);
  const [activeVocation, setActiveVocation] = useState(filters.vocation);
  const [activeRegionOrCrop, setActiveRegionOrCrop] = useState(filters.cropOrRegion);
  const [activeVocation2, setActiveVocation2] = useState(filters.vocation2);
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

  var titleText = "Concerns for ";
  if (activeRegionOrCrop !== "All") {
    titleText += activeRegionOrCrop + " ";
  }
  titleText += activeVocation;

  var titleText2 = "Concerns for ";
  if (activeRegionOrCrop2 !== "All") {
    titleText2 += activeRegionOrCrop2 + " ";
  }
  titleText2 += activeVocation2;

  var data_filtered = filterByCropOrRegion(props.dataset, activeRegionOrCrop)

  var filter = activeRegionOrCrop
  if (regionTypes.includes(activeRegionOrCrop)){
    filter = "All";
  }
  var data_by_reason = calculateAllPriorityConcerns(data_filtered, filter, activeVocation)

  var legend_data = []
  var n = 0

  var data_filtered2 = filterByCropOrRegion(props.dataset, activeRegionOrCrop2)

  var filter2 = activeRegionOrCrop2
  if (regionTypes.includes(activeRegionOrCrop2)){
    filter2 = "All";
  }
  var data_by_reason2 = calculateAllPriorityConcerns(data_filtered2, filter2, activeVocation2)

  var legend_data2 = []
  var n2 = 0

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw;
  const width = vw;
  const margin = { top: 0, right: 0, bottom: 30, left: width/10 };
  var fontSize = 12;

  for (var i = 0; i < data_by_reason.length; i++) {
      legend_data.push({name: data_by_reason[i].x})
      n += data_by_reason[i].y
  }

  for (var i = 0; i < data_by_reason2.length; i++) {
    legend_data2.push({name: data_by_reason2[i].x})
    n2 += data_by_reason2[i].y
}

  var colorScale = 
  [
    "#002360",    
    "#003F72", 
    "#006083",
    "#008694",
    "#00A498",
    "#02B488",
    "#29C37A",
    "#52D176", 
    "#7ADE7F",
    "#A9E9A3",
    "#D8F4CC"
  ]

  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the highest priority management challenges/concerns?</h2>
    </div>
    <div className="inline-child">
    <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
    </div>
    <div  class='visualization-window'>
      <div className="dual-display">
      <GetChart titleText={titleText} width={width} height={height} fontSize={fontSize} margin={margin} colorScale={colorScale} data_by_reason={data_by_reason} legend_data={legend_data} n={n}/>
      <GetChart titleText={titleText2} width={width} height={height} fontSize={fontSize} margin={margin} colorScale={colorScale} data_by_reason={data_by_reason2} legend_data={legend_data2} n={n2}/>
      </div>
    </div>
    </>
  );
}