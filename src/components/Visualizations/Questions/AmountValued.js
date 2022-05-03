import {VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, filterByCropOrRegion, filterByVocation} from '../UseData.js'
import {useState} from 'react';
import { VocationAndRegion } from "../Menus/VocationAndRegion.js";
import "typeface-abeezee";

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

  var titleText = "Level of Value";
  if (crops.includes(activeRegionOrCrop)) {
    titleText += " for " + activeRegionOrCrop;
  }
  if (activeVocation !== "All") {
    if (crops.includes(activeRegionOrCrop)) {
      titleText += " " + activeVocation;
    } else {
      titleText += " for " + activeVocation;
    }
  }
  if (!crops.includes(activeRegionOrCrop) && activeRegionOrCrop !== "All") {
    titleText += " in the " + activeRegionOrCrop + " Region";
  }

  var data_filtered = filterByVocation(filterByCropOrRegion(props.dataset, activeRegionOrCrop), activeVocation)
  var data_by_value = calculateValueTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_very(data_by_value)
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
      <h3>How much do you value the following:</h3>
    </div>
    <div className="inline-child">
      <VocationAndRegion vocationFunction={vocationFunction} regionOrCropFunction={regionOrCropFunction} activeVocation={activeVocation} activeRegionOrCrop={activeRegionOrCrop} vocationArray={vocationArray}/>
    </div>

    <div class='visualization-window'>
      
      <VictoryChart
        horizontal={true}
        animate={{
            duration: 500,               
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
              itemsPerRow={5}
              gutter={25}
              style={{labels: {fill: "black", fontFamily: 'Roboto', fontSize: fontSize}, 
                      // border: { stroke: "black" }, 
                      title: {fontSize: fontSize , fontFamily: 'Roboto'}, 
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
              labels={({datum}) => Math.round(datum.y) + "%"}
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
              axis: {stroke: "#756f6a", fontFamily: 'Roboto'},
              ticks: {stroke: "grey", size: 5, fontFamily: 'Roboto'},
              tickLabels: {fontSize: fontSize, padding: 5, fontFamily: 'Roboto'}
            }}
        />
        <VictoryAxis
        label="Fields of Interest"
          style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0, fontFamily: 'Roboto'},
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
    </>
  );
}