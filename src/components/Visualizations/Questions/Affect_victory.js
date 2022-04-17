import { VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCropOrRegion, sort_by_freq} from '../UseData.js'
import {useState} from 'react';
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";

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

export function AffectVictory(props) {
  
  const [activeVocation, setActiveVocation] = useState("Growers");
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

  const vocationArray = ["Growers", "Consultants"];

  var data_filtered = filterByCropOrRegion(props.dataset, activeRegionOrCrop)

  var data_by_affect = calculateGrowerAffectTotalsForEachElement(data_filtered);
  var titleText = "Frequency of Effect on Management Decisions";
  if (activeVocation === "Consultants") {
    data_by_affect = calculateConsultantAffectTotalsForEachElement(data_filtered);
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

  const mobileWidth = 1000;
  const mobileFontSize = 6
  var fontSize = 20

  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }

  const colorScale = ["#245f81", "#8f97c5", "#f8d3ff", "#ef88b7", "#d43d51"];
  const legend_data = [{name: "Always"}, {name: "Often"}, {name: "Sometimes"}, {name: "Rarely"}, {name: "Never"}]

  return (
    <>
    <div id='vis-question-label'>
          <h3>How often do the following priorities affect your recommendations/management decisions for field crop production?</h3>
      </div>
    <div className="inline-child">
      <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
    </div>

    <div class='visualization-window'>
      <VictoryChart
        horizontal={true}
        animate={{
            duration: 1000,               
        }}
        height={height} 
        width={width}
        domainPadding={{ x: margin.right/10, y: margin.top/10 }}
        padding={{ top: (width>=mobileWidth)?margin.top:margin.top*2, bottom: margin.bottom, left: margin.left, right: (width>=mobileWidth)?margin.right:margin.right/2 }}   
      >
        <VictoryLegend 
              x={(width>=mobileWidth) ? (width/2 - margin.right): width/4}
              y={(width>=mobileWidth) ? (0):15}
              width={width-margin.left-margin.right}
              title={titleText}
              centerTitle
              orientation="horizontal"
              colorScale={colorScale}
              borderPadding = {{right: height/100}}
              itemsPerRow={5}
              gutter={20}
              style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: fontSize}, 
                      // border: { stroke: "black" }, 
                      title: {fontSize: fontSize }, 
                      data: {fontSize: fontSize, stroke: "black", strokeWidth: 1}}}
              data={legend_data}
            />
        <VictoryStack
          style={{
              data: { stroke: "black", strokeWidth: 0.2}
          }}
          colorScale={colorScale}
        >
          {dataset_final.map((data, i) => {
            return <VictoryBar 
              data={data} 
              key={i} 
              labels={({datum}) => Math.round(datum.y) + "%"}
              labelComponent={
                  <VictoryTooltip 
                    style={{
                      fontSize:fontSize
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
              tickLabels: {fontSize: fontSize, padding: 5}
            }}
        />
        <VictoryAxis
        // label="Priority"
          style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0},
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
    </>
  );
}