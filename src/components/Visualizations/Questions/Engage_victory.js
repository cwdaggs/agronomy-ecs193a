import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCropOrRegion, filterByVocation, parseURLCompare, sort_by_freq} from '../UseData.js'
import "typeface-abeezee";
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import {useState} from 'react';
import { parseURL } from '../UseData.js';
import { useLocation } from 'react-router-dom';

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
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.Engage, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Engage };
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

function GetChart(props){
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
          height={props.height} 
          width={props.width}
          domainPadding={{ x: props.margin.right/5, y: props.margin.top/10 }}
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
                labels={({datum}) =>  Math.round(datum.y) + "%"}
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
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
            // label="Type of Engagement"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                // axisLabel: {fontSize: 30, padding: 360}
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

export function EngageVictory(props) {
  
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/UCCE%20Engagement";
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

  var titleText = "UCCE Engagement Frequency";
  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for ";
    if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
      titleText += activeRegionOrCrop;
    }
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeRegionOrCrop)) {
      titleText += " " + activeVocation;
      if (activeVocation === "Other") {
        titleText += " Vocations";
      }
    } else {
      titleText += " for " + activeVocation;
      if (activeVocation === "Other") {
        titleText += " Vocations";
      }
    }
  }
  if (!crops.includes(activeRegionOrCrop) && activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data = filterByCropOrRegion(props.dataset, activeRegionOrCrop);
  if ((activeVocation === "Allied Industry" || activeVocation === "Other") && crops.includes(activeRegionOrCrop)) {
    data = props.dataset;
  }
  var data_filtered = filterByVocation(data, activeVocation)
  var data_by_engage = calculateEngageTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_freq(data_by_engage)
  const dataset_final = transformData(data_sorted)

  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/16, right: width/8, bottom: height/4, left: width/4 };
  var colorScale = 
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
  var fontSize = 20
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
  }
  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }

  const legend_data = [{name: "1-3/week"}, {name: "1-2/month"}, {name: "3-6/year"}, {name: "1-2/year"}, {name: "Never"}]

  return (

    <>
      <div id='vis-question-label'>
        <h2>How often do you engage with the UCCE in the following ways?</h2>
      </div>
      <div className="inline-child">
            <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <GetChart legend_data={legend_data} dataset_final={dataset_final} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText}/>
    </>
  );
}

export function EngageVictoryCompare(props) {
  
  const vocationArray = ["All", "Allied Industry", "Consultants", "Growers", "Other"];

  const baseURL = "/results/compare/UCCE%20Engagement";
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

  var titleText = "UCCE Engagement Frequency";
  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for ";
    if (activeVocation !== "Allied Industry" && activeVocation !== "Other") {
      titleText += activeRegionOrCrop;
    }
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeRegionOrCrop)) {
      titleText += " " + activeVocation;
      if (activeVocation === "Other") {
        titleText += " Vocations";
      }
    } else {
      titleText += " for " + activeVocation;
      if (activeVocation === "Other") {
        titleText += " Vocations";
      }
    }
  }
  if (!crops.includes(activeRegionOrCrop) && activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data = filterByCropOrRegion(props.dataset, activeRegionOrCrop);
  if ((activeVocation === "Allied Industry" || activeVocation === "Other") && crops.includes(activeRegionOrCrop)) {
    data = props.dataset;
  }
  var data_filtered = filterByVocation(data, activeVocation)
  var data_by_engage = calculateEngageTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_freq(data_by_engage)
  const dataset_final = transformData(data_sorted)

  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";


  var titleText2 = "UCCE Engagement Frequency";
  if (crops.includes(activeRegionOrCrop2)) {
    titleText2 += " for ";
    if (activeVocation2 !== "Allied Industry" && activeVocation2 !== "Other") {
      titleText2 += activeRegionOrCrop2;
    }
  }
  if (activeVocation2 !== "All") {
    if (crops.includes(activeRegionOrCrop2)) {
      titleText2 += " " + activeVocation2;
      if (activeVocation2 === "Other") {
        titleText2 += " Vocations";
      }
    } else {
      titleText2 += " for " + activeVocation2;
      if (activeVocation2 === "Other") {
        titleText2 += " Vocations";
      }
    }
  }
  if (!crops.includes(activeRegionOrCrop2) && activeRegionOrCrop2 !== "All") {
    titleText2 += " in the " + activeRegionOrCrop2 + " Region";
  }

  var data2 = filterByCropOrRegion(props.dataset, activeRegionOrCrop2);
  if ((activeVocation2 === "Allied Industry" || activeVocation2 === "Other") && crops.includes(activeRegionOrCrop2)) {
    data2 = props.dataset;
  }
  var data_filtered2 = filterByVocation(data2, activeVocation2)
  var data_by_engage2 = calculateEngageTotalsForEachElement(data_filtered2)
  var data_sorted2 = sort_by_freq(data_by_engage2)
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


  const legend_data = [{name: "1-3/week"}, {name: "1-2/month"}, {name: "3-6/year"}, {name: "1-2/year"}, {name: "Never"}]

  return (

    <>
      <div id='vis-question-label'>
        <h2>How often do you engage with the UCCE in the following ways?</h2>
      </div>
      <div className="inline-child">
        <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
      </div>
      <div className='dual-display'>
        <GetChart legend_data={legend_data} dataset_final={dataset_final} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText}/>
        <GetChart legend_data={legend_data} dataset_final={dataset_final2} fontSize={fontSize} margin={margin} width={width} height={height} colorScale={colorScale} titleText={titleText2}/>
      </div>
    </>
  );
}