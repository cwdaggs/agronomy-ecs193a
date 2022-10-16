import {VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCrop, filterByRegion, filterByVocation, parseURLCompare, sort_by_freq} from '../UseData.js'
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import {useState} from 'react';
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';
import "./Legends.css";

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
const margin = { top: height/16, right: width/8, bottom: height/4, left: width/4 };
const mobileWidth = 1000;
const laptopWidth = 1500;
const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

export function calculateEngageEach(data, filter, answer){
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
    return {Engage: temp, Total: total, Level_Of_Engage: answer}
}

export function calculateEngageTotalsForEachElement(data){
    var questions = [
      "UCCE_Engagement_Attend_Field_Day",
      "UCCE_Engagement_Read_Blog",
      "UCCE_Engagement_Call_Advisor",
      "UCCE_Engagement_Read_Newsletter",
      "UCCE_Engagement_Interact_with_Social_Media"
    ]
    var annual = []
    var peryear = []
    var monthly = []
    var weekly = []
    var never = []
  
    for(var i in questions){
        annual.push(calculateEngageEach(data, questions[i], "1-2 times/year"))
        peryear.push(calculateEngageEach(data, questions[i], "3-6 times per year"))
        monthly.push(calculateEngageEach(data, questions[i], "1-2 times/month"))
        weekly.push(calculateEngageEach(data, questions[i], "1-3 times/week"))
        never.push(calculateEngageEach(data, questions[i], "Never"))
    }
  
    return [weekly, monthly, peryear, annual, never]
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
      return { x: datum.Engage, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Engage };
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

function GetResponses(data){
  var topics = [
    "UCCE_Engagement_Attend_Field_Day",
    "UCCE_Engagement_Read_Blog",
    "UCCE_Engagement_Call_Advisor",
    "UCCE_Engagement_Read_Newsletter",
    "UCCE_Engagement_Interact_with_Social_Media"
  ]

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
            <span className='legend-value'>1-3/week</span>
            <div className='legend-circle' id="five-color-second"></div>
            <span className='legend-value'>1-2/month</span>
            <div className='legend-circle' id="five-color-third"></div>
            <span className='legend-value'>3-6/year</span>
            <div className='legend-circle' id="five-color-fourth"></div>
            <span className='legend-value'>1-2/year</span>
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
          <span className='legend-value'>1-3/week</span>
          <div className='legend-circle' id="five-color-second"></div>
          <span className='legend-value'>1-2/month</span>
          <div className='legend-circle' id="five-color-third"></div>
          <span className='legend-value'>3-6/year</span>
          <div className='legend-circle' id="five-color-fourth"></div>
          <span className='legend-value'>1-2/year</span>
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
                data: { stroke: "black", strokeWidth: 0.2, fontFamily: 'Roboto'}
            }}
            colorScale={colorScale}
          >
            {props.dataset_final.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) => datum.concern + ": " + Math.round(datum.y) + "%"}
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
                events={{onClick: (evt) => console.log(evt)}}
              />   
            }
          />
        </VictoryChart>
      </div>
    </div>
  )
}

function DetermineTitleText(activeVocation, activeCrop, activeRegion, responses) {
  var titleText = "UCCE Engagement Frequency";
  if (activeCrop !== "All" || activeVocation !== "All") {
    titleText += " for";
  }
  if (activeCrop !== "All") {
    if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
      titleText += " " + activeCrop;
    }
  }
  if (activeVocation !== "All") {
    if (activeVocation === "Other") {
      titleText += " Other Vocations";
    } else {
      titleText += " " + activeVocation;
    }
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
  var fontSize = 20
  const mobileFontSize = 6
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }
  return fontSize
}

export function EngageVictory(props) {
  const baseURL = "/results/UCCE%20Engagement";
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

  var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
  var data_filtered = filterByVocation(data, activeVocation)
  var data_by_engage = calculateEngageTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_freq(data_by_engage)
  const dataset_final = transformData(data_sorted)

  var responses = GetResponses(data_filtered)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses);

  var fontSize = DetermineFontSize()

  return (
    <>
      <div id='vis-question-label'>
        <h2>How often do you engage with the UCCE in the following ways?</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegion vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <GetChart dataset_final={dataset_final} fontSize={fontSize} titleText={titleText} data={data_filtered}/>
    </>
  );
}

export function EngageVictoryCompare(props) {
  const baseURL = "/results/compare/UCCE%20Engagement";
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

  // Data previously sorted after by_engage
  var data = filterByRegion(filterByCrop(props.dataset, activeCrop), activeRegion);
  var data_filtered = filterByVocation(data, activeVocation)
  var data_by_engage = calculateEngageTotalsForEachElement(data_filtered)
  const dataset_final = transformData(data_by_engage)
    var responses = GetResponses(data_filtered)
  var titleText = DetermineTitleText(activeVocation, activeCrop, activeRegion, responses);

  var data2 = filterByRegion(filterByCrop(props.dataset, activeCrop2), activeRegion2);
  var data_filtered2 = filterByVocation(data2, activeVocation2)
  var data_by_engage2 = calculateEngageTotalsForEachElement(data_filtered2)
  const dataset_final2 = transformData(data_by_engage2)
  var responses2 = GetResponses(data_filtered2)
  var titleText2 = DetermineTitleText(activeVocation2, activeCrop2, activeRegion2, responses2);

  var fontSize = DetermineFontSize()
  
  return (
    <>
      <div id='vis-question-label'>
        <h2>How often do you engage with the UCCE in the following ways?</h2>
      </div>

      <div className='dual-display'>
        <VocationAndRegionCompare vocationFunction={vocationFunction} regionFunction={regionFunction} cropFunction={cropFunction} activeVocation={activeVocation} activeRegion={activeRegion} activeCrop={activeCrop} vocationFunction2={vocationFunction2} regionFunction2={regionFunction2} cropFunction2={cropFunction2} activeVocation2={activeVocation2} activeCrop2={activeCrop2} activeRegion2={activeRegion2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
        <div id="vis-a">
          <GetChart dataset_final={dataset_final} fontSize={fontSize} titleText={titleText} data={data_filtered}/>
        </div>
        <div id="vis-b">
          <GetChart dataset_final={dataset_final2} fontSize={fontSize} titleText={titleText2} data={data_filtered2}/>
        </div>
      </div>   
    </>
  );
}