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

export function calculatePrimaryGrowingReasons(data, filter) {
 // Does crash when trying to click the all button lol
  var column_name = filter.split(' ').join('_') + "_Reasons"
  var modified_data = []
  const myMap = new Map()
  for (var farmer in data) {
    const reasons = data[farmer][column_name].split(',')
    for (var reason in reasons) {
      var key = reasons[reason]
      if (key === " water" || key === " land" || key === " capital" || key === " know-how" || key === " etc.)" || key === "I am limited by farm resources to grow other crops (equipment") {
        key = "Limited by farm resources"
      }
      if (key != "") {
        myMap.has(key) ? myMap.set(key, myMap.get(key) + 1) : myMap.set(key, 1)
      }
    }
  }

  for (const [key, value] of myMap) {
    if (key === "Limited by farm resources") {
      modified_data.push({x: key, y: value/6});
    } else {
      modified_data.push({x: key, y: value});
    }
  }

  return modified_data
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


export function calculateAcresManagedOrConsulted(data){
  var columns = ["Acres_Managed", "Acres_Consulted"]
  var modified_data=[]

  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < columns.length; j++){
      var num = parseInt(data[i][columns[j]], 10)
      // Remove NAs and outliers
      if(Number.isInteger(num) && num < 10000){
        modified_data.push({x: data[i]["Primary_Vocation"], y: num});
        }
      }
    }    
  return modified_data
}

export function calculateAcres(data){
  var names = ["Under 500", "501-1000", "1001-1500", "1501-2000", "2001-2500", "2500+"]
  var colors = ["#c9d2b7", "#b1b8a2", "#79917c", "#647766", "#343f36", "#212121"]
  var columns = ["Acres_Managed", "Acres_Consulted"]
  var modified_data=[]
  var bin_count = [0,0,0,0,0,0]
  console.log(bin_count)

  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < columns.length; j++){
      var num = parseInt(data[i][columns[j]], 10)
      // Remove NAs and outliers
      if(Number.isInteger(num)){
          if(num <= 500){
              bin_count[0]++
          }
          else if (num <= 1000){
            bin_count[1]++
          }
          else if (num <= 1500){
            bin_count[2]++
          }
          else if (num <= 2000){
            bin_count[3]++
          }
          else if (num <= 2500){
            bin_count[4]++
          }
          else{
            bin_count[5]++
          }   
        }
      }
    }
  for(var k=0; k<bin_count.length; k++){
    modified_data.push({x: names[k], y: bin_count[k], fill: colors[k]});
  }
    
  return modified_data
}
export function averageSatisfaction(data){
  var topics = ["Compost_Management", "Cover_Crops", "Crop_Establishment", 
                "Disease_Control", "Emerging_Crops", "Greenhouse_Gas_Emissions_Reduction", 
                "Harvest_and_Postharvest", "Insect_Pest_Control", "Irrigation_Management",
                "Manure_Management", "Niche_Marketing_Field_Crops", "Nutrient_Management",
                "Organic_Production", "Other", "Salinity_Management",
                "Soil_Health_Management", "Testing_New_Products", "Variety_Testing",
                "Water_Conservation_and_Storage", "Weed_Control"]

  var answers = []

  for (var i in topics){
    var pAmount = 0
    var sAmount = 0
    var pTot = 0
    var sTot = 0

    for (var j in data){
      var satisfaction = data[j][String("Satisfaction_" + topics[i])]
      var priority = data[j][String("Priority_" + topics[i])]

      if (priority === "High Priority"){
        pTot += 3
        pAmount += 1
      }else if (priority === "Medium Priority"){
        pTot += 2
        pAmount += 1
      }else if (priority === "Low Priority"){
        pTot += 1
        pAmount += 1
      }

      if (satisfaction === "High Satisfaction"){
        sTot += 3
        sAmount += 1
      }else if (satisfaction === "Medium Satisfaction"){
        sTot += 2
        sAmount += 1
      }else if (satisfaction === "Low Satisfaction"){
        sTot += 1
        sAmount += 1
      }
    }
    if(pAmount === 0){
      pAmount = 1
    }

    if(sAmount === 0){
      sAmount = 1
    }
    answers.push({Topic: topics[i], Priority: (pTot/pAmount), Satisfaction: (sTot/sAmount)})
  }
  //console.log(answers)
  return answers
} 

