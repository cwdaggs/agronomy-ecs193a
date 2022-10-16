import {VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip} from 'victory';
import {parseURLCompare, parseURL, sort_by_freq, filterByCrop, filterByRegion} from '../UseData.js'
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import { useLocation } from 'react-router-dom';
import "./Legends.css";

const vocationArray = ["Growers", "Consultants"];
const colorScale = 
  [
    "#002360", 
    "#006083",  
    "#009B9C",
    "#02B488",
    "#7ADE7F",
    "#8FE48F",
    "#A9E9A3",
    "#C3EFB8",
    "#D8F4CC"
  ]
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw*0.5;
const width = vw;
const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
const mobileWidth = 1000;
const laptopWidth = 1500;

export function calculateAffectEach(data, filter, answer){
  var total = 0

  for(var farmer in data){
      if(data[farmer][filter] === answer){
          total ++
      }
  }

  var name = String(filter).split('_')
  var temp = ""

  for(let i = 4; i < name.length - 1; i++){
    temp += name[i] + " ";
  }
  temp += name[name.length - 1]
  return {Affect: temp, Total: total, Level_Of_Affect: answer}
}

export function calculateConsultantAffectTotalsForEachElement(data){
  var questions = ["Affected_Crop_Production_Recommendation_Profitability", 
                  "Affected_Crop_Production_Recommendation_Crop_Yield",
                  "Affected_Crop_Production_Recommendation_Crop_Quality", 
                  "Affected_Crop_Production_Recommendation_Input_Costs", 
                  "Affected_Crop_Production_Recommendation_Soil_Fertility", 
                  "Affected_Crop_Production_Recommendation_Land_Stewardship", 
                  "Affected_Crop_Production_Recommendation_Natural_Resource_Conservation", 
                  "Affected_Crop_Production_Recommendation_Meeting_Government_Regulations", 
                  "Affected_Crop_Production_Recommendation_Labor_Required", 
                  "Affected_Crop_Production_Recommendation_Ease_of_Implementation", 
                  "Affected_Crop_Production_Recommendation_Certainty_in_Management_Practice", 
                  "Affected_Crop_Production_Recommendation_Availability_of_Outreach_Information", 
                  "Affected_Crop_Production_Recommendation_Water_Availability"]
  var always = []
  var often = []
  var sometimes = []
  var rarely = []
  var never = []

  for(var i in questions){
      always.push(calculateAffectEach(data, questions[i], "Always"))
      often.push(calculateAffectEach(data, questions[i], "Often"))
      sometimes.push(calculateAffectEach(data, questions[i], "Sometimes"))
      rarely.push(calculateAffectEach(data, questions[i], "Rarely"))
      never.push(calculateAffectEach(data, questions[i], "Never"))
  }

  return [always, often, sometimes, rarely, never]
}

export function calculateGrowerAffectTotalsForEachElement(data){
  var questions = ["Affected_Crop_Production_Management_Profitability", 
                  "Affected_Crop_Production_Management_Crop_Yield",
                  "Affected_Crop_Production_Management_Crop_Quality", 
                  "Affected_Crop_Production_Management_Input_Costs", 
                  "Affected_Crop_Production_Management_Soil_Fertility", 
                  "Affected_Crop_Production_Management_Land_Stewardship", 
                  "Affected_Crop_Production_Management_Natural_Resource_Conservation", 
                  "Affected_Crop_Production_Management_Meeting_Government_Regulations", 
                  "Affected_Crop_Production_Management_Labor_Required", 
                  "Affected_Crop_Production_Management_Ease_of_Implementation", 
                  "Affected_Crop_Production_Management_Certainty_in_Management_Practice", 
                  "Affected_Crop_Production_Management_Availability_of_Outreach_Information", 
                  "Affected_Crop_Production_Management_Water_Availability"]
  var always = []
  var often = []
  var sometimes = []
  var rarely = []
  var never = []

  for(var i in questions){
      always.push(calculateAffectEach(data, questions[i], "Always"))
      often.push(calculateAffectEach(data, questions[i], "Often"))
      sometimes.push(calculateAffectEach(data, questions[i], "Sometimes"))
      rarely.push(calculateAffectEach(data, questions[i], "Rarely"))
      never.push(calculateAffectEach(data, questions[i], "Never"))
  }

  return [always, often, sometimes, rarely, never]
}

