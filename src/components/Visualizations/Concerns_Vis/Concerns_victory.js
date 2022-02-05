import { VictoryBar, VictoryChart, VictoryStack, VictoryAxis, VictoryLabel } from 'victory';
import {calculateConcernTotalsForEachElement, filterByCrop} from '../UseData.js'
import { scaleBand } from 'd3';
    
    // This is an example of a function you might use to transform your data to make 100% data
    function transformData(dataset) {

        const totals = dataset[0].map((data, i) => {
        return dataset.reduce((memo, curr) => {
          return memo + curr[i].Total;
        }, 0);
      });
      return dataset.map((data) => {
        return data.map((datum, i) => {
          return { x: datum.Concern, y: (datum.Total / totals[i]) * 100 };
        });
      });
    }
  
    export function ConcernsVictory({myDataset, filter}) {

        if (!myDataset) {
            return <pre>Loading...</pre>;
        }

      var data_filtered = filterByCrop(myDataset, filter)
      const dataset = transformData(calculateConcernTotalsForEachElement(data_filtered));
      
      const width = 800;
      const height = 500;
      const margin = { top: 20, right: 30, bottom: 65, left: 220 };

      const innerWidth = width - margin.left - margin.right;

      return (
        <div>
          <VictoryChart height={height} width={innerWidth}
            domainPadding={{ x: 30, y: 20 }}
          >
              <VictoryStack
                style={{
                    data: { stroke: "black", strokeWidth: 0.5 }
                }}
                colorScale={["#ff6361", "#ffa600", "green"]}
              >
                {dataset.map((data, i) => {
                  return <VictoryBar data={data} key={i}/>;
                })}
              </VictoryStack>
              <VictoryAxis dependentAxis
                tickFormat={(tick) => `${tick}%`}
              />
              <VictoryAxis
                tickCount={10}
                tickLabelComponent={
                            
                            <VictoryLabel 
                                angle={-45} 
                                textAnchor="end" 
                                height={100}
                                data={["Air Quality","Weather and Climate","Chemical Regulations",
                                "Commondity Price of Crops", "Consumer Demand", "Input Costs", "Labor Quality and Availability",
                                "Labor Regulations", "Land Tenure", "Market Access"]}
                            />
                                
                            }
                
              />
          </VictoryChart>
        </div>
      );
    }