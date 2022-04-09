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
  const height = vh*0.9;
  const width = vw;
  const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
  const colorScale = ["#003f5c",
    "#bc5090",
    "#ffa600"];
  const fontSize = 20
  const legend_data = [{name: "Very Valuable"}, {name: "Somewhat Valuable"}, {name: "Not Valuable"}]

  return (
    <>
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
        padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}   
      >
         <VictoryLegend 
              x={width/2 - 300}
              y={15}
              title={titleText}
              centerTitle
              orientation="horizontal"
              colorScale={colorScale}
              itemsPerRow={5}
              gutter={30}
              style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: 20}, 
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
        label="Fields of Interest"
          style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0},
              axisLabel: {fontSize: 30, padding: 340}
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