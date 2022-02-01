import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, max, format, scaleOrdinal } from 'd3';
import { filterByCrop, calculateConcernTotalsForAllElements } from '../UseData';
import { XAxis } from './Concern_xAxis';
import { YAxis } from './Concern_yAxis';
import { Marks } from './ConcernMarks';
//import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

const width = 800;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220 };
const xAxisLabelOffset = 50;

function Concerns({filter, dataset_full, population}) {
  if (!dataset_full) {
    return <pre>Loading...</pre>;
  }

  //console.log(dataset_full)
  var data_filtered = filterByCrop(dataset_full, filter)
  //console.log(data_filtered)
  //console.log(data)
  var data = calculateConcernTotalsForAllElements(data_filtered)
  //console.log(data)

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.Concern;
  const xValue1 = d => d.Very_Concerned;
  const xValue2 = d => d.Somewhat_Concerned;
  const xValue3 = d => d.Not_Concerned;

  const colorValue = (d) => d.Concern;

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const y_scale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

    // Finds maximum for all answers to set domain properly
    var x1_max_range = max(data, xValue1) 
    var x2_max_range = max(data, xValue2) 
    var x3_max_range = max(data, xValue3) 
    var x_max = Math.max(x1_max_range, x2_max_range, x3_max_range)


  const x_scale = scaleLinear()
    .domain([0, x_max])
    .range([0, innerWidth]);

  const color_scale1 = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#AB6465']);

  const color_scale2 = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#D2B48C']);

  const color_scale3 = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#9CAF88']);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis
          x_scale={x_scale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <YAxis y_scale={y_scale}/>
        <text
          className="yaxis-label"
          x={xAxisLabelOffset- innerHeight/2}
          y={innerWidth / 4}
          textAnchor="middle"
        >
        </text>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {population}
        </text>
        <Marks
          data={data}
          x_scale={x_scale}
          y_scale={y_scale}
          xValue={xValue1}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          color_scale={color_scale1}
          colorValue={colorValue}
          order={1}
        />
        <Marks
          data={data}
          x_scale={x_scale}
          y_scale={y_scale}
          xValue={xValue2}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          color_scale={color_scale2}
          colorValue={colorValue}
          order={2}
        />
        <Marks
          data={data}
          x_scale={x_scale}
          y_scale={y_scale}
          xValue={xValue3}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          color_scale={color_scale3}
          colorValue={colorValue}
          order={3}
        />
      </g>
    </svg>
  );
};
export {Concerns}
