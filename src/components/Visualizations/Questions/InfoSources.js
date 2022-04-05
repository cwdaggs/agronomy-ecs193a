import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
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
    "#021837", "#031544", "#051050", "#07085B", "#150A67", "#260D71", "#3A117C", 
    "#4F1586", "#65198F", "#682D99", "#6E40A2", "#7554AC", "#7E67B5", "#887BBF", 
    "#958EC8", "#A3A2D2", "#B5B8DB"
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
  modified_data.sort(function(a,b){return a.y - b.y;});
  return modified_data;
}

export function InfoSourcesBarChart(props) {
    
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }
    
    const crops = [ 
      "Alfalfa", 
      "Barley", 
      "Corn", 
      "Corn Silage", 
      "Cotton", 
      "Dry Beans", 
      "Rice", 
      "Small Grain Silage", 
      "Sunflower", 
      "Wheat"
    ];

    var centerTitle = 300;
    if (props.vocationFilter === "All" || props.filter === "All") {
      centerTitle = 200;
    }

    var titleText = "";
    if (props.vocationFilter !== "All") {
      titleText += "Vocation: " + props.vocationFilter;
    }
    if (crops.includes(props.filter)) {
      if (props.vocationFilter !== "Allied Industry" && props.vocationFilter !== "Other") {
        titleText += " Crop: " + props.filter;
      }
    }
    if (!crops.includes(props.filter) && props.filter !== "All") {
      titleText += " Region: " + props.filter;
    }

    var data = filterByCropOrRegion(props.dataset, props.filter);
    if ((props.vocationFilter === "Allied Industry" || props.vocationFilter === "Other") && crops.includes(props.filter)) {
      data = props.dataset;
      centerTitle = 200;
    }
    var filtered_data = filterByVocation(data, props.vocationFilter);
    var info_data = calculateInformationSources(filtered_data);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const height = vh*0.9;
    const width = vw;
    const margin = { top: height/8, right: width/8, bottom: height/4, left: width/4 };
    const fontSize = 20;

    return (
        <div class='visualization-window'>
          <VictoryChart height={height} width={width}
            animate={{
              duration: 500,               
            }}
            domainPadding={{ x: margin.right/10, y: margin.top/10 }}
            padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}   
          >

            <VictoryLabel text={titleText} 
              x={width/2 - centerTitle} 
              y={80}
              style ={{fontSize:fontSize +10}}/>

            <VictoryBar horizontal
              data={info_data}
              sortKey = "y"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:fontSize
                  }}
                  flyoutHeight={25}
                  flyoutWidth={40}    
                />
            }
            />
            <VictoryAxis dependentAxis
              label = {"Number of Responses " + "(n = " + filtered_data.length + ")"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 5},
                axisLabel: {fontSize: fontSize*2, padding: 50}
              }}
            />
            <VictoryAxis
              label = {"Information Sources"}
              style={{
                axis: {stroke: "#756f6a"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: {fontSize: fontSize, padding: 0},
                axisLabel: {fontSize: fontSize*2, padding: 350}
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