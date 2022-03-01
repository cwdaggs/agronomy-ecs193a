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

        <div class='parent flex-parent'>
            <div class='child flex-child'>
                <VictoryLegend
                    colorScale="heatmap"
                    
                    gutter={20}
                    style={{labels: {fill: "black", color: "white", fontFamily: 'sans-serif', fontSize: 23}, 
                            title:  {fontFamily: 'sans-serif', fontSize: 23},
                            data:   {stroke: "black", strokeWidth: 1}}}
                    title="Legend"
                    centerTitle
                    data={legend_data}
            />
            </div>
            <div class='child flex-child'>   
                
                <VictoryPie
                    animate={{
                        duration: 500,               
                    }}
                    
                    width={400}
                    height={400}
                    padding={{
                        left: 0,
                        bottom: 50,
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
                        fontFamily: 'ABeeZee'
                        }}
                        flyoutHeight={25}
                        flyoutWidth={45}    
                    />}
                />
            </div>

        </div>
    );
}