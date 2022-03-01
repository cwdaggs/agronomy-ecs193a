import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import * as d3 from 'd3';
import {filterByCrop, useData, acresByCounty, filterByVocation} from "./UseData"
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory';
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
  console.log(occMap)
  return occMap
}

export const MapChart = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
}
  const data = filterByCrop(props.data, props.filter)
  const countyData = acresByCounty(data)
  const occupationData = occupationAmount(data);
  return (
    <div>
      {/* <h2>Density of Survey Responses By County</h2> */}
      <svg width={1920} height={1000}>
          
          <VictoryLegend
            standalone={false}
            colorScale={colorScale}
            x={100}
            y={200}
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
            height={700}
            padding={{
              left: 800,
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
            x={1200}
            y={200}
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