import "survey-react/modern.min.css";
import { useCallback } from "react";
import { Survey, StylesManager, Model } from "survey-react";

StylesManager.applyTheme("modern");

const surveyJson = {
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
        placeholder: "An int like 1500"
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
    //get the results back and do math with them or whatever, output to pdf somehow
    return <Survey model={survey} />;
}