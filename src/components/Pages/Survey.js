import "survey-react/modern.min.css";
import { useCallback } from "react";
import { Survey, StylesManager, Model } from "survey-react";

StylesManager.applyTheme("modern");

const surveyJson = {
    "title": "Give us your data! Just kidding, we have no database :(",
    "description": "Take the survey, just do it",
    "elements": [
    {
        name: "vocation",
        title: "What is your vocation in the agronomic industry?",
        type: "radiogroup",
        isRequired: true,
        choices: [
            "Allied Industry",
            "Grower",
            "Consultant",
            "Other"
        ],
        colCount: 4
    }, 
    {
        name: "region",
        title: "What regions do you associate with?",
        isRequired: true,
        type: "dropdown",
        choices: [
            "Intermountain (Counties- )",
            "Sacramento Valley",
            "Desert",
            "Coastal",
            "Sierra Nevada",
            "SSJV",
            "NSJV"
        ],
    },
    {
        name: "crops",
        title: "What crops do you work with?",
        isRequired: true,
        type: "checkbox",
        choices: [
            "Alfalfa",
            "Barley",
            "Corn",
            "Corn Silage",
            "Cotton",
            "Dry Beans",
            "Rice",
            "Small Grain Silage",
            "Sunflower",
            "Wheat",
            "Other"
        ],
    },
    {
        name: "acreage",
        title: "Total acreage of farms you associate with?",
        isRequired: true,
        type: "text",
        placeHolder: "An int like 1500"
    },
    {
        name: "production_concerns",
        title: "Choose your main production concerns: ",
        isRequired: true,
        type: "checkbox",
        choices: [
            "Chemical Regulations",
            "Commodity Price of Crops",
            "Input Costs",
            "Labor Regulations",
            "Labor Quality and Availability",
            "Air Quality",
            "Land Tenure",
            "Consumer Demand",
            "Changing Weather and Climate",
            "Market Access"
        ]
    }
    ]
  };

//Questions: What vocation and region, Total acreage of farms, what crops are grown/consulted on,
// main production concerns

export const MiniSurvey = () => {
    
    const survey = new Model(surveyJson);
    survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });
    //get the results back and do math with them or whatever, output to pdf somehow
    return (
        // <div>
        // <h1>Give us your data! Just kidding, we have no database :(</h1>
        <Survey model={survey} />
        // </div>
    );
}