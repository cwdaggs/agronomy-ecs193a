import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

// This is a utils file for data oriented functionality

export function sort_by_very(dataset){
  var data = dataset
  for(let j = 0; j < 10; j++){
      for(let i = 0; i < data[0].length-1; i++){
          if(data[0][i].Total > data[0][i+1].Total){
              var temp0 = data[0][i+1]
              var temp1 = data[1][i+1]
              var temp2 = data[2][i+1]
              
              data[0][i+1] = data[0][i]
              data[1][i+1] = data[1][i]
              data[2][i+1] = data[2][i]

              data[0][i] = temp0
              data[1][i] = temp1
              data[2][i] = temp2
          }
      }
  }
  return data
}

export function filterByCrop(data, filter){
  return data.filter(function(d){return String(d.Crops).includes(filter)});
}

export function getFarmersCrops(data, Crops){
  var crops = []

  for(var i in data){
    var current_crops = String(data[i][Crops]).split(", ")
    for(var j in current_crops){
      if(!(crops.includes((current_crops[j])))){
        if(current_crops[j] !== "undefined"){
          crops.push(current_crops[j])
        }
      }
    }
  }
  return crops
}

// Tallies each type of answer for the given question (Concerns)
export function calculateConcernTotals(data, filter){  
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

// Tallies each type of answer for the given question (Concerns)
export function calculateConcernEach(data, filter, answer){
  var total = 0

  for(var farmer in data){
      if(data[farmer][filter] === answer){
          total ++
      }
  }

  var name = String(filter).split('_')
  var temp = ""

  for(let i = 1; i < name.length - 1; i++){
    temp += name[i] + " ";
  }
  temp += name[name.length - 1]
  return {Concern: temp, Total: total, Level_Of_Concern: answer}
}  

// Iterates through list of questions regarding farmer concerns, and sums up each answer
export function calculateConcernTotalsForAllElements(data){
    var questions = ["Concern_Air_Quality","Concern_Changing_Weather_and_Climate","Concern_Chemical_Regulations",
                    "Concern_Commondity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
                    "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"] //, "Concern_Other"]
    var answers = []
    
    for(var i in questions) {
        answers.push(calculateConcernTotals(data, questions[i]))
    }

    return answers
}

export function calculateConcernTotalsForEachElement(data){
  var questions = ["Concern_Air_Quality","Concern_Changing_Weather_and_Climate","Concern_Chemical_Regulations",
                  "Concern_Commondity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
                  "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"] //, "Concern_Other"]
  var very = []
  var somewhat = []
  var notVery = []
  // console.log("Original data: " , data)

  for(var i in questions){
      very.push(calculateConcernEach(data, questions[i], "Very concerned"))
      somewhat.push(calculateConcernEach(data, questions[i], "Somewhat concerned"))
      notVery.push(calculateConcernEach(data, questions[i], "Not  concerned"))
  }
  // console.log("New data: ", [very, somewhat, notVery])

  return [very, somewhat, notVery]
}

export function calculateCropPercentageAverage(data) {
  var columns = ["Percentage_Field_Crops", "Percentage_Vegetable_Crops", "Percentage_Tree_and_Vine_Crops", "Percentage_Other"]
  var modified_data=[]

  for (var j = 0; j < columns.length; j++) {
    var sum = 0
    var length = data.length
    for (var i = 0; i < data.length; i++) {
      var num = parseInt(data[i][columns[j]], 10)
      if (Number.isNaN(num)) {
        sum += 0
        length -= 1
      } else {
        sum += num
      }
    }
    var avg = sum / length;
    modified_data.push({x: columns[j].split('_').join(' ').replace('Percentage ', ''), y: avg});
  }

  return modified_data
}

export function useData(url) {
  
  const csvUrl = url;
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      return d;
    };

    d3.csv(csvUrl, row).then(setData);
  }, []);
  // console.log(data)
  return data;
};