import {filterByCrop} from "../UseData.js";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import {useState} from 'react';
import "typeface-abeezee";

function calculateAllPriorityConcerns(data, filter, job) {
    if(job == "Growers"){
        job = "_Growing_";
    } else{
        job = "_Consulting_";
    }
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

export function PriorityConcerns(props) {
    if (!props.myDataset) {
        return <pre>Loading...</pre>;
    }
    var data_filtered = filterByCrop(props.myDataset, props.filter)
    var data_by_reason = calculateAllPriorityConcerns(data_filtered, props.filter, props.vocationFilter)

    var legend_data = []
    for (var i = 0; i < data_by_reason.length; i++) {
        legend_data.push({name: data_by_reason[i].x})
    }
    const colorScale = ["#552E3A", "#713E4C", "#8D505C", "#A7626C", "#C2747B", "#DB878A", "#E0979E", "#E5A6B1", "#EAB6C3", "#F4D6E1"]

    return (
        <div>
            <h2>What are the highest priority management challenges/concerns?</h2>
            <div class='parent flex-parent'>
              <div class='child flex-child'>
                <VictoryLegend
                    colorScale={colorScale}
                    gutter={20}
                    style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                            title:  {fontFamily: 'ABeeZee', fontSize: 23},
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
            </div>
        </div>
      </div>
    );
}