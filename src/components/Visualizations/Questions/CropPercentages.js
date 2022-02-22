
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {calculateCropPercentageAverage} from '../UseData.js';
import "typeface-abeezee";

export function CropPercentages(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    const data = calculateCropPercentageAverage(props.dataset)
    var legend_data = []
    for (var i = 0; i < data.length; i++) {
        legend_data.push({name: data[i].x})
    }

    return (
        <div>
            <h2>Of the total acres, what percentage are in the following categories? (Field Crops, Vegetable Crops, Tree and Vine Crops, or Other)</h2>
            <svg width={1920} height={800}>       
                <VictoryLegend
                    standalone={false}
                    colorScale="heatmap"
                    x={950}
                    y={200}
                    gutter={20}
                    style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                            title:  {fontFamily: 'ABeeZee', fontSize: 23},
                            data:   {stroke: "black", strokeWidth: 1}}}
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
                    colorScale="heatmap"
                    data={data}
                    // labels={() => null}
                    labels={({ datum }) => `${datum.y.toFixed() + "%"}`}
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