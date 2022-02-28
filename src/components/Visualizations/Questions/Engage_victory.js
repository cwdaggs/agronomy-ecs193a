import { Background, VictoryTheme, VictoryLegend, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {filterByCrop, filterByVocation} from '../UseData.js'
import "typeface-abeezee";

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
      return { x: datum.Engage + " (n=" + totals[i] + ")", y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Engage };
    });
  });
}

export function EngageVictory(props) {
  
  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }

  var data = filterByCrop(props.dataset, props.filter);
  if (props.vocationFilter === "Allied Industry" || props.vocationFilter === "Other") {
    data = props.dataset;
  }
  var data_filtered = filterByVocation(data, props.vocationFilter)
  var data_by_engage = calculateEngageTotalsForEachElement(data_filtered)
  const dataset_final = transformData(data_by_engage)
  const width = 1920;
  const height = 1080;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };
  const colorScale = ["#ff0000", "#ffa500","#ffff00", "#008000", "#0000ff"];
  const fontSize = 20
  const legend_data = [{name: "1-3 times/week"}, {name: "1-2 times/month"}, {name: "3-6 times/year"}, {name: "1-2 times/year"}, {name: "Never"}]

  return (
    <div>
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
        <VictoryLegend x={width/2 - 480}
              title="Legend"
              centerTitle
              orientation="horizontal"
              colorScale={colorScale}
              itemsPerRow={5}
              // symbolSpacer={5}
              gutter={30}
              style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: 20}, 
                      border: { stroke: "black" }, 
                      title: {fontSize: fontSize }, 
                      data: {fontSize: fontSize, stroke: "black", strokeWidth: 1}}}
              data={legend_data}
            />
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
              labels={({datum}) =>  Math.round(datum.y) + "%"}
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