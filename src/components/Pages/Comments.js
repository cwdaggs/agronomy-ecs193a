import "survey-react/modern.min.css";
import React from "react";
import { Survey, StylesManager, Model } from "survey-react";
import Logout from './Logout.js';
import emailjs, { init } from "@emailjs/browser";


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


export const CommentBox = (profile) => {
    
    var Filter = require('bad-words'),
        filter = new Filter();
    init("bbHpEmI6Hk-yZSrJy");
    const survey = new Model(surveyJson);

    survey
    .onComplete
    .add(function (sender) {
        var surveyData = sender.data;
        var templateParams = {
            from_name: profile.profile.profileObj.name,
            from_email: profile.profile.profileObj.email,
            message: filter.clean(surveyData["Suggestions Box"])
        };

        // send comment to email
        emailjs.send("service_lyg6l6f", "template_ljmf23h", templateParams)
            .then(function(response) {
                console.log('Comment Sent Successfully!', response.status, response.text);
            }, function(error) {
                console.log('Failed to send comment', error);
            });
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