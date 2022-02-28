import { Background, VictoryTheme, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCrop} from '../UseData.js'
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

  var data_filtered = filterByCrop(props.dataset, props.filter)

  var data_by_affect = calculateGrowerAffectTotalsForEachElement(data_filtered);
  // var heading = (<h2>How often do the following priorities affect your management decisions for field crop production?</h2>)
  if (props.vocationFilter === "Consultants") {
    // heading = (<h2>How often do the following priorities affect your recommendations for field crop production?</h2>)
    data_by_affect = calculateConsultantAffectTotalsForEachElement(data_filtered);
  }
  const dataset_final = transformData(data_by_affect)

  const width = 250;
  const height = 100;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };

  const fontSize = 2

  return (
    <div>
      {/* <button onClick={function () {setJob("Growers")}}>Growers</button>
      <button onClick={function () {setJob("Consultants")}}>Consultants</button>
      <p><b >{job}</b> Data: </p> */}
      {/* {heading} */}
      <h3>Red=Always, Orange=Often, Yellow=Sometimes, Green=Rarely, Blue=Never</h3>
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
        <VictoryStack
          style={{
              data: { stroke: "black", strokeWidth: 0.2}
          }}
          colorScale={["#ff0000", "#ffa500","#ffff00", "#008000", "#0000ff"]}
        >
          {dataset_final.map((data, i) => {
            return <VictoryBar 
              data={data} 
              key={i} 
              labels={({datum}) => datum.concern + ": " + Math.round(datum.y) + "%"}
              labelComponent={
                  <VictoryTooltip 
                    style={{
                      fontSize:fontSize
                    }}
                    flyoutHeight={15}
                    flyoutWidth={30}    
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
          style={{
              axis: {stroke: "#756f6a"},
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: fontSize, padding: 0}
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