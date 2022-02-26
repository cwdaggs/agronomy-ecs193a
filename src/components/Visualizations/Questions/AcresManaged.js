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
          <VictoryChart //height={300} width={500}
            domainPadding={10}
            padding={{left: 100, bottom: 50, top: 30, right: 100}}
            animate={{duration: 800}}
          >
            <VictoryLabel text={"Acres vs Number of Farms (n = " + data.length + ")"} x={130} y={20}/>
            <VictoryAxis
              label="Farm Size in Acres"
              padding={{ top: 40, bottom: 60 }}
            />
            <VictoryAxis dependentAxis/>
            <VictoryBar

              data={acre_data}
              alignment="middle"
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
          </VictoryChart>
          
        </div>
      );
}