function GetResponses(data, active_vocation){

  var vocation_verb = "Management"

  if(active_vocation === "Consultants"){
    vocation_verb = "Recommendation"
  }

  var topics = ["Affected_Crop_Production_" + vocation_verb + "_Profitability", 
  "Affected_Crop_Production_" + vocation_verb + "_Crop_Yield",
  "Affected_Crop_Production_" + vocation_verb + "_Crop_Quality", 
  "Affected_Crop_Production_" + vocation_verb + "_Input_Costs", 
  "Affected_Crop_Production_" + vocation_verb + "_Soil_Fertility", 
  "Affected_Crop_Production_" + vocation_verb + "_Land_Stewardship", 
  "Affected_Crop_Production_" + vocation_verb + "_Natural_Resource_Conservation", 
  "Affected_Crop_Production_" + vocation_verb + "_Meeting_Government_Regulations", 
  "Affected_Crop_Production_" + vocation_verb + "_Labor_Required", 
  "Affected_Crop_Production_" + vocation_verb + "_Ease_of_Implementation", 
  "Affected_Crop_Production_" + vocation_verb + "_Certainty_in_Management_Practice", 
  "Affected_Crop_Production_" + vocation_verb + "_Availability_of_Outreach_Information", 
  "Affected_Crop_Production_" + vocation_verb + "_Water_Availability"]

  //console.log(data);
  var amount = 0
  for (var j in data){

    if(data[j][String(topics[0])] === "NA"){
      for (var i in topics){
        if(data[j][String(topics[i])] !== "NA"){
          amount += 1;
          break;
        }
      }
    }else{
      amount += 1;
    }    
  }
  //console.log(amount)
  return amount;
}

// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  for (var i = 0; i < totals.length; i++) {
    if (totals[i] === 0) {
      totals[i] = 1;
    }
  }
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.Affect, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Affect };
    });
  });
}

// function calculateAverageResponses(dataset) {
//   const totals = dataset[0].map((data, i) => {
//     return dataset.reduce((memo, curr) => {
//       return memo + curr[i].Total;
//     }, 0);
//   });
//   var sum = 0;
//   for (var i = 0; i < totals.length; i++) {
//     sum += totals[i];
//   }
//   return Math.round(sum / totals.length);
// }

function GetChart(props){
  if(props.data.length === 0){
    return (
      <div className='dual-display-child'>
        <div id="vis-legend">
          <div id="legend-title">
            {props.titleText}
          </div>
          <div id="legend-values">
            <div className='legend-circle' id="five-color-first"></div>
            <span className='legend-value'>Always</span>
            <div className='legend-circle' id="five-color-second"></div>
            <span className='legend-value'>Often</span>
            <div className='legend-circle' id="five-color-third"></div>
            <span className='legend-value'>Sometimes</span>
            <div className='legend-circle' id="five-color-fourth"></div>
            <span className='legend-value'>Rarely</span>
            <div className='legend-circle' id="five-color-fifth"></div>
            <span className='legend-value'>Never</span>
          </div>
        </div>
        <p>Insufficient data for this set of filters. (n=0)</p>         
      </div>
      )
  }

  return(
    <div className='dual-display-child'>
      <div id="vis-legend">
          <div id="legend-title">
            {props.titleText}
          </div>
          <div id="legend-values">
            <div className='legend-circle' id="five-color-first"></div>
            <span className='legend-value'>Always</span>
            <div className='legend-circle' id="five-color-second"></div>
            <span className='legend-value'>Often</span>
            <div className='legend-circle' id="five-color-third"></div>
            <span className='legend-value'>Sometimes</span>
            <div className='legend-circle' id="five-color-fourth"></div>
            <span className='legend-value'>Rarely</span>
            <div className='legend-circle' id="five-color-fifth"></div>
            <span className='legend-value'>Never</span>
          </div>
        </div>
      <div class='visualization-window'>
        <VictoryChart
          horizontal={true}
          animate={{
              duration: 1000,               
          }}
          height={height} 
          width={width}
          domainPadding={{ x: margin.right/5, y: margin.top/10 }}
          padding={{ top: (width>=mobileWidth)?margin.top:margin.top*2, bottom: margin.bottom, left: margin.left/1.5, right: (width>=mobileWidth)?margin.right:margin.right/2 }}   
        >
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 0.2}
            }}
            colorScale={colorScale}
          >
            {props.dataset_final.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => datum.concern + ": " +  Math.round(datum.y) + "%" }
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:props.fontSize, fontFamily: 'Roboto'
                      }}
                      constrainToVisibleArea={'true'}  
                    />
                }/>;
            })}
          </VictoryStack>
          <VictoryAxis dependentAxis
            tickFormat={(tick) => `${tick}%`}
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
              }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="start"
                style={{fill: "white", fontSize: props.fontSize}}
                dx={props.fontSize}
              />
            }
          />
        </VictoryChart>
      </div>      
    </div>
  )
}

