import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar} from 'victory';
import {filterByCrop, calculateAcresManagedOrConsulted, calculateAcres} from '../UseData.js';
import "typeface-abeezee";

export function AcresManagedBarChart(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    var acre_data = calculateAcres(data);
    console.log(acre_data);

    return (
        <div>
          <h2>How many acres do you manage/consult annually?</h2>
          <p>On the vertical axis is the size of a farm in acres. The horizontal axis shows the number of farms in each bin.</p>
          <VictoryChart height={300} width={600}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
            animate={{duration: 800}}
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