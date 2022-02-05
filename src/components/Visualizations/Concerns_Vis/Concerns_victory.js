import { Background, VictoryTheme, VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';
import {sort_by_very, calculateConcernTotalsForEachElement, filterByCrop} from '../UseData.js'
    
    // This is an example of a function you might use to transform your data to make 100% data
    function transformData(dataset) {

        const totals = dataset[0].map((data, i) => {
        return dataset.reduce((memo, curr) => {
          return memo + curr[i].Total;
        }, 0);
      });
      return dataset.map((data) => {
        return data.map((datum, i) => {
          return { x: datum.Concern, y: (datum.Total / totals[i]) * 100, concern: datum.Level_Of_Concern };
        });
      });
    }
  
    export function ConcernsVictory({myDataset, filter}) {

        if (!myDataset) {
            return <pre>Loading...</pre>;
        }

      var data_filtered = filterByCrop(myDataset, filter)
      var data_by_concern = calculateConcernTotalsForEachElement(data_filtered)
      var data_sorted = sort_by_very(data_by_concern)
      const dataset = transformData(data_sorted);

      const width = 250;
      const height = 150;
      const margin = { top: height/10, right: width/4, bottom: height/10, left: width/4 };

      const fontSize = 4

      return (
        <div>
          <VictoryChart
            horizontal={true}
            x={10}
            animate={{
                duration: 500,
                
              }}
            height={height} 
            width={width}
            domainPadding={{ x: margin.right/10, y: margin.top/10 }}
            padding={{ top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right }}
            
          >
              <VictoryStack
                
                style={{
                    data: { stroke: "black", strokeWidth: 0.5 }
                }}
                colorScale={["#ff6361", "#ffa600", "green"]}
              >
                {dataset.map((data, i) => {
                  return <VictoryBar 
                    data={data} 
                    key={i} 
                    labels={({datum}) => datum.concern + ": " + Math.round(datum.y) + "%"}
                    labelComponent={
                        <VictoryTooltip 
                          style={{
                            height:4,
                            width:4,
                            fontSize:3
                          }}    
                        />
                    }/>;
                })}
              </VictoryStack>
              <VictoryAxis dependentAxis

                tickFormat={(tick) => `${tick}%`}
                
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