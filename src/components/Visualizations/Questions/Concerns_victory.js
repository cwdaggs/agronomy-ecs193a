
import { Background, VictoryTheme, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCrop, filterByVocation, useData} from '../UseData.js'
import "typeface-abeezee";
import React, { useState, useEffect } from "react";
    
// This is an example of a function you might use to transform your data to make 100% data
function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].Total;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: String(datum.Concern + " n = " + totals[i]), y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Concern };
    });
  });
}

export function ConcernsVictory({myDataset, filter}) {
  const [occupation, setOccupation] = useState("o");
  if ((!myDataset) || (!filter)) {
      return <pre>Loading...</pre>;
  }

  var data_filtered = filterByVocation(filterByCrop(myDataset, filter), occupation)
  var data_by_concern = calculateConcernTotalsForEachElement(data_filtered)
  var data_sorted = sort_by_very(data_by_concern)
  const dataset = transformData(data_sorted);
  const width = 250;
  const height = 100;
  const margin = { top: height/10, right: width/4, bottom: height/5, left: width/4 };

  const fontSize = 2

  return (
    <div>
      <h2>In regards to the production of FIELD CROPS in California, rate your concern for the following:</h2>
      
      <button onClick={function () {setOccupation("o")}}>All</button>
      <button onClick={function () {setOccupation("Grower")}}>Growers</button>
      <button onClick={function () {setOccupation("Consultant")}}>Consultants</button>
      
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
        <VictoryStack
          style={{
              data: { stroke: "black", strokeWidth: 0.2}
          }}
          colorScale={["#00471A", "#009141", "#02D46F"]}
        >
          {dataset.map((data, i) => {
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