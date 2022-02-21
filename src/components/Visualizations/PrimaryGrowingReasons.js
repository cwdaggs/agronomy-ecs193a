import { calculatePrimaryGrowingReasons, filterByCrop } from "./UseData.js";
import {VictoryPie, VictoryTooltip} from 'victory';
import "typeface-abeezee";


export function PrimaryGrowingReasons({myDataset, filter}) {
    if (!myDataset) {
        return <pre>Loading...</pre>;
    }

    var data_filtered = filterByCrop(myDataset, filter)
    var data_by_reason = calculatePrimaryGrowingReasons(data_filtered, filter)

    return (
        <VictoryPie
            style={{ labels: { fill: "black", color: "white", fontSize: 5, fontFamily: 'ABeeZee'}}}
            colorScale="heatmap"
            height={210}
            labels={({ datum }) => `${datum.y}`}
            data={data_by_reason}
        />
    );
}