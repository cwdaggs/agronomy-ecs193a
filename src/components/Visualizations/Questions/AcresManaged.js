import {VictoryLabel, VictoryChart, VictoryBar} from 'victory';
import {filterByCrop, calculateAcres} from '../UseData.js';
import "typeface-abeezee";

export function AcresManagedBarChart(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    var acre_data = calculateAcres(data);

    return (
        <div>
          <h2>How many acres do you manage/consult annually?</h2>
          <VictoryChart height={300} width={600}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
          >
            <VictoryLabel text="Acres vs Number of Responses" x={225} y={20} textAnchor="right"/>
            <VictoryBar horizontal
              data={acre_data}
              style={{ data:  { fill: ({datum}) => datum.fill}}}
            />
          </VictoryChart>
        </div>
      );
}