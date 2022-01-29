import logo from './logo.svg';
import './App.css';
//import {TabGroup, ToggleGroup} from './Button.js'
//import {TabGroup, ToggleGroup} from './components/Iris_ScatterPlot/SP_Button'
import {TabGroup, ToggleGroup} from './components/Concerns_Vis/ConcernButtons'
import {ConcernsMenu} from './components/Concerns_Vis/ConcernsMenu'

function App() {

  return (
    <div id="outerContainer">
      <h1>ECS 193 Senior Design Project</h1>
      <ConcernsMenu />
    </div>
  );
}

export default App;
