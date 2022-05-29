import { useState, useEffect } from 'react';
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

export function sort_by_freq(dataset){
  var data = dataset
  for(let j = 0; j < 13; j++){
      for(let i = 0; i < data[0].length-1; i++){
          var temp0 = data[0][i+1]
          var temp1 = data[1][i+1]
          var temp2 = data[2][i+1]
          var temp3 = data[3][i+1]
          var temp4 = data[4][i+1]
          if(data[0][i].Total > data[0][i+1].Total) {
              data[0][i+1] = data[0][i]
              data[1][i+1] = data[1][i]
              data[2][i+1] = data[2][i]
              data[3][i+1] = data[3][i]
              data[4][i+1] = data[4][i]

              data[0][i] = temp0
              data[1][i] = temp1
              data[2][i] = temp2
              data[3][i] = temp3
              data[4][i] = temp4
          }
          if (data[0][i].Total === data[0][i+1].Total) {
            if (data[1][i].Total > data[1][i+1].Total) {
              data[0][i+1] = data[0][i]
              data[1][i+1] = data[1][i]
              data[2][i+1] = data[2][i]
              data[3][i+1] = data[3][i]
              data[4][i+1] = data[4][i]

              data[0][i] = temp0
              data[1][i] = temp1
              data[2][i] = temp2
              data[3][i] = temp3
              data[4][i] = temp4
            }
            if (data[1][i].Total === data[1][i+1].Total) {
              if (data[2][i].Total > data[2][i+1].Total) {
                data[0][i+1] = data[0][i]
                data[1][i+1] = data[1][i]
                data[2][i+1] = data[2][i]
                data[3][i+1] = data[3][i]
                data[4][i+1] = data[4][i]
  
                data[0][i] = temp0
                data[1][i] = temp1
                data[2][i] = temp2
                data[3][i] = temp3
                data[4][i] = temp4
              }
              if (data[2][i].Total === data[2][i+1].Total) {
                if (data[3][i].Total > data[3][i+1].Total) {
                  data[0][i+1] = data[0][i]
                  data[1][i+1] = data[1][i]
                  data[2][i+1] = data[2][i]
                  data[3][i+1] = data[3][i]
                  data[4][i+1] = data[4][i]
    
                  data[0][i] = temp0
                  data[1][i] = temp1
                  data[2][i] = temp2
                  data[3][i] = temp3
                  data[4][i] = temp4
                }
                if (data[3][i].Total === data[3][i+1].Total) {
                  if (data[4][i].Total > data[4][i+1].Total) {
                    data[0][i+1] = data[0][i]
                    data[1][i+1] = data[1][i]
                    data[2][i+1] = data[2][i]
                    data[3][i+1] = data[3][i]
                    data[4][i+1] = data[4][i]
      
                    data[0][i] = temp0
                    data[1][i] = temp1
                    data[2][i] = temp2
                    data[3][i] = temp3
                    data[4][i] = temp4
                  }
                }
              }
            }
          }
      }
  }
  return data
}

