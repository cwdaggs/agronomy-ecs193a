import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {calculateCropPercentageAverage} from '../UseData.js';

var colors = 
[
"#002360",
"#006083",
"#008694",
"#00A4A8",
]

function GetChart(props){
    return(
        <div class="pie-chart">
            <div class='parent flex-parent'>
                <div class='child flex-child'>
                    <VictoryLegend
                        colorScale={props.colors}
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
                            
                            width={props.width}
                            height={props.height/2}
                            padding={{
                                left: props.margin.left,
                                right: props.margin.right,
                                bottom: props.margin.bottom,
                                top: props.margin.top
                            }}
                            style={{ data: { stroke: "black", strokeWidth: 1}}}
                            colorScale={props.colors}
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

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vw;
    const width = vw;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

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
                <GetChart data={data} legend_data={legend_data} width={width} height={height} margin={margin} fontSize={fontSize} colors={colors}/>
            </div>
        </>
    );
}

