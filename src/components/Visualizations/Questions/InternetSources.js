import {useState} from 'react';
import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCrop, getInternetSources, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

export function InternetSourcesBarChart(props) {
    const [job, setJob] = useState("");

    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    if (job === "Allied Industry" || job === "Other") {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, job);
    var graph_data = getInternetSources(filtered_data);

    const fontSize = 5;

    return (
        <div>
          <button onClick={function () {setJob("")}}>All</button>
          <button onClick={function () {setJob("Grower")}}>Growers</button>
          <button onClick={function () {setJob("Consultant")}}>Consultants</button>
          <button onClick={function () {setJob("Allied Industry")}}>Allied Industry</button>
          <button onClick={function () {setJob("Other")}}>Other</button>
          <p><b >{job}</b> Data: </p>
          <h2>Where do you most often look for field crop production information on the internet?</h2>
          <VictoryChart height={300} width={600}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
          >
            <VictoryLabel text={"Internet Sources vs Number of Responses " + "(n = " + filtered_data.length + ")"} x={170} y={20} textAnchor="right"/>
            <VictoryBar horizontal
              data={graph_data}
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize
                  }}
                  flyoutHeight={15}
                  flyoutWidth={30}    
                />
            }
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