import {parseURLCompare, parseURL, filterByRegion, filterByCrop, filterByVocation} from "../UseData.js";
import {VictoryChart, VictoryAxis, VictoryBar, VictoryLabel, VictoryTooltip} from 'victory';
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { useLocation } from 'react-router-dom';

const vocationArray = ["Growers", "Consultants"];
const colorScale = 
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

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const mobileWidth=1000;
const margin = { top: height/20, right: width/8, bottom: height/4, left: width/8 };
const fontSize = (width >= mobileWidth) ? 20: 10;

function GetChart(props){
  if(props.data_filtered.length === 0){
    return (
      <>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </>
      )
  }
  return(
    <>
    <div class='visualization-window'>
          <VictoryChart horizontal={false} height={height} width={width}
            domainPadding={{ x: margin.right/5.3, y: margin.top }}
            padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
            animate={{duration: 800}}
          >
          <VictoryBar
            data={props.data_by_reason}
            alignment="start"
            style={{ data:  { fill: ({datum}) => datum.fill, strokeWidth: 1, stroke: 'black'}}}
            labels={({ datum }) => `${datum.y + " Respondents"}`}
            labelComponent={
              <VictoryTooltip 
                style={{
                  fontSize: fontSize,
                  fontFamily: 'Roboto'
                }}
                constrainToVisibleArea={'true'}    
              />
          }
          />
          <VictoryAxis dependentAxis
          label = {String(props.titleText + " (n=" + props.data_filtered.length + ")")}
          style={{
            fontFamily: 'Roboto',
            tickLabels: {fontSize: fontSize, padding: 15, fontFamily: 'Roboto'},
            axisLabel: {fontSize: fontSize, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 60: 35}
          }}
          
          />
          <VictoryAxis
            style={{
              tickLabels: {fontSize: fontSize, padding: 5, fontFamily: 'Roboto'},
              axisLabel: {fontSize: fontSize, fontFamily: 'Roboto', padding: (width >= mobileWidth) ? 60: 20}
              }}
              tickLabelComponent={       
                <VictoryLabel    
                    textAnchor="start"
                    angle={25}
                    style={{fill: "black", fontSize: fontSize}}
                />   
              }
          />                        
        </VictoryChart>
    </div>
  </>
  )
}

function calculateAllPriorityConcerns(data, job, crop)  {
  if (job === "Growers"){
    job = "_Growing_";
  } else {
      job = "_Consulting_";
  }

  var columns = [crop.split(' ').join('_') + job + "Concerns"]

  if(crop === "All"){
    columns = ["Alfalfa" + job + "Concerns",	"Cotton" + job + "Concerns",	"Rice" + job + "Concerns",	"Wild_Rice" + job + "Concerns",	"Wheat" + job + "Concerns",	"Triticale" + job + "Concerns",	
              "Barley" + job + "Concerns",	"Oats" + job + "Concerns",	"Corn" + job + "Concerns",	"Sorghum" + job + "Concerns",	"Corn_Silage" + job + "Concerns", "Small_Grain_Silage" + job + "Concerns",
              "Small_Grain_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Pasture" + job + "Concerns",	"Sorghum_Sudangrass_Sudan" + job + "Concerns",	
              "Mixed_Hay" + job + "Concerns", "Dry_Beans" + job + "Concerns",	"Sunflower" + job + "Concerns",	"Oilseeds" + job + "Concerns", "Sugar_Beets" + job + "Concerns", "Hemp" + job + "Concerns", "Other" + job + "Concerns"]
  } 

  let modified_data = [];
  const myMap = new Map()

  data.forEach(farmer => {
    const reasons = new Set(); 
    columns.forEach(crop =>{
      farmer[crop].split(",").forEach(reason => {
        if((String(reason) !== "NA") && (String(reason) !== "")){
            reasons.has(reason) ? console.log("duplicate") : reasons.add(reason)
        }
      });
      console.log(reasons)
    });
    reasons.forEach(reason => {
      myMap.has(reason) ? myMap.set(reason, myMap.get(reason) + 1) : myMap.set(reason, 1)
    })
  });
  for (const [key, value] of new Map([...myMap].sort())) {
    modified_data.push({x: key, y: value});
  }
  return modified_data;
}

function DetermineTitleText(activeVocation, activeCrop, activeRegion) {
  var titleText = "For ";
    if (activeRegion !== "All") {
      titleText += activeRegion + " ";
    }

    if (activeCrop !== "All") {
      titleText += activeCrop + " ";
    }

    titleText += activeVocation;
    return titleText;
}

function AdjustColors(data_by_reason) {
  var counter = colorScale.length - 1;
  for (var obj of data_by_reason) {
    if (obj.x === "Other:") {
      obj.x = "Other"
    }
    obj.fill = colorScale[counter];
    counter--;
  }
  return data_by_reason
}

export function PriorityConcerns(props) {
    const baseURL = "/results/Priority%20Concerns";
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

    var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion);
    var data_filtered = filterByVocation(filterByCrop(filterByRegion(props.dataset, activeRegion), activeCrop), activeVocation);
    var data_by_reason = AdjustColors(calculateAllPriorityConcerns(data_filtered, activeVocation, activeCrop))

    return (
      <>
      <div id='vis-question-label'>
        <h2>What are the highest priority management challenges/concerns?</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <div>
        <GetChart titleText={titleText} data_by_reason={data_by_reason} data_filtered={data_filtered}/>
      </div>
      </>
    );
}

export function PriorityConcernsCompare(props) {
  const baseURL = "/results/compare/Priority%20Concerns";
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

  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion);
  var data_filtered = filterByCrop(filterByRegion(props.dataset, activeRegion), activeCrop);
  var data_by_reason = AdjustColors(calculateAllPriorityConcerns(data_filtered, activeVocation, activeCrop))

  var titleText2 = DetermineTitleText(activeVocation2, activeCrop2, activeRegion2);
  var data_filtered2 = filterByVocation(filterByCrop(filterByRegion(props.dataset, activeRegion2), activeCrop2), activeVocation2);
  var data_by_reason2 = AdjustColors(calculateAllPriorityConcerns(data_filtered2, activeVocation2, activeCrop2))

  return (
    <>
    <div id='vis-question-label'>
      <h2>What are the highest priority management challenges/concerns?</h2>
    </div>

    <div className='dual-display'>
        <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        <div id="vis-a">
          <GetChart titleText={titleText} data_by_reason={data_by_reason} data_filtered={data_filtered}/>
        </div>
        <div id="vis-b">
          <GetChart titleText={titleText2} data_by_reason={data_by_reason2} data_filtered={data_filtered2}/>
        </div>
    </div>
    </>
  );
}