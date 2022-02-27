import {filterByCrop} from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {useState} from 'react';
import "typeface-abeezee";

function calculateAllPriorityConcerns(data, filter, job) {
    var columns = ["Alfalfa" + job + "Concerns",	"Cotton" + job + "Concerns",	"Rice" + job + "Concerns",	"Wild_Rice" + job + "Concerns",	"Wheat" + job + "Concerns",	"Triticale" + job + "Concerns",	
                 "Barley" + job + "Concerns",	"Oats" + job + "Concerns",	"Corn" + job + "Concerns",	"Sorghum" + job + "Concerns",	"Corn_Silage" + job + "Concerns", "Small_Grain_Silage" + job + "Concerns",
                 "Small_Grain_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Hay" + job + "Concerns",	"Grass_and_Grass_Mixtures_Pasture" + job + "Concerns",	"Sorghum_Sudangrass_Sudan" + job + "Concerns",	
                 "Mixed_Hay" + job + "Concerns", "Dry_Beans" + job + "Concerns",	"Sunflower" + job + "Concerns",	"Oilseeds" + job + "Concerns", "Sugar_Beets" + job + "Concerns", "Hemp" + job + "Concerns", "Other" + job + "Concerns"]
 
   const myMap = new Map()
   if (filter === "All" || filter === "") {
     var new_modified_data = []
     for (var col in columns) {
       var modified_data = calculatePriorityConcerns(data, columns[col])
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
     var new_filter = filter.split(' ').join('_') + job + "Concerns"
     return calculatePriorityConcerns(data, new_filter)
   }
 }
 
function calculatePriorityConcerns(data, filter) { //labelled under concerns right before growing reasons, the q is about challenges
   var modified_data = []
   const myMap = new Map()
   for (var farmer in data) {
     const reasons = String(data[farmer][filter]).split(',')
     for (var reason in reasons) {
       var key = reasons[reason]
       if (key !== "NA" && key !== "undefined") {
         myMap.has(key) ? myMap.set(key, myMap.get(key) + 1) : myMap.set(key, 1)
       }
     }
   }
 
   for (const [key, value] of myMap) {
     modified_data.push({x: key, y: value});
   }
   return modified_data
 }

export function PriorityConcerns({myDataset, filter}) {
    const [job, setJob] = useState("_Growing_");
    if (!myDataset) {
        return <pre>Loading...</pre>;
    }
    
    var data_filtered = filterByCrop(myDataset, filter)
    var data_by_reason = calculateAllPriorityConcerns(data_filtered, filter, job)
    console.log(data_by_reason)
    var legend_data = []
    for (var i = 0; i < data_by_reason.length; i++) {
        legend_data.push({name: data_by_reason[i].x})
    }
    const colorScale = ["#552E3A", "#713E4C", "#8D505C", "#A7626C", "#C2747B", "#DB878A", "#E0979E", "#E5A6B1", "#EAB6C3", "#F4D6E1"]

    return (
        <div>
            <h2>What are the highest priority management challenges/concerns?</h2>
            <button onClick={function () {setJob("_Growing_")}}>Growers</button>
            <button onClick={function () {setJob("_Consulting_")}}>Consultants</button>
            <svg width={1920} height={900}>
                <VictoryLegend
                    standalone={false}
                    colorScale={colorScale}
                    x={1000}
                    y={150}
                    gutter={20}
                    style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                            title:  {fontFamily: 'ABeeZee', fontSize: 23},
                            data:   {stroke: "black", strokeWidth: 1}}}
                    title="Legend"
                    centerTitle
                    data={legend_data}
                />
                <VictoryPie
                    animate={{
                        duration: 500,               
                    }}
                    standalone={false}
                    width={800}
                    height={800}
                    padding={{
                        left: 250,
                        bottom: 20,
                        top: 20
                    }}
                    style={{ data: { stroke: "black", strokeWidth: 1}}}
                    colorScale={colorScale}
                    data={data_by_reason}
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
            </svg>
        </div>
    );
}