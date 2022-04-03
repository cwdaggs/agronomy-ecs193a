import {VictoryLabel, VictoryAxis, VictoryChart, VictoryBar, VictoryTooltip} from 'victory';
import {filterByCropOrRegion, filterByVocation} from '../UseData.js';
import "typeface-abeezee";


export function VisualizationLandingPage(props) {
    if (!props.dataset) {
        return <pre>Loading...</pre>;
    }

    // disable buttons by adding IDs to them later to find them
    // think about what to add once stuff is disabled
    //var button1 =

    

    const fontSize = 20

    const margin = { top: 1080/12, right: 1920/8, bottom: 1080/4, left: 1920/8 };

    return (
        <div class='visualization-window'>
          <h1 id="visHeading">{"hello"}</h1>
          
        </div>
      );
}