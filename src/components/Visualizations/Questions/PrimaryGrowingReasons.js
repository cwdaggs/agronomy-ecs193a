import {filterByCropOrRegion, filterByVocation} from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import "typeface-abeezee";

export function calculateAllPrimaryGrowingReasons(data, filter) {
    var columns = ["Alfalfa_Growing_Reasons", "Cotton_Growing_Reasons", "Rice_Growing_Reasons", "Wild_Rice_Growing_Reasons", "Wheat_Growing_Reasons", "Triticale_Growing_Reasons",	
                  "Barley_Growing_Reasons",	"Oats_Growing_Reasons",	"Corn_Growing_Reasons",	"Sorghum_Growing_Reasons",	"Corn_Silage_Growing_Reasons", "Small_Grain_Silage_Growing_Reasons",
                  "Small_Grain_Hay_Growing_Reasons", "Grass_and_Grass_Mixtures_Hay_Growing_Reasons",	"Grass_and_Grass_Mixtures_Pasture_Growing_Reasons",	"Sorghum_Sudangrass_Sudan_Growing_Reasons",	
                  "Mixed_Hay_Growing_Reasons", "Dry_Beans_Growing_Reasons",	"Sunflower_Growing_Reasons", "Oilseeds_Growing_Reasons", "Sugar_Beets_Growing_Reasons", "Hemp_Growing_Reasons", "Other_Growing_Reasons"]
  
    const myMap = new Map()
    if (filter === "All" || filter === "") {
      var new_modified_data = []
      for (var col in columns) {
        var modified_data = calculatePrimaryGrowingReasons(data, columns[col])
        for (var item in modified_data) {
          let key_data = modified_data[item].x
          let value_data = modified_data[item].y
          if (key_data !== "NA") {
            myMap.has(key_data) ? myMap.set(key_data, myMap.get(key_data) + value_data) : myMap.set(key_data, value_data)
          }
        }
      }
      
      for (const [key, value] of myMap) {
        new_modified_data.push({x: key, y: value});
      }
      return new_modified_data
    } else {
      var new_filter = filter.split(' ').join('_') + "_Growing_Reasons"
      return calculatePrimaryGrowingReasons(data, new_filter)
    }
  }
  
  export function calculatePrimaryGrowingReasons(data, filter) {
    var modified_data = []
    const myMap = new Map()
    for (var farmer in data) {
      const reasons = String(data[farmer][filter]).split(',')
      for (var reason in reasons) {
        var key = reasons[reason]
        if (key === " water" || key === " land" || key === " capital" || key === " know-how" || key === " etc.)" || key === "I am limited by farm resources to grow other crops (equipment") {
          key = "Limited by farm resources"
        }
        if (key !== "NA") {
          myMap.has(key) ? myMap.set(key, myMap.get(key) + 1) : myMap.set(key, 1)
        }
      }
    }
  
    for (const [key, value] of new Map([...myMap].sort())) {
      if (key === "Limited by farm resources") {
        modified_data.push({x: key, y: value/6});
      } else {
        modified_data.push({x: key, y: value});
      }
    }
  
    return modified_data
  }

export function PrimaryGrowingReasons({myDataset, filter}) {
    if (!myDataset) {
        return <pre>Loading...</pre>;
    }

    var data_filtered = filterByVocation(filterByCropOrRegion(myDataset, filter), "Growers")
    var data_by_reason = calculateAllPrimaryGrowingReasons(data_filtered, filter)
    var legend_data = []
    var n = 0
    for (var i = 0; i < data_by_reason.length; i++) {
        legend_data.push({name: data_by_reason[i].x})
        n += data_by_reason[i].y
    }
    // const colorScale = ["#0A2F51", "#0E4D64", "#137177", "#188977", "#1D9A6C", "#39A96B", "#56B870", "#74C67A", "#99D492", "#BFE1B0"]
    const colorScale = ["#00876c", "#4d9a70", "#7aac77", "#a2bd83", "#c9ce93", "#eee0a9", "#eac487", "#e7a66c", "#e38759", "#dd6551", "#d43d51"]
    return (
      <div class='visualization-window'>
          <div class='parent flex-parent'>
            <div class='child flex-child'>
                <VictoryLegend      
                  x={150}
                  y={0}     
                    colorScale={colorScale}
                    gutter={20}
                    style={{labels: {fill: "black", fontFamily: 'ABeeZee', fontSize: 12}, 
                            title:  {fontFamily: 'ABeeZee', fontSize: 12},
                            data:   {stroke: "black", strokeWidth: 1}}}
                    title={String("Reasons for Growing Crops (n=" + n + ")")}
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
                        right: 120,
                        bottom: 80,
                        top: 50
                    }}
                    // events={[{
                    //     target: "data",
                    //     eventHandlers: {
                    //       onMouseEnter: () => {
                    //         return [
                    //           {
                    //             target: "data",
                    //             mutation: ({ style }) => {
                    //               return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                    //             }
                    //           }, {
                    //             target: "labels",
                    //             mutation: ({ text }) => {
                    //               return text === "clicked" ? null : { text: "clicked" };
                    //             }
                    //           }
                    //         ];
                    //       }
                    //     }
                    //   }]}
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
            </div>
        </div>
      </div>
    );
}