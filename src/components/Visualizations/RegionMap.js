import React from "react";
import {filterByCropOrRegion} from "./UseData"
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory';
import "./CountiesRegion.css";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const mobileWidth=1000;
const fontSize = 16;
const toolTipFontSize = (vw >= mobileWidth)? 10: 5;

const regionColorScale =  ["#0E4D64", "#137177","#188977", "#39A96B", "#74C67A", "#9EAD8F", "#6F9160"]

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

  const regionData = regionAmount(props.data);
  return (
    <div className='info-charts'>
      <div className='info-row'>
          <div className="info-legend">
            <VictoryLegend
              colorScale={regionColorScale}
              x={150}
              y={0}
              gutter={25}
              style={{labels: {fill: "black", color: "white", fontFamily: 'Roboto', fontSize: fontSize+2}, 
                    title:  {fontFamily: 'Roboto', fontSize: fontSize+2},
                    data:   {stroke: "black", strokeWidth: 1}}}
              title="Responses by Region"
              centerTitle
              data={[
                { name: "Intermountain", symbol: { fill: getRegionColor("Intermountain") }, labels:{fontSize: fontSize}},
                { name: "Sacramento Valley", symbol: { fill: getRegionColor("Sac_Valley") }, labels:{fontSize: fontSize}},
                { name: "North San Joaquin Valley", symbol: { fill: getRegionColor("NSJV") }, labels:{fontSize: fontSize}},
                { name: "South San Joaquin Valley", symbol: { fill: getRegionColor("SSJV") }, labels:{fontSize: fontSize}},
                { name: "Desert", symbol: { fill: getRegionColor("Desert") }, labels:{fontSize: fontSize}},
                { name: "Coastal", symbol: { fill: getRegionColor("Coastal") }, labels:{fontSize: fontSize}},
                { name: "Sierra Nevada", symbol: { fill: getRegionColor("Sierra_Nevada") }, labels:{fontSize: fontSize}}
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
              colorScale={regionColorScale}
              data={regionData}
              labels={({ datum }) => `${datum.x}: ${datum.y.toFixed() + "%"}`}
              labelComponent={
                  <VictoryTooltip 
                  style={{
                      fontSize:toolTipFontSize,
                      fontFamily: 'Roboto'
                  }}
                  constrainToVisibleArea={true}    
                  />
              }
            />
          </div>
      </div>
      <div className='info-row'>
        <div className="info-legend">
          <VictoryLegend
            colorScale={regionColorScale}
            x={150}
            gutter={25}
            style={{labels: {fill: "black", color: "white", fontFamily: 'Roboto', fontSize: fontSize+3}, 
                  title:  {fontFamily: 'Roboto', fontSize: fontSize+3},
                  data:   {stroke: "black", strokeWidth: 1}}}
            title="Regions"
            centerTitle
            data={[
              { name: "Intermountain", symbol: { fill: getRegionColor("Intermountain") }, labels:{fontSize: fontSize}},
              { name: "Sacramento Valley", symbol: { fill: getRegionColor("Sac_Valley") }, labels:{fontSize: fontSize}},
              { name: "North San Joaquin Valley", symbol: { fill: getRegionColor("NSJV") }, labels:{fontSize: fontSize}},
              { name: "South San Joaquin Valley", symbol: { fill: getRegionColor("SSJV") }, labels:{fontSize: fontSize}},
              { name: "Desert", symbol: { fill: getRegionColor("Desert") }, labels:{fontSize: fontSize}},
              { name: "Coastal", symbol: { fill: getRegionColor("Coastal") }, labels:{fontSize: fontSize}},
              { name: "Sierra Nevada", symbol: { fill: getRegionColor("Sierra_Nevada") }, labels:{fontSize: fontSize}}
            ]}
          />
        </div>
        <div className="info-map">
          <img src='./assets/region-map.png' alt="Region Map" className="map-image"></img>
        </div>
      </div>
    </div>
  );
};