export function trendLineSatisfactions(data){
  
  var xSum = 0
  var ySum = 0

  var total = data.length

  for(var i in data){
    xSum += data[i].Priority
    ySum += data[i].Satisfaction
  }
  
  var xAvg = xSum/total
  var yAvg = ySum/total

  var prod = 0
  var unc = 0

  for(var j in data){
    
    prod += ((data[j].Priority - xAvg)*(data[j].Satisfaction - yAvg))
    unc += (data[j].Priority - xAvg)*(data[j].Priority - xAvg)

  }

  var m = ( prod/unc )

  var b = yAvg - m*xAvg

  var set = []

  for(var k = 0; k <= 3; k++){
    set.push({x: k, y:(m*k+b)})
  }

  return set

}

export function calculateAffectTotals(data, filter){  
  var always = 0
  var often = 0
  var sometimes = 0
  var rarely = 0
  var never = 0

  for(var farmer in data){
      if(data[farmer][filter] === "Always"){
          always++
      }else if(data[farmer][filter] === "Often"){
          often++
      }else if(data[farmer][filter] === "Sometimes"){
          sometimes++
      }else if(data[farmer][filter] === "Rarely"){
          rarely++
      }else if(data[farmer][filter] === "Never"){
          never++
      }
  }
  return {Concern: filter, Always: always, Often: often, Sometimes: sometimes, Rarely: rarely, Never: never}
}

export function calculateAffectEach(data, filter, answer){
  var total = 0

  for(var farmer in data){
      if(data[farmer][filter] === answer){
          total ++
      }
  }

  var name = String(filter).split('_')
  var temp = ""

  for(let i = 3; i < name.length - 1; i++){
    temp += name[i] + " ";
  }
  temp += name[name.length - 1]
  return {Affect: temp, Total: total, Level_Of_Affect: answer}
}

export function calculateAffectTotalsForAllElements(data){
  var questions = ["Affected_Crop_Production_Profitability", "Affected_Crop_Production_Crop_Yield",
                  "Affected_Crop_Production_Crop_Quality", "Affected_Crop_Production_Input_Costs", 
                  "Affected_Crop_Production_Soil_Fertility", "Affected_Crop_Production_Land_Stewardship", 
                  "Affected_Crop_Production_Natural_Resource_Conservation", 
                  "Affected_Crop_Production_Meeting_Government_Regulations", "Affected_Crop_Production_Labor_Required", 
                  "Affected_Crop_Production_Ease_of_Implementation", "Affected_Crop_Production_Certainty_in_Management_Practice", 
                  "Affected_Crop_Production_Availability_of_Outreach_Information", "Affected_Crop_Production_Water_Availability"]
  var answers = []
  
  for(var i in questions) {
      answers.push(calculateAffectTotals(data, questions[i]))
  }

  return answers
}

export function calculateAffectTotalsForEachElement(data){
  var questions = ["Affected_Crop_Production_Profitability", "Affected_Crop_Production_Crop_Yield",
                  "Affected_Crop_Production_Crop_Quality", "Affected_Crop_Production_Input_Costs", 
                  "Affected_Crop_Production_Soil_Fertility", "Affected_Crop_Production_Land_Stewardship", 
                  "Affected_Crop_Production_Natural_Resource_Conservation", 
                  "Affected_Crop_Production_Meeting_Government_Regulations", "Affected_Crop_Production_Labor_Required", 
                  "Affected_Crop_Production_Ease_of_Implementation", "Affected_Crop_Production_Certainty_in_Management_Practice", 
                  "Affected_Crop_Production_Availability_of_Outreach_Information", "Affected_Crop_Production_Water_Availability"]
  var always = []
  var often = []
  var sometimes = []
  var rarely = []
  var never = []
  // console.log("Original data: " , data)

  for(var i in questions){
      always.push(calculateAffectEach(data, questions[i], "Always"))
      often.push(calculateAffectEach(data, questions[i], "Often"))
      sometimes.push(calculateAffectEach(data, questions[i], "Sometimes"))
      rarely.push(calculateAffectEach(data, questions[i], "Rarely"))
      never.push(calculateAffectEach(data, questions[i], "Never"))
  }
  // console.log("New data: ", [always, often, sometimes, rarely, never])

  return [always, often, sometimes, rarely, never]
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