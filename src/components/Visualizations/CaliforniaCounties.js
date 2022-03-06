import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import * as d3 from 'd3';
import {filterByCropOrRegion, useData, acresByCounty, filterByVocation} from "./UseData"
import {VictoryLegend, VictoryPie, VictoryTooltip, VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "./data/california-counties.geojson";

const colorScale = scaleLinear()
  .domain([0, 80])
  .range(["#ffedea", "#ff5233"]);

const pieColorScale = ["#0A2F51", "#0E4D64", "#137177","#188977"]

function occupationAmount(data){
  var occMap = [  {x: "Growers", y: 100 * (filterByVocation(data, "Grower").length / data.length)}, 
                  {x: "Consultants", y: 100 * (filterByVocation(data, "Consultant (ex. Certified Crop Advisor (CCA), Pest Control Advisor (PCA))").length  / data.length ) }, 
                  {x: "Allied Industry", y: 100 * (filterByVocation(data, "Allied Industry (e.g. Input supplier, manufacturer, processor, etc.) (please specify):").length  / data.length ) }, 
                  {x: "Other", y: 100 * (filterByVocation(data, "Other (please specify):").length / data.length )} ]
  //console.log(occMap)
  return occMap
}

export const MapChart = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
}
  const data = filterByCropOrRegion(props.data, props.filter)
  const countyData = acresByCounty(data)
  const occupationData = occupationAmount(data);
  return (
    <div>
      {/* <h2>Density of Survey Responses By County</h2> */}

      <svg width={1320} height={700}>

          
          <VictoryLegend
            standalone={false}
            colorScale={colorScale}

            x={0}
            y={100}

            gutter={20}
            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                  title:  {fontFamily: 'ABeeZee', fontSize: 23},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Responses by County"
            centerTitle
            data={[
              { name: ">80", symbol: { fill: "#ff5233" }, labels:{fontSize: 20}},
              { name: "60-80", symbol: { fill: "#ff7158" }, labels:{fontSize: 20}},
              { name: "40-60", symbol: { fill: "#ff907d" }, labels:{fontSize: 20}},
              { name: "20-40", symbol: { fill: "#ffafa2" }, labels:{fontSize: 20}},
              { name: "1-20", symbol: { fill: "#ffcec7" }, labels:{fontSize: 20}},
              { name: "0", symbol: { fill: "#ffedea" }, labels:{fontSize: 20}}

            ]}
            
          />

          <ComposableMap
          projection={d3.geoAlbersUsa()}
          projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 47
          }}
          >
          {data.length > 0 && (
              <Geographies geography={geoUrl}>
              {({ geographies }) =>
                  geographies.map((geo) => {
                  const d = data.find((s) => s.County === geo.properties.name);
                  //console.log(d)
                  //var total = ((String(d["Acres_Managed"]) !== "NA")? d["Acres_Managed"]:0) + (String(d["Acres_Consulted"]) !== "NA"? d["Acres_Consulted"] :0)
                  return (
                      <Geography
                      key={geo.properties.cartodb_id}
                      geography={geo}
                      fill={d ? colorScale(countyData[geo.properties.name]): "#F5F5F5"}
                      //onClick={console.log("Acres Managed? ", d)}
                      />
                  );
                  })
              }
              </Geographies>
          )}
          </ComposableMap>
          <VictoryPie
            animate={{
              duration: 500,               
            }}
            standalone={false}
            width={1000}
            height={600}
            padding={{
              left: 750,
              bottom: 20,
              top: 20
            }}
            style={{ data: { stroke: "black", strokeWidth: 1}}}
            colorScale={pieColorScale}
            data={occupationData}
            // labels={() => null}
            labels={({ datum }) => `${datum.x + ": " + datum.y.toFixed() + "%"}`}
            labelComponent={<VictoryTooltip 
              style={{
                fontSize:20,
                fontFamily: 'ABeeZee'
              }}
              flyoutHeight={25}
              flyoutWidth={200}    
              />}
            />
            <VictoryLegend
            standalone={false}
            colorScale={colorScale}
            x={500}
            y={100}

            gutter={20}
            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                  title:  {fontFamily: 'ABeeZee', fontSize: 23},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Responses by Occupation"
            centerTitle
            data={[
              { name: "Growers", symbol: { fill: "#0A2F51" }, labels:{fontSize: 20}},
              { name: "Consultants", symbol: { fill: "#0E4D64" }, labels:{fontSize: 20}},
              { name: "Allied Industry", symbol: { fill: "#137177" }, labels:{fontSize: 20}},
              { name: "Other", symbol: { fill: "#188977" }, labels:{fontSize: 20}}
            ]}
            
          />
      </svg>
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

  const fontSize = 20

  const margin = { top: 1080/12, right: 1920/8, bottom: 1080/4, left: 1920/6 };

  return (
    <div id='about-visualization-window'>
      {/* <h2>How many acres do you manage/consult annually?</h2> */}
      <VictoryChart height={1080} width={1920}
        //domainPadding={45}
        domainPadding={{ x: margin.right/5.3, y: margin.top }}
        padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
        animate={{duration: 800}}
      >
        <VictoryAxis
          //label={"Crop"}
          style={{
            tickLabels: {fontSize: fontSize*1.25, padding: 5},
            axisLabel: {fontSize: fontSize*2, padding: 180}
            }}
          // style={{
          //   tickLabels: {fontSize: 30, padding: 5},
          //   axisLabel: {fontSize: 40, padding: {top: 0}}
          // }}
        />
        <VictoryAxis dependentAxis
        label = {"Number of Growers and Consultants"}
        style={{
          tickLabels: {fontSize: 20, padding: 15},
          axisLabel: {fontSize: fontSize*2, padding: 60}
        }}/>
        <VictoryBar horizontal
          // barRatio={0.6}
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