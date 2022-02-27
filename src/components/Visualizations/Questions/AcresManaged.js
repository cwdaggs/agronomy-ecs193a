import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCrop, calculateAcresManagedOrConsulted, calculateAcres} from '../UseData.js';
import "typeface-abeezee";

export function AcresManagedBarChart(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }
    //console.log(props.dataset)
    var data = filterByCrop(props.dataset, props.filter);
    var acre_data = calculateAcres(data);

    const fontSize = 5;

    return (
        <div>
          <h2>How many acres do you manage/consult annually?</h2>
          <VictoryChart height={800} width={1920}
            domainPadding={60}
            /*padding={{left: 100, bottom: 50, top: 30, right: 100}}*/
            animate={{duration: 800}}
          >
            <VictoryLabel text={"Acres vs Number of Farms (n = " + data.length + ")"} x={650} y={20}
            style={{
              fontSize: 45
            }}/>
            <VictoryAxis
              label="Farm Size in Acres"
              /*padding={{ top: 10, bottom: 10 }}*/
              style={{
                tickLabels: {fontSize: 30, padding: 5},
                axisLabel: {fontSize: 40, padding: {top: 0}}
              }}
            />
            <VictoryAxis dependentAxis/>
            <VictoryBar

              data={acre_data}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y + " Farms"}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:30
                  }}
                  flyoutHeight={45}
                  flyoutWidth={150}    
                />
            }
            />
          </VictoryChart>
          
        </div>
      );
}