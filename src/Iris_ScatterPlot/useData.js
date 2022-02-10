import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl =
  './Iris_Data.csv';

export function update(data, filter){
  
  return data.filter(function(d){return d.species === filter});
}

export function useData() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      d.variety = +d.variety;
      return d;
    };
    console.log()

    d3.csv(csvUrl, row).then(setData);
  }, []);
  console.log(data)
  return data;
};