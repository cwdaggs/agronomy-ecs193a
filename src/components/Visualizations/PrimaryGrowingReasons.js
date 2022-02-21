import { calculatePrimaryGrowingReasons, filterByCrop } from "./UseData.js";
import {VictoryPie, VictoryTooltip} from 'victory';
import { VictoryTheme} from 'victory';

import "typeface-abeezee";
import { VictoryLegend } from "victory";
import { VictoryChart } from "victory";


export function PrimaryGrowingReasons({myDataset, filter}) {
    if (!myDataset) {
        return <pre>Loading...</pre>;
    }

    var data_filtered = filterByCrop(myDataset, filter)
    var data_by_reason = calculatePrimaryGrowingReasons(data_filtered, filter)

    return (
//         <div>
//             <VictoryLegend
//                 title="Legend"
//                 style={{ border: { stroke: "black" }, title: {fontSize: 3 }}}
//                 data={[
//                                { name: "One", symbol: { fill: "tomato", type: "star" }, labels:{fontSize: 3} },
//                                { name: "Two", symbol: { fill: "orange" }, labels:{fontSize: 3} },
//                                { name: "Three", symbol: { fill: "gold" }, labels:{fontSize: 3} }
//                            ]}
//             />
//             <VictoryPie
//                 style={{ labels: { fill: "black", color: "white", fontSize: 5, fontFamily: 'ABeeZee'}}}
//                 colorScale={["#0A2F51", "#0E4D64", "#137177", "#188977", "#1D9A6C", "#39A96B", "#56B870", "#74C67A", "#99D492", "#BFE1B0"]}
//                 height={210}
//                 labels={({ datum }) => `${datum.x}`}
//                 data={data_by_reason}
//             />
// </div>
    <svg width={2000} height={1200}>
        <VictoryLegend
          standalone={false}
          colorScale={["#0A2F51", "#0E4D64", "#137177", "#188977", "#1D9A6C", "#39A96B", "#56B870", "#74C67A", "#99D492", "#BFE1B0"]}
          x={1100}
          y={0}
          gutter={20}
          style={{ labels: { fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}}}
          title="Legend"
          centerTitle
          data={[
                { name: "One" },
                { name: "Two"},
                { name: "Three"}
                ]}
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
          style={{ labels: { fill: "black", color: "white", fontFamily: 'ABeeZee'}}}
          colorScale={["#0A2F51", "#0E4D64", "#137177", "#188977", "#1D9A6C", "#39A96B", "#56B870", "#74C67A", "#99D492", "#BFE1B0"]}
          data={data_by_reason}
          labels={({ datum }) => `${datum.x}`}
        />
      </svg>
    );
}