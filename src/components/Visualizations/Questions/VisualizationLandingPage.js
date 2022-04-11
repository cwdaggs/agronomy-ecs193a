import React, { useState, useEffect } from "react";

function removeTopText(){
  var text = document.getElementById("visLandingBody");
  text.style.display = "none";

  try{
    var bottomText = document.getElementById("visLandingBodyScroll");
    bottomText.style.display = "block";
    var headingScroll = document.getElementById("visLandingHeadingScroll")
    headingScroll.style.display = "block";
    var heading = document.getElementById("visLandingHeading")
    heading.style.display = "none";
    var extendedText = document.getElementById("visLandingBodyExtended");
    extendedText.style.display = "none";
  } catch (error) {
    // bottom Div doesn't exist yet
    // TODO: add function to wait for it to exist before trying to hide it
  }
}

function removeBottomText(){
  var text = document.getElementById("visLandingBody");
  text.style.display = "block";

  try{
    var bottomText = document.getElementById("visLandingBodyScroll");
    bottomText.style.display = "none";
    var headingScroll = document.getElementById("visLandingHeadingScroll")
    headingScroll.style.display = "none";
    var heading = document.getElementById("visLandingHeading")
    heading.style.display = "block";
    var extendedText = document.getElementById("visLandingBodyExtended");
    extendedText.style.display = "block";
  } catch (error) {
    // bottom Div doesn't exist yet
    // TODO: add function to wait for it to exist before trying to hide it
  }
}

export function VisualizationLandingPage(props) {
  const [isVisible, setVisibility] = useState(false);

  const listenToScroll = () => {
    let heightToHideFrom = 600;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
       
    if (winScroll > heightToHideFrom) { 
      removeTopText();
      isVisible &&      // to limit setting state only once      
      setVisibility(false);
    } else {
      removeBottomText();
      setVisibility(true);
    }  
  };

  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])

  // disable buttons by adding IDs to them later to find them
  // think about what to add once stuff is disabled
  try{
    var visButton = document.getElementById("visButton");
    // visButton.style.position = "fixed";
    // visButton.style.top = "50%";
    // visButton.style.left = "50%";
    // visButton.style.transform = "translate(-50%, -50%)";
    // visButton.style.zIndex = "0";


    var buttonDiv = document.getElementById("compareDiv");
    //buttonDiv.style.display = "none";

    //var visButton = document.getElementById("visButton");
    // visButton.style.marginLeft = "47%";
    // visButton.style.marginTop = "50px";
    // visButton.style.marginBottom = "50px";

    var visWelcomePage = document.getElementById("visWelcome");
    //visWelcomePage.style.backgroundImage = "url(./images/pexels-seb-360013.jpg)"
  //     background-image: url(./images/pexels-seb-360013.jpg);
  // /* Need to make height dynamic */
  // height: 800px;
  // background-repeat: no-repeat;
  // background-attachment: fixed; 
  // background-size: 100% 100%;
  } catch (error) {
    // compare button doesn't exist yet
    // TODO: add function to wait for it to exist before trying to hide it
  }
  

  return (
    <div>
      <div id="visLandingPage">
        <h1 id="visLandingHeading">Welcome to our results!</h1>
        {<p id="visLandingBody">- By exploring our results, you can discover how grower's and consultant's preferences and decisions
        change depending on factors such as their region and choice of crop. <br></br> <br></br> - Additionally, you can compare how your priorities and concerns align with others.
        <br></br> <br></br> <br></br> <br></br> </p>}
        {<p id="visLandingBodyExtended">Scroll down to learn more about California's farmers!</p>}
        
      </div>
      {isVisible && <div id="visLandingPageScroll">
        <h1 id="visLandingHeadingScroll">What is there to do?</h1>
        {<p id="visLandingBodyScroll"> - By using the "Select Topic" button, you can choose to look at visualizated data representing the concerns, priorities, and challenges 
        faced in the community. <br></br> <br></br>  - Additionally, don't forget to take our survey to get personalized visualizations
        that will compare your responses against over __ participants throughout California!</p>}
        
      </div>}
    </div>
    );
}













