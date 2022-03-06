import { VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCropOrRegion, sort_by_freq} from '../UseData.js'
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
      return { x: datum.Affect + " (n=" + totals[i] + ")", y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Affect };
    });
  });
}

export function AffectVictory(props) {
  
  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }

  var data_filtered = filterByCropOrRegion(props.dataset, props.filter)

  var data_by_affect = calculateGrowerAffectTotalsForEachElement(data_filtered);
  // var heading = (<h2>How often do the following priorities affect your management decisions for field crop production?</h2>)
  if (props.vocationFilter === "Consultants") {
    // heading = (<h2>How often do the following priorities affect your recommendations for field crop production?</h2>)
    data_by_affect = calculateConsultantAffectTotalsForEachElement(data_filtered);
  }
  var data_sorted = sort_by_freq(data_by_affect)
  const dataset_final = transformData(data_sorted)
  const width = 1920;
  const height = 1080;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };
  const colorScale = ["#245f81", "#8f97c5", "#f8d3ff", "#ef88b7", "#d43d51"];
  const fontSize = 20
  const legend_data = [{name: "Always"}, {name: "Often"}, {name: "Sometimes"}, {name: "Rarely"}, {name: "Never"}]

  return (
    <div class='visualization-window'>
      {/* <button onClick={function () {setJob("Growers")}}>Growers</button>
      <button onClick={function () {setJob("Consultants")}}>Consultants</button>
      <p><b >{job}</b> Data: </p> */}
      {/* {heading} */}
      {/* <h3>Red=Always, Orange=Often, Yellow=Sometimes, Green=Rarely, Blue=Never</h3> */}
      <VictoryChart
        horizontal={true}
        animate={{
            duration: 1000,               
        }}
        height={height} 
        width={width}
        domainPadding={{ x: margin.right/10, y: margin.top/10 }}
        padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}   
      >
        <VictoryLegend 
              x={width/2 - 300}
              y={15}
              title="Frequency of Effect on Managements/Recommendations"
              centerTitle
              orientation="horizontal"
              colorScale={colorScale}
              itemsPerRow={5}
              gutter={20}
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
  );
}