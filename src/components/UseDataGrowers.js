import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl =
  './Grower_Crop_Data2.csv';

export function update(data, filter){

  return data.filter(function(d){return String(d.Crops).includes(filter)});
}

// Tallies each type of answer for the given question
export function calculateTotals(data, filter){
    
    var notConcerned = 0
    var somewhatConcerned = 0
    var veryConcerned = 0

    for(var farmer in data){
     
        if(data[farmer][filter] === "Not  concerned"){
            notConcerned ++
        }else if(data[farmer][filter] === "Somewhat concerned"){
            somewhatConcerned ++
        }else if(data[farmer][filter] === "Very concerned"){
            veryConcerned ++
        }
    }

    return {Concern: filter, Not_Concerned: notConcerned, Somewhat_Concerned: somewhatConcerned, Very_Concerned: veryConcerned}
}   

// Iterates through list of questions regarding farmer concerns, and sums up each answer
export function calculateTotalsForAllElements(data){
    var questions = ["Concern_Air_Quality","Concern_Changing_Weather_and_Climate","Concern_Chemical_Regulations",
                    "Concern_Commondity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
                    "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"] //, "Concern_Other"]
    var answers = []
    
    for(var i in questions){
        answers.push(calculateTotals(data, questions[i]))
    }

    return answers
}

export function useData() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
        d.Acres = +d.Acres
      return d;
    };
    console.log()

    d3.csv(csvUrl, row).then(setData);
  }, []);
  return data;
};