export function VisualizationLandingPage(props) {
  if (!props.dataset) {
      return <pre>Loading...</pre>;
  }

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
      <div id="visLandingPage">
        <h1 id="visLandingHeading">Welcome to our results!</h1>
        {<p id="visLandingBody">What types of results can be seen? <br></br> <br></br> - By exploring our results, you can discover how grower's and consultant's preferences and decisions
        change depending on factors such as their region and choice of crop. <br></br> <br></br> - Additionally, you can compare how your priorities align with other similar farmers.</p>}
        
      </div>
    );
}