export function filterByCropOrRegion(data, filter){
  const regionTypes = ["Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];
  if(filter === "All"){
    return data
  } 
  else if(regionTypes.includes(filter)){
    if(filter === "Sac Valley"){
      filter = "Sac_Valley";
    }
    else if(filter === "Sierra Nevada"){
      filter = "Sierra_Nevada";
    }
    return data.filter(function(d){return String(d.Region).includes(filter)});
  } else{
    return data.filter(function(d){return String(d.Crops).includes(filter)});
  }
}

export function filterByRegion(data, filter){
  const regionTypes = ["Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];
  if(filter === "All"){
    return data
  } 
  else if(regionTypes.includes(filter)){
    if(filter === "Sac Valley"){
      filter = "Sac_Valley";
    }
    else if(filter === "Sierra Nevada"){
      filter = "Sierra_Nevada";
    }
  }
  return data.filter(function(d){return String(d.Region).includes(filter)});
}

export function filterByCrop(data, filter){
    
    if(filter === "All"){
      return data
    }else{
      return data.filter(function(d){return String(d.Crops).includes(filter)});
    }
}

export function filterByVocation(data, filter){
  switch(filter){
    case "All":
      return data
    case "Growers":
      filter = "Grower"
      break;
    case "Consultants":
      filter = "Consultant (ex. Certified Crop Advisor (CCA), Pest Control Advisor (PCA))"
      break;
    case "Allied Industry":
      filter = "Allied Industry (e.g. Input supplier, manufacturer, processor, etc.) (please specify):"
      break;
    case "Other":
      filter = "Other (please specify):"
      break;
    default:
  }
  return data.filter(function(d){return String(d.Primary_Vocation).includes(filter)});
}

export function getFarmersCrops(data){
  var crops = []
  crops.push("All")

  for(var i in data){
    var current_crops = String(data[i]["Crops"]).split(", ")
    for(var j in current_crops){
      if(!(crops.includes((current_crops[j])))){
        if(current_crops[j] !== "undefined" && current_crops[j] !== ""){
          crops.push(current_crops[j])
        }
      }
    }
  }
  return crops
}

export function getFarmersCounties(data){
  var counties = []

  for(var i in data){
    var current_counties = String(data[i]["County"]).split(",")
    for(var j in current_counties){
      if(!(counties.includes((current_counties[j])))){
        if(current_counties[j] !== undefined){
          counties.push(current_counties[j])
        }
      }
      
    }
  }
  return counties
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
                    "Concern_Commodity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
                    "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"] //, "Concern_Other"]
    var answers = []
    
    for(var i in questions) {
        answers.push(calculateConcernTotals(data, questions[i]))
    }

    return answers
}

export function calculateConcernTotalsForEachElement(data){
  var questions = ["Concern_Air_Quality","Concern_Changing_Weather_and_Climate","Concern_Chemical_Regulations",
                  "Concern_Commodity_Price_of_Crops", "Concern_Consumer_Demand", "Concern_Input_Costs", "Concern_Labor_Quality_and_Availability",
                  "Concern_Labor_Regulations", "Concern_Land_Tenure", "Concern_Market_Access"] //, "Concern_Other"]
  var very = []
  var somewhat = []
  var notVery = []

  for(var i in questions){
      very.push(calculateConcernEach(data, questions[i], "Very concerned"))
      somewhat.push(calculateConcernEach(data, questions[i], "Somewhat concerned"))
      notVery.push(calculateConcernEach(data, questions[i], "Not  concerned"))

  }

  return [very, somewhat, notVery]
}

export function calculateCropPercentageAverage(data) {
  var columns = ["Percentage_of_Acres_Field_Crops", "Percentage_of_Acres_Vegetable_Crops", "Percentage_of_Acres_Tree_and_Vine_Crops", "Percentage_of_Acres_Other"]
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
    modified_data.push({x: columns[j].split('_').join(' ').replace('Percentage of Acres ', ''), y: avg});
  }

  return modified_data
}

export function averageSatisfaction(data){
  var topics = ["Compost_Management", "Cover_Crops", "Crop_Establishment", 
                "Disease_Control", "Emerging_Crops", "Greenhouse_Gas_Emissions_Reduction", 
                "Harvest_and_Postharvest", "Insect_Pest_Control", "Irrigation_Management",
                "Manure_Management", "Niche_Marketing_Field_Crops", "Nutrient_Management",
                "Organic_Production", "Salinity_Management",
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
    answers.push({Topic: topics[i], Priority: (pTot/pAmount), Satisfaction: (sTot/sAmount), Satisfaction_votes: sTot, Priority_votes: pTot, x:topics[i], y:(pTot/pAmount)})
  }
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
  var avgsX = [{x:xAvg, y: 0}, {x: xAvg, y: 3}]
  var avgsY = [{x:0, y: yAvg}, {x:3, y: yAvg}]
  for(var k = 0; k <= 3; k++){
    set.push({x: k, y:(m*k+b)})
  }

  return [set, avgsX, avgsY]

}

export function acresByCounty(data){
  var county_acres =  { }
  for(var i in data){
    var current_counties = String(data[i]["County"]).split(",")
    for( var j in current_counties){
      if(county_acres[current_counties[j]]){
        county_acres[current_counties[j]] += 1
      }else{
        county_acres[current_counties[j]] = 1
      }
    }
  }
  return county_acres
}

export function parseURL(baseURL, path, vocationArray) {
  var pathname = path;
  var vocation = vocationArray[0];
  var crop = "All";
  var region = "All";
  var baseAll = true;
  const cropChoices = [
    "All", 
    "Alfalfa", 
    "Barley", 
    "Corn", 
    "Corn Silage", 
    "Cotton", 
    "Dry Beans", 
    "Rice", 
    "Small Grain Silage", 
    "Sunflower", 
    "Wheat"
  ];

  const regionChoices = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

  if (baseURL !== pathname) {
    pathname = pathname.replace(baseURL, "");
    pathname = pathname.replaceAll("%20", " ");
    const filters = pathname.split("/");
    filters.shift();
    if (filters[0] !== "Select Vocation" && vocationArray.includes(filters[0])) {
      vocation = filters[0];
      baseAll = false;
    }
    
    if (filters[1] === "Select%20Crop") {
      crop = "All";
    }else{
      if (cropChoices.includes(filters[1])){
        crop = filters[1].replaceAll("%20", " ");
        baseAll = false;
      }else{
        crop = "All";
      }
    }

    if (filters[2] === "Select%20Region") {
      region = "All";
    }else{
      if (regionChoices.includes(filters[2])){
        region = filters[2].replaceAll("%20", " ");
        baseAll = false;
      }else{
        region = "All";
      }
    }
  } 
  return {vocation: vocation, crop: crop, region: region, baseAll: baseAll};
}

