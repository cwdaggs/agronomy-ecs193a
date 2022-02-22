import { calculatePrimaryGrowingReasons, filterByCrop } from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import "typeface-abeezee";

export function PrimaryGrowingReasons({myDataset, filter}) {
    if (!myDataset) {
        return <pre>Loading...</pre>;
    }

    var data_filtered = filterByCrop(myDataset, filter)
    var data_by_reason = calculatePrimaryGrowingReasons(data_filtered, filter)
    var legend_data = []
    for (var i = 0; i < data_by_reason.length; i++) {
        legend_data.push({name: data_by_reason[i].x})
    }
    const colorScale = ["#0A2F51", "#0E4D64", "#137177", "#188977", "#1D9A6C", "#39A96B", "#56B870", "#74C67A", "#99D492", "#BFE1B0"]

    return (
        <div>
            <h2>What are the primary reasons you grow the following field crops?</h2> 
        <svg width={2000} height={900}>
            <VictoryLegend
                standalone={false}
                colorScale={colorScale}
                x={1000}
                y={110}
                gutter={20}
                style={{ labels: { fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, title: {fontSize:23}}}
                title="Legend"
                centerTitle
                data={legend_data}
            />
            <VictoryPie
                standalone={false}
                width={800}
                height={800}
                padding={{
                    left: 250,
                    bottom: 20,
                    top: 20
                }}
                style={{ data: { stroke: "black", strokeWidth: 1}}}
                colorScale={colorScale}
                data={data_by_reason}
                // labels={() => null}
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryTooltip 
                    style={{
                      fontSize:20,
                      fontFamily: 'ABeeZee'
                    }}
                    flyoutHeight={25}
                    flyoutWidth={45}    
                  />}
            />
        </svg>
        </div>
    );
}