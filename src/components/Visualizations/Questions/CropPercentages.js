import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {calculateCropPercentageAverage} from '../UseData.js';
import "typeface-abeezee";
import "@fontsource/metropolis";

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
        <div  class='visualization-window'>
            <div class='parent flex-parent'>
                <div class='child flex-child'>
                    <VictoryLegend
                        colorScale="heatmap"
                        x={150}
                        y={70}  
                        gutter={20}
                        style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 13}, 
                                title:  {fontFamily: 'ABeeZee', fontSize: 13},
                                data:   {stroke: "black", strokeWidth: 1}}}
                        title="Crop Categories"
                        centerTitle
                        data={legend_data}
                />
                </div>
                <div class='child flex-child'>   
                    
                    <VictoryPie
                        animate={{
                            duration: 500,               
                        }}
                        
                        width={600}
                        height={400}
                        padding={{
                            left: 0,
                            right: 320,
                            bottom: 80,
                            top: 50
                        }}
                        style={{ data: { stroke: "black", strokeWidth: 1}}}
                        colorScale="heatmap"
                        data={data}
                        // labels={() => null}
                        labels={({ datum }) => `${datum.y.toFixed() + "%"}`}
                        labelComponent={<VictoryTooltip 
                            style={{
                            fontSize:20,
                            fontFamily: 'Metropolis'
                            }}
                            flyoutHeight={25}
                            flyoutWidth={45}    
                        />}
                    />
                </div>

            </div>
        </div>
    );
}