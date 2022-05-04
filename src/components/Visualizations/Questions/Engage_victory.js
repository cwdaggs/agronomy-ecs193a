import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCropOrRegion, filterByVocation, sort_by_freq} from '../UseData.js'
import "typeface-abeezee";
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
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
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
  //const colorScale = ["#19bbb0", "#68caa5", "#9dd79f", "#bee37b", "#f4e651"];
  // var colorScale = [
  //   "#35381D",
  //   "#4F6536",
  //   "#5B9151",
  //   "#90A770",
  //   "#BDBD90",
  // ];
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
  const mobileWidth = 1000;
  const mobileFontSize = 6
  var fontSize = 20

  if(width < mobileWidth){
    fontSize = mobileFontSize;
  }

  const legend_data = [{name: "1-3/week"}, {name: "1-2/month"}, {name: "3-6/year"}, {name: "1-2/year"}, {name: "Never"}]

  return (

    <>
      <div id='vis-question-label'>
        <h3>How often do you engage with the UCCE in the following ways?</h3>
      </div>
      <div className="inline-child">
            <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray} baseAll={filters.baseAll}/>
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
          padding={{ top: (width>=mobileWidth)?margin.top:margin.top*2, bottom: margin.bottom, left: margin.left/1.5, right: (width>=mobileWidth)?margin.right:margin.right/2 }}   
        >
          <VictoryLegend 
                x={(width>=mobileWidth) ? (width/2 - margin.right): width/4}
                y={(width>=mobileWidth) ? (0):15}
                title={titleText}
                centerTitle
                orientation="horizontal"
                colorScale={colorScale}
                itemsPerRow={5}
                gutter={25}
                style={{labels: {fill: "black", fontFamily: 'Roboto', fontSize: fontSize}, 
                        
                        // border: { stroke: "black" }, 
                        title: {fontSize: fontSize + 4, fontFamily: 'Roboto'}, 
                        data: {fontSize: fontSize, stroke: "black", strokeWidth: 1, fontFamily: 'Roboto'}}}
                data={legend_data}
              />
          <VictoryStack
            style={{
                data: { stroke: "black", strokeWidth: 0.2, fontFamily: 'Roboto'}
            }}
            colorScale={colorScale}
          >
            {dataset_final.map((data, i) => {
              return <VictoryBar 
                data={data} 
                key={i} 
                labels={({datum}) =>  Math.round(datum.y) + "%"}
                labelComponent={
                    <VictoryTooltip 
                      style={{
                        fontSize:fontSize, fontFamily: 'Roboto'
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
                tickLabels: {fontSize: fontSize, padding: 5, fontFamily: 'Roboto'}
              }}
          />
          <VictoryAxis
            // label="Type of Engagement"
            style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0, fontFamily: 'Roboto'},
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
    </>
  );
}