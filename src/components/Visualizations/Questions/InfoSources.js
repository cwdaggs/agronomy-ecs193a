import {useState} from 'react';

import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';

import {filterByCrop, calculateInformationSources, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

export function InfoSourcesBarChart(props) {
    const [job, setJob] = useState("");

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    if (job === "Allied Industry" || job === "Other") {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, job);
    var info_data = calculateInformationSources(filtered_data);

    const fontSize = 5;

    return (
        <div>
          <button onClick={function () {setJob("")}}>All</button>
          <button onClick={function () {setJob("Grower")}}>Growers</button>
          <button onClick={function () {setJob("Consultant")}}>Consultants</button>
          <button onClick={function () {setJob("Allied Industry")}}>Allied Industry</button>
          <button onClick={function () {setJob("Other")}}>Other</button>
          <p><b >{job}</b> Data: </p>
          <h2>Who do you communicate with when seeking information about field crop production?</h2>
          <VictoryChart height={300} width={600}
            animate={{
              duration: 500,               
            }}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
          >

            <VictoryLabel text="Information Sources vs Number of Responses" x={170} y={20}/>

            <VictoryBar horizontal
              data={info_data}
              style={{ data:  { fill: ({datum}) => datum.fill}}}
            />
            <VictoryAxis dependentAxis
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