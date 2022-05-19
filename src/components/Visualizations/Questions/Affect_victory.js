import { VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryZoomContainer } from 'victory';
import {filterByCropOrRegion, parseURLCompare, parseURL, sort_by_freq} from '../UseData.js'
import {useState} from 'react';
import { VocationAndRegion, VocationAndRegionCompare } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";
import { useLocation } from 'react-router-dom';
import "./Legends.css";

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

// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.Affect, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Affect };
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
          height={props.height} 
          width={props.width}
          domainPadding={{ x: props.margin.right/5, y: props.margin.top/10 }}
          padding={{ top: (props.width>=props.mobileWidth)?props.margin.top:props.margin.top*2, bottom: props.margin.bottom, left: props.margin.left/1.5, right: (props.width>=props.mobileWidth)?props.margin.right:props.margin.right/2 }}   
          
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
            />
          }
        >
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 0.2}
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
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
          // label="Priority"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: props.fontSize, padding: 0, fontFamily: 'Roboto'},
                // axisLabel: {fontSize: 30, padding: 410}
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

export function AffectVictory(props) {
  const vocationArray = ["Growers", "Consultants"];
  const baseURL = "/results/Priority%20Effect";
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

  
  var data_filtered = filterByCropOrRegion(props.dataset, activeRegionOrCrop)

  var data_by_affect = calculateGrowerAffectTotalsForEachElement(data_filtered);
  var questionText = "How often do the following priorities affect your management decisions for field crop production?";
  var titleText = "Frequency of Effect on Management Decisions";
  if (activeVocation === "Consultants") {
    data_by_affect = calculateConsultantAffectTotalsForEachElement(data_filtered);
    questionText = "How often do the following priorities affect your recommendations for field crop production?";
    titleText = "Frequency of Effect on Recommendations";
  }

  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for " + activeRegionOrCrop;
  } else if (activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data_sorted = sort_by_freq(data_by_affect)
  const dataset_final = transformData(data_sorted)

  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";
  
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const height = vw*0.5;
  const width = vw;
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };

  var fontSize = 16
  var mobileFontSize = 6
  const mobileWidth = 1000;
  const laptopWidth = 1500;
  if(width < laptopWidth){
    fontSize = mobileFontSize*2
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
  const legend_data = [{name: "Always"}, {name: "Often"}, {name: "Sometimes"}, {name: "Rarely"}, {name: "Never"}]

  return (
    <>
    <div id='vis-question-label'>
       <h2>{questionText}</h2>
    </div>
    <div className="inline-child">
      <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
    </div>
    <>
      <GetChart titleText={titleText} dataset_final={dataset_final} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin}></GetChart>
    </>
    </>
  );
}

export function AffectVictoryCompare(props) {
  const vocationArray = ["Growers", "Consultants"];
  const baseURL = "/results/compare/Priority%20Effect";
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

  

  var data_filtered = filterByCropOrRegion(props.dataset, activeRegionOrCrop)

  var data_by_affect = calculateGrowerAffectTotalsForEachElement(data_filtered);
  var questionText = "How often do the following priorities affect your management decisions for field crop production?";
  var titleText = "Frequency of Effect on Management Decisions";
  var titleText2 = "Frequency of Effect on Management Decisions";
  if (activeVocation === "Consultants") {
    data_by_affect = calculateConsultantAffectTotalsForEachElement(data_filtered);
    questionText = "How often do the following priorities affect your recommendations for field crop production?";
    titleText = "Frequency of Effect on Recommendations";
  }

  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for " + activeRegionOrCrop;
  } else if (activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data_sorted = sort_by_freq(data_by_affect)
  const dataset_final = transformData(data_sorted)

  titleText += " (n = " + calculateAverageResponses(data_sorted) + ")";

  var data_filtered2 = filterByCropOrRegion(props.dataset, activeRegionOrCrop2)

  var data_by_affect2 = calculateGrowerAffectTotalsForEachElement(data_filtered2);

  if (crops.includes(activeRegionOrCrop2)) {
    titleText2 += " for " + activeRegionOrCrop2;
  } else if (activeRegionOrCrop2 !== "All") {
    titleText2 += " in the " + activeRegionOrCrop2 + " Region";
  }

  var data_sorted2 = sort_by_freq(data_by_affect2)
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
  const legend_data = [{name: "Always"}, {name: "Often"}, {name: "Sometimes"}, {name: "Rarely"}, {name: "Never"}]

  return (
    <>
    <div id='vis-question-label'>
       <h2>{questionText}</h2>
    </div>
    <div className="inline-child">
      <VocationAndRegionCompare vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationFunction2={vocationFunction2} regionOrCropFunction2={regionOrCropFunction2} activeVocation2={activeVocation2} activeRegionOrCrop2={activeRegionOrCrop2} vocationArray={vocationArray} baseAll={filters.baseAll}/>
    </div>
    <div className='dual-display'>
      <GetChart titleText={titleText} dataset_final={dataset_final} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin} compare={true}/>
      <GetChart titleText={titleText2} dataset_final={dataset_final2} width={width} height={height} fontSize={fontSize} mobileWidth={mobileWidth} colorScale={colorScale} legend_data={legend_data} margin={margin} compare={true}/>
    </div>
    </>
  );
}