export function parseCropURLCompare(baseURL, path){

  var pathname = path;
  var crop1 = "All";
  var crop2 = "All";
  var region1 = "All";
  var region2 = "All";
  var baseAll = true;
  const cropChoices = [
    "All", 
    "Alfalfa", 
    "Barley", 
    "Corn", 
    "Corn Silage", 
    "Cotton", 
    "Dry Beans", 
    "Rice", 
    "Small Grain Silage", 
    "Sunflower", 
    "Wheat"
  ];
  const regionTypes = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

  if(baseURL !== pathname){
    pathname = pathname.replace(baseURL, "");
    pathname = pathname.replaceAll("%20", " ");
    const filters = pathname.split("/");
    filters.shift();

    if (filters[0] !== "Select Crop" && cropChoices.includes(filters[0])) {
      crop1 = filters[0].replaceAll("%20", " ");
      baseAll = false;
    }

    if (filters[1] !== "Compare Crop" && cropChoices.includes(filters[1])) {
      crop2 = filters[1].replaceAll("%20", " ");
      baseAll = false;
    }

    if (filters[2] !== "Select Region" && regionTypes.includes(filters[2])) {
      region1 = filters[2];
      baseAll = false;
    }

    if (filters[3] !== "Select Region" && regionTypes.includes(filters[3])) {
      region2 = filters[3];
      baseAll = false;
    }
  }

  return {crop1:crop1, crop2:crop2, region1:region1, region2:region2, baseAll: baseAll};
}

export function parseURLCompare(baseURL, path, vocationArray) {
  var pathname = path;
  var vocation = vocationArray[0];
  var crop = "All";
  var region = "All";
  var vocation2 = vocationArray[0];
  var crop2 = "All";
  var region2 = "All"
  var baseAll = true;

  const cropChoices = [
    "All", 
    "Alfalfa", 
    "Barley", 
    "Corn", 
    "Corn Silage", 
    "Cotton", 
    "Dry Beans", 
    "Rice", 
    "Small Grain Silage", 
    "Sunflower", 
    "Wheat"
  ];

  const regionChoices = ["All", "Intermountain", "Sac Valley", "NSJV", "SSJV", "Desert", "Coastal", "Sierra Nevada"];

  if (baseURL !== pathname) {
    pathname = pathname.replace(baseURL, "");
    pathname = pathname.replaceAll("%20", " ");
    const filters = pathname.split("/");
    filters.shift();
    if (filters[0] !== "Select Vocation" && vocationArray.includes(filters[0])) {
      vocation = filters[0];
      baseAll = false;
    }

    if (filters[1] === "Select%20Crop") {
      crop = "All";
    }else{
      if (cropChoices.includes(filters[1])){
        crop = filters[1].replaceAll("%20", " ");
        baseAll = false;
      }else{
        crop = "All";
      }
    }

    if (filters[2] === "Select%20Region") {
      region = "All";
    }else{
      if (regionChoices.includes(filters[2])){
        region = filters[2].replaceAll("%20", " ");
        baseAll = false;
      }else{
        region = "All";
      }
    }


    if (filters[3] !== "Compare Vocation" && vocationArray.includes(filters[3])) {
      vocation2 = filters[3];
      baseAll = false;
    }else{
      vocation2 = vocationArray[0];
    }


    if (filters[4] === "Select%20Crop") {
      crop2 = "All";
    }else{
      if (cropChoices.includes(filters[4])){
        crop2 = filters[4].replaceAll("%20", " ");
        baseAll = false;
      }else{
        crop2 = "All";
      }
    }

    if (filters[5] === "Select%20Region") {
      region2 = "All";
    }else{
      if (regionChoices.includes(filters[5])){
        region2 = filters[5].replaceAll("%20", " ");
        baseAll = false;
      }else{
        region2 = "All";
      }
    }
  } 
  return {vocation: vocation, crop: crop, region: region, vocation2:vocation2, crop2:crop2, region2:region2, baseAll: baseAll};
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

  return data;
};