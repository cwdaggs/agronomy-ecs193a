import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCrop, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

function getInternetSources(data){
  var sources = [
    "Internet (websites)",
    "Blogs",
    "Webinars",
    "Virtual Meetings",
    "Newsletters",
    "UC Cooperative Extension Magazine Articles",
    "Personal contact (phone, email, on-farm consultation)",
    "In-person meetings (Field Days, Grower Meetings)",
    "Books/manuals",
    "Radio/Podcast",
    "Social Media",
    "Fact Sheets",
    "Interactive Web Tools",
    "Demonstration Videos",
    "Two or three day destination meetings",
    "\"California Agriculture\" Journal"
  ];

  var colors = [
    "#212011",
    "#2C2D17",
    "#35381D",
    "#3D4323",
    "#444F2A",
    "#4A5A30",
    "#4F6536",
    "#53703D",
    "#577B44",
    "#59864A",
    "#5B9151",
    "#699759",
    "#769C60",
    "#83A268",
    "#90A770",
    "#9CAD78",
    "#A8B280",
    "#B2B888",
    "#BDBD90",
    "#C2BE98",
    "#C7BFA0",
  ];

  var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var modified_data = [];

  for (var i = 0; i < data.length; i++) {
    var values = String(data[i]["UCCE_Information_Preferred_Contact"]).split(',(?![+ ])');
    for (var j in values) {
      for (var k = 0; k < sources.length; k++) {
        if (values[j].includes(sources[k])) {
          totals[k]++;
        }
      }
    }
  }
  sources[5] = "UC Cooperative Extension\nMagazine Articles"
  sources[6] = "Personal contact\n(phone, email, on-farm consultation)";
  sources[7] = "In-person meetings\n(Field Days, Grower Meetings)";

  for(var l=0; l<totals.length; l++){
    modified_data.push({x: sources[l], y: totals[l], fill: colors[l]});
  }
  return modified_data;
}

export function InternetSourcesBarChart(props) {
    
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    var data = filterByCrop(props.dataset, props.filter);
    if (props.vocationFilter === "Allied Industry" || props.vocationFilter === "Other") {
      data = props.dataset;
    }
    var filtered_data = filterByVocation(data, props.vocationFilter);
    var graph_data = getInternetSources(filtered_data);

    const fontSize = 5;

    return (
        <div>
          <h2>Where do you most often look for field crop production information on the internet?</h2>
          <VictoryChart height={300} width={600}
            domainPadding={10}
            padding={{left: 100, bottom: 30, top: 30, right: 100}}
            animate={{duration: 800}}
          >
            <VictoryLabel text={"Internet Sources vs Number of Responses " + "(n = " + filtered_data.length + ")"} x={170} y={20}/>
            <VictoryBar horizontal
              data={graph_data}
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