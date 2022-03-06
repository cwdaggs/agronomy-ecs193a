import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

function calculateAcres(data){
  var names = ["< 500", "< 1000", "< 1500", "< 2000", "< 2500", "2500+"]
  var colors = ["#c9d2b7", "#b1b8a2", "#79917c", "#647766", "#343f36", "#212121"]
  var columns = ["Acres_Managed", "Acres_Consulted"]
  var modified_data=[]
  var bin_count = [0,0,0,0,0,0]

  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < columns.length; j++){
      var num = parseInt(data[i][columns[j]], 10)
      // Remove NAs and outliers
      if(Number.isInteger(num)){
          if(num > 10000){
            continue;
          }
          if(num < 500){
              bin_count[0]++
          }
          else if (num < 1000){
            bin_count[1]++
          }
          else if (num < 1500){
            bin_count[2]++
          }
          else if (num < 2000){
            bin_count[3]++
          }
          else if (num < 2500){
            bin_count[4]++
          }
          else{
            bin_count[5]++
          }   
        }
      }
    }
  for(var k=0; k<bin_count.length; k++){
    modified_data.push({x: names[k], y: bin_count[k], fill: colors[k]});
  }
  return modified_data
}

function calculateSizeOfDataSet(data){
  var size = 0;
  for(var i = 0; i < data.length; i++){
    size += data[i].y;
  }
  return size;
}

export function AcresManagedBarChart(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }
    var data = filterByVocation(filterByCropOrRegion(props.dataset, props.filter), props.vocationFilter);
    var acre_data = calculateAcres(data);
    var dataLength = calculateSizeOfDataSet(acre_data)
    var lengthString = String("Number of Farms (n = " + dataLength + ")");
    //var orgString = String("Acres vs Number of Farms (n = " + dataLength + ")");

    const fontSize = 20

    const margin = { top: 1080/12, right: 1920/8, bottom: 1080/4, left: 1920/8 };

    return (
        <div class='visualization-window'>
          {/* <h2>How many acres do you manage/consult annually?</h2> */}
          <VictoryChart height={1080} width={1920}
            //domainPadding={45}
            domainPadding={{ x: margin.right/5.3, y: margin.top }}
            padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
            animate={{duration: 800}}
          >
            <VictoryAxis
              label={"Acres"}
              style={{
                tickLabels: {fontSize: fontSize*1.25, padding: 5},
                axisLabel: {fontSize: fontSize*2.5, padding: 60}
                }}
              // style={{
              //   tickLabels: {fontSize: 30, padding: 5},
              //   axisLabel: {fontSize: 40, padding: {top: 0}}
              // }}
            />
            <VictoryAxis dependentAxis
            label = {lengthString}
            style={{
              tickLabels: {fontSize: 20, padding: 15},
              axisLabel: {fontSize: fontSize*1.5, padding: 60}
            }}/>
            <VictoryBar
              // barRatio={0.6}
              data={acre_data}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:30
                  }}
                  flyoutHeight={45}
                  flyoutWidth={60}    
                />
            }
            />
          </VictoryChart>
          
        </div>
      );
}