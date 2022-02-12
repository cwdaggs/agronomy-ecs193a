import {VictoryLabel, VictoryTooltip, VictoryLine, VictoryChart, VictoryScatter, VictoryTheme} from 'victory';
import { averageSatisfaction, filterByCrop, trendLineSatisfactions } from '../UseData';
import * as d3 from 'd3'
export function PrioritySatisfaction({dataset, filter}) {

    if (!dataset) {
        return <pre>Loading...</pre>;
    }
    console.log(dataset)
    var data_filtered = filterByCrop(dataset, filter)
    var data = averageSatisfaction(data_filtered)

    var domain = d3.extent(data, function(d) { return d.Priority; })
    var range = d3.extent(data, function(d) { return d.Satisfaction; })
    var domainPadding = 0.1

    var trendData = trendLineSatisfactions(data)
    return (
        <div>
            <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [domain[0] - domainPadding, domain[1] + domainPadding], y: [range[0] - domainPadding, range[1] + domainPadding] }}
            animate={{
                duration: 500,               
            }}
            >
            <VictoryLabel
                x={55}
                y={50}
                text="Satisfaction"
            />
            <VictoryLabel
                x={55}
                y={150}
                text="Priority"
            />
            <VictoryScatter
                x={(d) => d.Priority}
                y={(d) => d.Satisfaction}
                style={{ data: { fill: "#c43a31" } }}
                size={3}
                data={data}
                labels={({datum}) => datum.Topic + "\nSatisfaction Avg: " + String(datum.Satisfaction).substring(0, 3) + "\nPriority Avg: " + String(datum.Priority).substring(0,3)}
                labelComponent={
                    <VictoryTooltip 
                        style={{
                        fontSize:5
                        }}
                        flyoutHeight={20}
                        flyoutWidth={60}    
                    />
                }
                />
            <VictoryLine
                x={(d) => d.x}
                y={(d) => d.y}
                data={trendData}
            />
            </VictoryChart>
        </div>
    )};