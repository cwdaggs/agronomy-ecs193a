import "survey-react/modern.min.css";
import React from "react";
import { Survey, StylesManager, Model } from "survey-react";
import Logout from './Logout.js';


StylesManager.applyTheme("modern");

const surveyJson = {
    "title": "Comments and Suggestions",
    "description": "Work in progress, feedback will not be sent until completion",
    "elements": [
    {
        name: "Suggestions Box",
        title: "Please enter any comments and suggestions here",
        isRequired: true,
        type: "comment",
        placeHolder: "Start typing...",
    }
    ]
  };


export const CommentBox = () => {
    
    const survey = new Model(surveyJson);

    survey
    .onComplete
    .add(function (sender) {
        var surveyData = sender.data;
        // send this comment to email
        console.log(surveyData["Suggestions Box"]);
        document
            .querySelector('#comments')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });


    return (
        <div>
        <Survey model={survey} />
        <Logout />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
    );
}