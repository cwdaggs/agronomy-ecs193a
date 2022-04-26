import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import * as d3 from 'd3';
import {filterByCropOrRegion, useData, acresByCounty, filterByVocation} from "./UseData"
import {VictoryLegend, VictoryPie, VictoryTooltip, VictoryBar, VictoryAxis, VictoryChart} from 'victory';
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const fontSize = 16;

const geoUrl =
  "./data/california-counties.geojson";

const regionColorScale =  ["#0E4D64", "#137177","#188977", "#39A96B", "#74C67A", "#9EAD8F", "#6F9160"]

const countyToRegion = {"Siskiyou": "Intermountain","Trinity": "Intermountain","Lassen": "Intermountain","Modoc": "Intermountain","Shasta": "Intermountain","Plumas": "Intermountain",
"Solano":"Sac_Valley","Yolo":"Sac_Valley","Sacramento":"Sac_Valley","Sutter":"Sac_Valley","Yuba":"Sac_Valley","Colusa":"Sac_Valley","Tehama":"Sac_Valley","Butte":"Sac_Valley","Glenn":"Sac_Valley",
"Madera":"NSJV", "San Joaquin":"NSJV", "Merced":"NSJV", "Stanislaus":"NSJV",
"Fresno":"SSJV", "Kings":"SSJV", "Tulare":"SSJV", "Kern":"SSJV",
"San Bernardino":"Desert", "Riverside":"Desert", "Imperial":"Desert",
"Del Norte":"Coastal","Humboldt":"Coastal","Mendocino":"Coastal","Lake":"Coastal","Sonoma":"Coastal","Napa":"Coastal","Marin":"Coastal","Contra Costa":"Coastal","Alameda":"Coastal","San Francisco":"Coastal","San Mateo":"Coastal","Santa Cruz":"Coastal","Santa Clara":"Coastal","San Benito":"Coastal","Monterey":"Coastal","San Luis Obispo":"Coastal","Santa Barbara":"Coastal","Ventura":"Coastal","Los Angeles":"Coastal","Orange":"Coastal","San Diego":"Coastal",
"Sierra":"Sierra_Nevada","Nevada":"Sierra_Nevada","Placer":"Sierra_Nevada","El Dorado":"Sierra_Nevada","Amador":"Sierra_Nevada","Calaveras":"Sierra_Nevada","Alpine":"Sierra_Nevada","Tuolumne":"Sierra_Nevada","Mariposa":"Sierra_Nevada","Mono":"Sierra_Nevada","Inyo":"Sierra_Nevada"}

const counties = ["Siskiyou","Trinity","Lassen","Modoc","Shasta","Plumas",
"Solano","Yolo","Sacramento","Sutter","Yuba","Colusa","Tehama","Butte","Glenn",
"Madera", "San Joaquin", "Merced", "Stanislaus",
"Fresno", "Kings", "Tulare", "Kern",
"San Bernardino", "Riverside", "Imperial",
"Del Norte","Humboldt","Mendocino","Lake","Sonoma","Napa","Marin","Contra Costa","Alameda","San Francisco","San Mateo","Santa Cruz","Santa Clara","San Benito","Monterey","San Luis Obispo","Santa Barbara","Ventura","Los Angeles","Orange","San Diego",
"Sierra","Nevada","Placer","El Dorado","Amador","Calaveras","Alpine","Tuolumne","Mariposa","Mono","Inyo"]

function getRegionColor(county){

    var regionCol = {Intermountain: regionColorScale[0], Sac_Valley: regionColorScale[1], NSJV: regionColorScale[2],
    SSJV: regionColorScale[3], Desert: regionColorScale[4], Coastal: regionColorScale[5], Sierra_Nevada: regionColorScale[6]}
    return (regionCol[String(county)])
}

function regionAmount(data){
  var regionMap = [    
                    {x: "Intermountain", y: 100 * (filterByCropOrRegion(data, "Intermountain").length / data.length)}, 
                    {x: "Sac Valley", y: 100 * (filterByCropOrRegion(data, "Sac Valley").length / data.length)},
                    {x: "NSJV", y: 100 * (filterByCropOrRegion(data, "NSJV").length / data.length)},
                    {x: "SSJV", y: 100 * (filterByCropOrRegion(data, "SSJV").length / data.length)},
                    {x: "Desert", y: 100 * (filterByCropOrRegion(data, "Desert").length / data.length)},
                    {x: "Coastal", y: 100 * (filterByCropOrRegion(data, "Coastal").length / data.length)},
                    {x: "Sierra Nevada", y: 100 * (filterByCropOrRegion(data, "Sierra Nevada").length / data.length)}                   
                ]

  return regionMap
}

