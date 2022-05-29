import React from "react";
import { scaleLinear } from "d3-scale";
import {filterByCropOrRegion, filterByVocation} from "./UseData"
import {VictoryLegend, VictoryPie, VictoryTooltip, VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import "./CountiesRegion.css";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const fontSize = 16;

const colorScale = scaleLinear()
  .domain([0, 80])
  .range(["#ffedea", "#ff5233"]);

const pieColorScale = ["#0A2F51", "#0E4D64", "#137177","#188977"]

function occupationAmount(data){
  var occMap = [  {x: "Growers", y: 100 * (filterByVocation(data, "Grower").length / data.length)}, 
                  {x: "Consultants", y: 100 * (filterByVocation(data, "Consultant (ex. Certified Crop Advisor (CCA), Pest Control Advisor (PCA))").length  / data.length ) }, 
                  {x: "Allied Industry", y: 100 * (filterByVocation(data, "Allied Industry (e.g. Input supplier, manufacturer, processor, etc.) (please specify):").length  / data.length ) }, 
                  {x: "Other", y: 100 * (filterByVocation(data, "Other (please specify):").length / data.length )} ]
  return occMap
}

export const MapChart = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
}
  const data = filterByCropOrRegion(props.data, props.filter)
  const occupationData = occupationAmount(data);
  return (
    <div className='info-charts'>
        <div className='info-row'>
            <div className="info-legend">

              <VictoryLegend
                colorScale={colorScale}
                x={150}
                y={0}
                gutter={25}
                style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: fontSize+3}, 
                      title:  {fontFamily: 'ABeeZee', fontSize: fontSize+3},
                      data:   {stroke: "black", strokeWidth: 1}}}
                title="Responses by Vocation"
                centerTitle
                data={[
                  { name: "Growers", symbol: { fill: "#0A2F51" }, labels:{fontSize: fontSize}},
                  { name: "Consultants", symbol: { fill: "#0E4D64" }, labels:{fontSize: fontSize}},
                  { name: "Allied Industry", symbol: { fill: "#137177" }, labels:{fontSize: fontSize}},
                  { name: "Other", symbol: { fill: "#188977" }, labels:{fontSize: fontSize}}
                ]}
              
              />
            </div>
            <div className='info-pie'>
              <VictoryPie
                animate={{
                  duration: 500,               
                }}
                width={vw*.15}
                height={vh*.15}
                padding={{
                  left: 0,
                  bottom: 0,
                  top: 0
                }}
                style={{ data: { stroke: "black", strokeWidth: 1}}}
                colorScale={pieColorScale}
                data={occupationData}
                labels={({ datum }) => `${datum.x}: ${datum.y.toFixed() + "%"}`}
                labelComponent={
                    <VictoryTooltip 
                    style={{
                        fontSize:10,
                        fontFamily: 'ABeeZee'
                    }}
                    flyoutHeight={20}
                    flyoutWidth={100}  
                    />
                }
              />
            </div>
        </div>
      <div className='info-row'>
        <div className='info-legend'>
          <VictoryLegend
            
            colorScale={colorScale}

            x={150}
            y={0}

            gutter={25}
            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: fontSize+3}, 
                  title:  {fontFamily: 'ABeeZee', fontSize: fontSize+3},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Responses by County"
            centerTitle
            data={[
              { name: ">80", symbol: { fill: "#ff5233" }, labels:{fontSize: fontSize}},
              { name: "60-80", symbol: { fill: "#ff7158" }, labels:{fontSize: fontSize}},
              { name: "40-60", symbol: { fill: "#ff907d" }, labels:{fontSize: fontSize}},
              { name: "20-40", symbol: { fill: "#ffafa2" }, labels:{fontSize: fontSize}},
              { name: "1-20", symbol: { fill: "#ffcec7" }, labels:{fontSize: fontSize}},
              { name: "0", symbol: { fill: "#ffedea" }, labels:{fontSize: fontSize}}

            ]}

          />
        </div>
        <div className="info-map">
          <img src='./assets/county-map.png' alt="County Map" className="map-image"></img>
        </div>
      </div>
    </div>
  );
};


function cropAmount(data){
  var occMap = [  {x: "Rice", y: filterByCropOrRegion(data, "Rice").length}, 
                  {x: "Alfalfa", y: filterByCropOrRegion(data, "Alfalfa").length}, 
                  {x: "Wheat", y: filterByCropOrRegion(data, "Wheat").length},
                  {x: "Corn", y: filterByCropOrRegion(data, "Corn").length},
                  {x: "Corn Silage", y: filterByCropOrRegion(data, "Corn Silage").length},
                  {x: "Dry Beans", y: filterByCropOrRegion(data, "Dry Beans").length},
                  {x: "Cotton", y: filterByCropOrRegion(data, "Cotton").length},
                  {x: "Sunflower", y: filterByCropOrRegion(data, "Sunflower").length},
                  {x: "Barley", y: filterByCropOrRegion(data, "Barley").length},
                  {x: "Small Grain Silage", y: filterByCropOrRegion(data, "Small Grain Silage").length} ]
  return occMap
}


export const CropBar = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
  }
  const cropData = cropAmount(props.data);

  const fontSize = 20;

  const height = 1080;
  const width = 1920;

  const margin = { top: height/12, right: width/8, bottom: height/4, left: width/6 };

  return (
    <div id='about-visualization-window'>
      <div id = "cropBarTitle">
        Additionally, survey participants could list their top grown or consulted crops. 
        Below is a bar chart depicting the number of responses for each crop:
      </div>
      <VictoryChart height={height} width={width}
        domainPadding={{ x: margin.right/5.3 }}
        padding={{bottom: margin.bottom, left: margin.left, right: margin.right}}
        animate={{duration: 800}}
      >
        <VictoryAxis
          style={{
            tickLabels: {fontSize: fontSize*1.25, padding: 5},
            axisLabel: {fontSize: fontSize*2, padding: 180}
            }}
        />
        <VictoryAxis dependentAxis
        label = {"Number of Growers and Consultants"}
        style={{
          tickLabels: {fontSize: 20, padding: 15},
          axisLabel: {fontSize: fontSize*2, padding: 60}
        }}/>
        <VictoryBar horizontal
          sortKey= "y"
          data={cropData}
          alignment="middle"
          style={{ data:  { fill: () => "#282c5c"}}}
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