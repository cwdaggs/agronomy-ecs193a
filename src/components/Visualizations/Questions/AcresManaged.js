import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCrop, filterByVocation} from '../UseData.js';
import "typeface-abeezee";

function calculateAcres(data){
  var names = ["< 500 Acres", "< 1000 Acres", "< 1500 Acres", "< 2000 Acres", "< 2500 Acres", "2500+ Acres"]
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
    var data = filterByVocation(filterByCrop(props.dataset, props.filter), props.vocationFilter);
    var acre_data = calculateAcres(data);
    var dataLength = calculateSizeOfDataSet(acre_data)
    var lengthString = String("Acres vs Number of Farms (n = " + dataLength + ")");

    return (
        <div>
          {/* <h2>How many acres do you manage/consult annually?</h2> */}
          <VictoryChart height={800} width={1920}
            domainPadding={60}
            animate={{duration: 800}}
          >
            <VictoryLabel text={lengthString} x={650} y={20}
            style={{
              fontSize: 45
            }}/>
            <VictoryAxis
              style={{
                tickLabels: {fontSize: 30, padding: 5},
                axisLabel: {fontSize: 40, padding: {top: 0}}
              }}
            />
            <VictoryAxis dependentAxis
            style={{
              tickLabels: {fontSize: 20, padding: 5},
            }}/>
            <VictoryBar

              data={acre_data}
              alignment="middle"
              style={{ data:  { fill: ({datum}) => datum.fill}}}
              labels={({datum}) => datum.y + " Farms"}
              labelComponent={
                <VictoryTooltip 
                  style={{
                    fontSize:30
                  }}
                  flyoutHeight={45}
                  flyoutWidth={150}    
                />
            }
            />
          </VictoryChart>
          
        </div>
      );
}