function DetermineTitleText(activeVocation, activeCrop, activeRegion, responses) {
  var titleText = activeVocation === "Consultants" ? "Frequency of Effect on Recommendations" : "Frequency of Effect on Management Decisions";
  if (activeCrop !== "All") {
    titleText += " for " + activeCrop;
  }
  if (activeRegion !== "All") {
    if (activeRegion === "NSJV") {
      titleText += " in the North San Joaquin Valley Region";
    }
    else if (activeRegion === "SSJV") {
      titleText += " in the South San Joaquin Valley Region";
    }
    else {
      titleText += " in the " + activeRegion + " Region";
    }
  }
  titleText += " (n = " + responses + ")";
  return titleText
}

function DetermineFontSize() {
  var fontSize = 16
  const mobileFontSize = 6
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  return fontSize
}

export function AffectVictory(props) {
  const baseURL = "/results/Priority%20Effect";
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
  
  var data_filtered = filterByCrop(filterByRegion(props.dataset, activeRegion), activeCrop);
  var data_by_affect = activeVocation === "Consultants" ? calculateConsultantAffectTotalsForEachElement(data_filtered) : 
                      calculateGrowerAffectTotalsForEachElement(data_filtered);
  var questionText = activeVocation === "Consultants" ? "How often do the following priorities affect your recommendations for field crop production?" : 
                    "How often do the following priorities affect your management decisions for field crop production?";
  var data_sorted = sort_by_freq(data_by_affect)
  const dataset_final = transformData(data_sorted)
  var responses = GetResponses(data_filtered, activeVocation)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses)
  var fontSize = DetermineFontSize()

  return (
    <>
      <div id='vis-question-label'>
        <h2>{questionText}</h2>
      </div>
      <div className="inline-child">
      <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <>
        <GetChart titleText={titleText} dataset_final={dataset_final} fontSize={fontSize} data={data_filtered}></GetChart>
      </>
    </>
  );
}

export function AffectVictoryCompare(props) {
  const baseURL = "/results/compare/Priority%20Effect";
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

  // Data previously sorted by freq after by_affect
  var data_filtered = filterByCrop(filterByRegion(props.dataset, activeRegion), activeCrop);
  var data_by_affect = activeVocation === "Consultants" ? calculateConsultantAffectTotalsForEachElement(data_filtered) : 
                      calculateGrowerAffectTotalsForEachElement(data_filtered);

  var responses = GetResponses(data_filtered, activeVocation)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses)
  const dataset_final = transformData(data_by_affect)

  var data_filtered2 = filterByCrop(filterByRegion(props.dataset, activeRegion2), activeCrop2);
  var data_by_affect2 = activeVocation2 === "Consultants" ? calculateConsultantAffectTotalsForEachElement(data_filtered2) : 
                      calculateGrowerAffectTotalsForEachElement(data_filtered2);
  var responses2 = GetResponses(data_filtered2, activeVocation2)
  var titleText2 = DetermineTitleText(activeVocation2, activeCrop2, activeRegion2, responses2)
  const dataset_final2 = transformData(data_by_affect2)

  var fontSize = DetermineFontSize()

  return (
    <>
    <div id='vis-question-label'>
       <h2>How often do the following priorities affect your management decisions/recommendations for field crop production?</h2>
    </div>

    <div className='dual-display'>
      <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      <div id="vis-a">
        <GetChart titleText={titleText} dataset_final={dataset_final} fontSize={fontSize} compare={true} data={data_filtered}/>
      </div>
      <div id="vis-b">
        <GetChart titleText={titleText2} dataset_final={dataset_final2} fontSize={fontSize} compare={true} data={data_filtered2}/>
      </div>
    </div>
    </>
  );
}