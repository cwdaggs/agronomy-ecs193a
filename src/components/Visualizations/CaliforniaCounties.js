import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import * as d3 from 'd3';
import {filterByCrop, useData, acresByCounty} from "./UseData"
import {VictoryLegend} from 'victory';
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
  .domain([0, 100])
  .range(["#ffedea", "#ff5233"]);

export const MapChart = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
}
  const data = filterByCrop(props.data, props.filter)
  const countyData = acresByCounty(data)
  return (
    <div><h2>Density of Survey Responses By County</h2>
      <svg width={1920} height={800}>
          
          <VictoryLegend
            standalone={false}
            colorScale="heatmap"
            x={950}
            y={200}
            gutter={20}
            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: 23}, 
                  title:  {fontFamily: 'ABeeZee', fontSize: 23},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Legend"
            centerTitle
            data={[
              { name: "County Density", symbol: { fill: "tomato" }, labels:{fontSize: 20}} 
            ]}
            
          />

          <ComposableMap
          projection={d3.geoAlbersUsa()}
          projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147
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
      </svg>
    </div>
  );
};