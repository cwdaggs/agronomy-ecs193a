import "survey-react/modern.min.css";
import { Survey, StylesManager, Model } from "survey-react";

StylesManager.applyTheme("modern");

const surveyJson = {
    "title": "Comments and Suggestions",
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