export const RegionMapChart = (props) => {
  if (!props.data){
    return <pre>Loading...</pre>;
}
  const data = counties
  const regionData = regionAmount(props.data);
  return (
    <div id='info-charts'>
      <div className='flex-parent'>
        <div className="flex-child">
          <VictoryLegend
            colorScale={regionColorScale}

            gutter={25}
            style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: fontSize+3}, 
                  title:  {fontFamily: 'ABeeZee', fontSize: fontSize+3},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Regions"
            centerTitle
            data={[
              { name: "Intermountain", symbol: { fill: getRegionColor("Intermountain") }, labels:{fontSize: fontSize}},
              { name: "Sac Valley", symbol: { fill: getRegionColor("Sac_Valley") }, labels:{fontSize: fontSize}},
              { name: "NSJV", symbol: { fill: getRegionColor("NSJV") }, labels:{fontSize: fontSize}},
              { name: "SSJV", symbol: { fill: getRegionColor("SSJV") }, labels:{fontSize: fontSize}},
              { name: "Desert", symbol: { fill: getRegionColor("Desert") }, labels:{fontSize: fontSize}},
              { name: "Coastal", symbol: { fill: getRegionColor("Coastal") }, labels:{fontSize: fontSize}},
              { name: "Sierra Nevada", symbol: { fill: getRegionColor("Sierra_Nevada") }, labels:{fontSize: fontSize}}
            ]}
          />
        </div>
        <img src='./assets/region-map-2.png' id="map-image"></img>
      </div>
      <div className='flex-parent'>
          <div id="info-legend">
            <VictoryLegend
              colorScale={regionColorScale}
              x={100}
              y={0}
              gutter={25}
              style={{labels: {fill: "black", color: "white", fontFamily: 'ABeeZee', fontSize: fontSize+2}, 
                    title:  {fontFamily: 'ABeeZee', fontSize: fontSize+2},
                    data:   {stroke: "black", strokeWidth: 1}}}
              title="Responses by Region"
              centerTitle
              data={[
                { name: "Intermountain", symbol: { fill: getRegionColor("Intermountain") }, labels:{fontSize: fontSize}},
                { name: "Sac Valley", symbol: { fill: getRegionColor("Sac_Valley") }, labels:{fontSize: fontSize}},
                { name: "NSJV", symbol: { fill: getRegionColor("NSJV") }, labels:{fontSize: fontSize}},
                { name: "SSJV", symbol: { fill: getRegionColor("SSJV") }, labels:{fontSize: fontSize}},
                { name: "Desert", symbol: { fill: getRegionColor("Desert") }, labels:{fontSize: fontSize}},
                { name: "Coastal", symbol: { fill: getRegionColor("Coastal") }, labels:{fontSize: fontSize}},
                { name: "Sierra Nevada", symbol: { fill: getRegionColor("Sierra_Nevada") }, labels:{fontSize: fontSize}}
              ]}
            />
          </div>
          <div id='info-pie'>
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
              colorScale={regionColorScale}
              data={regionData}
              // labels={() => null}
              labels={({ datum }) => `${datum.y.toFixed() + "%"}`}
              labelComponent={
                  <VictoryTooltip 
                  style={{
                      fontSize:fontSize,
                      fontFamily: 'ABeeZee'
                  }}
                  flyoutHeight={20}
                  flyoutWidth={40}    
                  />
              }
            />
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

  const fontSize = 20

  const margin = { top: vh/12, right: vw/8, bottom: vh/4, left: vw/6 };

  return (
    <div id='about-visualization-window'>
      {/* <h2>How many acres do you manage/consult annually?</h2> */}
      <VictoryChart height={vh} width={vw}
        //domainPadding={45}
        domainPadding={{ x: margin.right/5.3, y: margin.top }}
        padding={{top: margin.top, bottom: margin.bottom, left: margin.left, right: margin.right}}
        animate={{duration: 800}}
      >
        <VictoryAxis
          //label={"Crop"}
          style={{
            tickLabels: {fontSize: fontSize*1.25, padding: 5},
            axisLabel: {fontSize: fontSize*2, padding: vw/10}
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
        <VictoryLegend 
                title="Additionally, survey participants could list their top grown or consulted crops. Below is a bar chart depicting the number of
                responses for each crop:"
              />
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