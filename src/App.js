import logo from './logo.svg';
import './App.css';
//import {TabGroup, ToggleGroup} from './Button.js'
import {TabGroup, ToggleGroup} from './components/Iris_ScatterPlot/SP_Button'

function App() {

  return (
    <div id="outerContainer">
      <h1>ECS 193 Senior Design Project</h1>
      <TabGroup />
    </div>
  );
}

export default App;
