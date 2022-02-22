import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar} from 'victory';
import {filterByCrop, calculateAcresManagedOrConsulted, calculateAcres} from '../UseData.js';
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
          <VictoryChart //height={300} width={500}
            domainPadding={10}
            padding={{left: 100, bottom: 50, top: 30, right: 100}}
            animate={{duration: 800}}
          >
            <VictoryLabel text="Acres vs Number of Responses" x={250} y={20} textAnchor="middle"/>
            <VictoryAxis
              label="Acres"
              padding={{ top: 40, bottom: 60 }}
            />
            <VictoryAxis dependentAxis/>
            <VictoryBar
              data={acre_data}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
            />
          </VictoryChart>
          
        </div>
      );
}