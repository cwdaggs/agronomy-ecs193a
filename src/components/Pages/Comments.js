import "survey-react/modern.min.css";
import { Survey, StylesManager, Model } from "survey-react";

StylesManager.applyTheme("modern");

const surveyJson = {
    "title": "Survey Placeholder",
    "description": "Take the survey, just do it",
    "elements": [
    {
        name: "Suggestions Box",
        title: "Please leave any suggestions you have for us!",
        isRequired: true,
        type: "comment",
        placeHolder: "Start typing here...",
        // validators: [{
        //     "type": "expression",
        //     "text": "Please enter a valid integer.",
        //     "expression": "validateInt({acreage}) == True"}]
    }
    ]
  };

export const commentBox = () => {
    
    const survey = new Model(surveyJson);

    survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#comments')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });


    return (
        <div>
        <Survey model={survey} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
    );
}