import {VictoryPie, VictoryTooltip} from 'victory';
import {calculateCropPercentageAverage} from '../UseData.js';
import "typeface-abeezee";

export function CropPercentages(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    const data = calculateCropPercentageAverage(props.dataset)

    return (
        <VictoryPie
            style={{ labels: { fill: "black", color: "white", fontSize: 5, fontFamily: 'ABeeZee'}}}
            colorScale="heatmap"
            height={210}
            labels={({ datum }) => `${datum.x}`}
            data={data}
        />
    );
}