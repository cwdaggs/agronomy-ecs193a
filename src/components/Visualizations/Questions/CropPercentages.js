import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {calculateCropPercentageAverage} from '../UseData.js';

const colors = 
[
"#002360",
"#006083",
"#008694",
"#00A4A8",
]

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = vw;
const width = vw;
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

function GetChart(props){
    return(
        <div class="pie-chart">
            <div class='parent flex-parent'>
                <div class='child flex-child'>
                    <VictoryLegend
                        colorScale={colors}
                        x={150}
                        y={0}  
                        gutter={20}
                        style={{labels: {fill: "black", color: "white", fontFamily: 'Roboto', fontSize: props.fontSize}, 
                            title:  {fontFamily: 'Roboto', fontSize: props.fontSize},
                            data:   {stroke: "black", strokeWidth: 1}}
                        }
                        title="Crop Categories"
                        centerTitle
                        data={props.legend_data}
                    />
                    </div>
                    <div class='child flex-child'>   
                        
                        <VictoryPie
                            animate={{
                                duration: 500,               
                            }}
                            
                            width={width}
                            height={height/2}
                            padding={{
                                left: margin.left,
                                right: margin.right,
                                bottom: margin.bottom,
                                top: margin.top
                            }}
                            style={{ data: { stroke: "black", strokeWidth: 1}}}
                            colorScale={colors}
                            data={props.data}
                            labels={({ datum }) => `${datum.x}: ${datum.y.toFixed() + "%"}`}
                            labelComponent={
                            <VictoryTooltip 
                                style={{
                                    fontSize:45,
                                    fontFamily: 'Roboto'
                                }}
                                constrainToVisibleArea={'true'}   
                            />
                        }
                        />
                    </div>
                </div>
            </div>
    )
}

export function CropPercentages(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    const data = calculateCropPercentageAverage(props.dataset)
    var legend_data = []

    var fontSize = 20;
    for (var i = 0; i < data.length; i++) {
        legend_data.push({name: data[i].x})
    }

    return (
        <>
            <div id='vis-question-label'>
                <h2>Of the total acres, what percentage of the crops grown are in each of the following categories?</h2>
            </div>
            <div  class='visualization-window'>
                <GetChart data={data} legend_data={legend_data} fontSize={fontSize}/>
            </div>
        </>
    );
}