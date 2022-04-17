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

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh;
    const width = vw;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    var fontSize = 20;
    for (var i = 0; i < data.length; i++) {
        legend_data.push({name: data[i].x})
    }

    return (
        <>
        <div id='vis-question-label'>
            <h3>Of the total acres, what percentage of the crops grown are in each of the following categories?</h3>
        </div>
        <div  class='visualization-window'>
            <div class="pie-chart">
                <div class='parent flex-parent'>
                    <div class='child flex-child'>
                        <VictoryLegend
                            colorScale="heatmap"
                            x={150}
                            y={0}  
                            gutter={20}
                            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: fontSize}, 
                                    title:  {fontFamily: 'ABeeZee', fontSize: fontSize},
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
                            
                            width={width}
                            height={height}
                            padding={{
                                left: margin.left,
                                right: margin.right,
                                bottom: margin.bottom,
                                top: margin.top
                            }}
                            style={{ data: { stroke: "black", strokeWidth: 1}}}
                            colorScale="heatmap"
                            data={data}
                            // labels={() => null}
                            labels={({ datum }) => `${datum.y.toFixed() + "%"}`}
                            labelComponent={<VictoryTooltip 
                                style={{
                                    fontSize:35,
                                    fontFamily: 'ABeeZee'
                                }}
                                flyoutHeight={40}
                                flyoutWidth={80}      
                            />}
                        />
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}