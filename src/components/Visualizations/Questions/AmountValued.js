import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, filterByCropOrRegion, filterByVocation, parseURLCompare, filterByCrop, filterByRegion} from '../UseData.js'
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';
import "./Legends.css";

export function calculateValueEach(data, filter, answer){
  var total = 0

  for(var farmer in data){
      if(data[farmer][filter] === answer){
          total ++
      }
  }

  var name = String(filter).split('_')
  var temp = ""

  for(let i = 2; i < name.length - 1; i++){
    temp += name[i] + " ";
  }
  temp += name[name.length - 1]
  return {Value: temp, Total: total, Level_Of_Value: answer}
}

function GetChart(props){
  return(
    <div className='dual-display-child'>
      <div id="vis-legend">
        <div id="legend-title">
          {props.titleText}
        </div>
        <div id="legend-values">
          <div className='legend-circle' id="three-color-first"></div>
          <span className='legend-value'>Very Valuable</span>
          <div className='legend-circle' id="three-color-second"></div>
          <span className='legend-value'>Somewhat Valuable</span>
          <div className='legend-circle' id="three-color-third"></div>
          <span className='legend-value'>Not Valuable</span>
        </div>
      </div>
      <div class='visualization-window'>
        <VictoryChart
          horizontal={true}
          animate={{
              duration: 500,               
          }}
          height={props.height} 
          width={props.width}
          domainPadding={{ x: props.margin.right/4, y: props.margin.top/10 }}
          padding={{ top: (props.width>=props.mobileWidth)?props.margin.top:props.margin.top*2, bottom: props.margin.bottom, left: props.margin.left/1.5, right: (props.width>=props.mobileWidth)?props.margin.right:props.margin.right/2 }} 
        >
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 0.2, fontFamily: 'Roboto'}
            }}
            colorScale={props.colorScale}
          >
            {props.dataset_final.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => Math.round(datum.y) + "%"}
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:props.fontSize, fontFamily: 'Roboto'
                      }}
                      flyoutHeight={25}
                      flyoutWidth={40}    
                    />
                }/>;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis
            tickFormat={(tick) => `${tick}%`}
            style={{
                axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
                ticks: {stroke: "grey", size: 5, fontFamily: 'Roboto'},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
          label="Fields of Interest"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                axisLabel: {fontSize: 30, padding: 340, fontFamily: 'Roboto'}
              }}
            tickLabelComponent={       
              <VictoryLabel    
                  textAnchor="end"
              />   
            }
          />
        </VictoryChart>
      </div>
    </div>
  )
}

export function calculateValueTotalsForEachElement(data){
  var questions = [
    "Amount_Valued_Continuing_Education_Credits",
    "Amount_Valued_On_Farm_Consultations",
    "Amount_Valued_Crop_Injury_Diagnosis",
    "Amount_Valued_On_Farm_Trials"
  ]
  var very = []
  var somewhat = []
  var not = []

  for(var i in questions){
      very.push(calculateValueEach(data, questions[i], "Very Valuable"))
      somewhat.push(calculateValueEach(data, questions[i], "Somewhat Valuable"))
      not.push(calculateValueEach(data, questions[i], "Not Valuable"))
  }

  return [very, somewhat, not]
}

// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.Value, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Value };
    });
  });
}

function calculateAverageResponses(dataset) {
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  var sum = 0;
  for (var i = 0; i < totals.length; i++) {
    sum += totals[i];
  }
  return Math.round(sum / totals.length);
}

export function AmountVictory(props) {
  const vocationArray = ["All", "Growers", "Consultants"];

  const baseURL = "/results/Value%20Assessment";
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

  var titleText = "Level of Value";
  if (crops.includes(activeCrop)) {
    titleText += " for " + activeRegion + " " + activeCrop;
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeCrop)) {
      titleText += " " + activeVocation;
    }
  }

  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation)
  var data_by_value = calculateValueTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_very(data_by_value)
  const dataset_final = transformData(data_sorted)
  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/16, right: width/8, bottom: height/4, left: width/4 };

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

  // const colorScale = ["#003f5c",
  //   "#bc5090",
  //   "#ffa600"];

  // var colorScale = [   
  //   "#577B44",  
  //   "#90A770",
  //   "#C7BFA0",
  // ];
  var colorScale = 
  [  
    "#003F72",   
    "#00728C",
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
  const legend_data = [{name: "Very Valuable"}, {name: "Somewhat Valuable"}, {name: "Not Valuable"}]

  return (
    <>
    <div id='vis-question-label'>
      <h2>How much do you value the following:</h2>
    </div>
    <div className="inline-child">
    <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
    </div>
    <GetChart legend_data={legend_data} dataset_final={dataset_final} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText}/>
    </>
  );
}

export function AmountVictoryCompare(props) {
  const vocationArray = ["All", "Growers", "Consultants"];

  const baseURL = "/results/compare/Value%20Assessment";
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

  var titleText = "Level of Value";
  if (crops.includes(activeCrop)) {
    titleText += " for " + activeRegion + " " + activeCrop;
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeCrop)) {
      titleText += " " + activeVocation;
    }
  }

  var data_filtered = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion), activeVocation)
  var data_by_value = calculateValueTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_very(data_by_value)
  const dataset_final = transformData(data_sorted)
  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";


  var titleText2 = "Level of Value";
  if (crops.includes(activeCrop2)) {
    titleText2 += " for " + activeRegion2 + " " + activeCrop2;
  }
  if (activeVocation2 !== "All") {
    if (crops.includes(activeCrop2)) {
      titleText2 += " " + activeVocation2;
    }
  }

  var data_filtered2 = filterByVocation(filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2), activeVocation2)
  var data_by_value2 = calculateValueTotalsForEachElement(data_filtered2)
  var data_sorted2 = sort_by_very(data_by_value2)
  const dataset_final2 = transformData(data_sorted2)
  titleText2 += " (n = " + calculateAverageResponses(data_sorted2) + ")";


  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/20, right: width/16, bottom: height/8, left: width/5 };

  var fontSize = 25
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2.5
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  var colorScale = 
  [  
    "#003F72",   
    "#00728C",
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
  const legend_data = [{name: "Very Valuable"}, {name: "Somewhat Valuable"}, {name: "Not Valuable"}]

  return (
    <>
      <div id='vis-question-label'>
        <h2>How much do you value the following:</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <div className='dual-display'>
        <GetChart legend_data={legend_data} dataset_final={dataset_final} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText}/>
        <GetChart legend_data={legend_data} dataset_final={dataset_final2} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText2}/>
      </div>
    </>
  );
}