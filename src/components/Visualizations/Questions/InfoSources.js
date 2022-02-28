import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCrop, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

export function calculateInformationSources(data){
  var sources = [
    "Industry",
    "Other Growers",
    "UC Cooperative Extension",
    "Pesticide Control Advisor",
    "Certified Crop Advisor",
    "NRCS",
    "Input Supplier",
    "Family members",
    "Field crew",
    "County Agricultural Commissioner",
    "Environmental Groups",
    "Resource Conservation Districts",
    "State or County Farm Bureau",
    "Non-Profit Organization",
    "Commodity Boards",
    "Water Quality Coalition",
  ];

  var colors = [
    "#c9d2b7", "#b1b8a2", "#79917c", "#647766", "#343f36", "#212121", "#ff0000", "#ffa500",
    "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee", "#000000", "#808080", "#800080"
  ];

  var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var modified_data = [];

  for (var i = 0; i < data.length; i++) {
    var values = String(data[i]["Information_Sources"]).split(',');
    for (var v in values) {
      for (var j = 0; j < sources.length; j++) {
        if (values[v].includes(sources[j])) {
          totals[j]++;
        }
      }
    }
  }

  for(var k=0; k<totals.length; k++){
    modified_data.push({x: sources[k], y: totals[k], fill: colors[k]});
  }

  return modified_data;
}

export function InfoSourcesBarChart(props) {
    
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    if (props.vocationFilter === "Allied Industry" || props.vocationFilter === "Other") {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, props.vocationFilter);
    var info_data = calculateInformationSources(filtered_data);

    const fontSize = 5;

    return (
        <div>
          <h2>Who do you communicate with when seeking information about field crop production?</h2>
          <VictoryChart height={300} width={600}
            animate={{
              duration: 500,               
            }}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
          >

            <VictoryLabel text="Information Sources vs Number of Responses" x={170} y={20}/>

            <VictoryBar horizontal
              data={info_data}
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize
                  }}
                  flyoutHeight={15}
                  flyoutWidth={30}    
                />
            }
            />
            <VictoryAxis dependentAxis
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 5}
              }}
            />
            <VictoryAxis
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0}
              }}
            tickLabelComponent={       
              <VictoryLabel    
                textAnchor="end"
              />   
            }
            />
          </VictoryChart>
        </div>
      );
}