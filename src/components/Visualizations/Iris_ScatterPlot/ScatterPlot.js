import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, max, format, extent, scaleOrdinal } from 'd3';
import { useData, update } from './useData';
//import { useData, update } from '../UseDataGrowers';
import { XAxis } from './SP_xAxis';
import { YAxis } from './SP_yAxis';
import { Marks } from './ScatterMarks';

// Source for demo https://www.youtube.com/watch?v=2LhoCfjm8R4&t=17209s

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function ScatterPlot ({filter})  {
  var data_full = useData();
  if (!data_full) {
    return <pre>Loading...</pre>;
  }
  // Filters data set in useData by specified parameter "filter"
  var data = update(data_full, filter)


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.petal_length;
  const xAxisLabel = 'Petal Length';
  const yValue = d => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const colorValue = (d) => d.species;

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
 
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <YAxis 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={5} 
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={7}
          colorScale={colorScale}
          colorValue={colorValue}
        />
        
        
      </g>
    </svg>
  );
};
//const rootElement = document.getElementById('root');
//ReactDOM.render(<ScatterPlot />, rootElement);

export {ScatterPlot}