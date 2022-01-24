import logo from './logo.svg';
import './App.css';
import {TabGroup, ToggleGroup} from './Button.js'
import {ScatterPlot} from './components/Iris_ScatterPlot/ScatterPlot'

function App() {
  console.log("Hello World")
  
  // These can probably go somewhere else. I had them here for testing.
  var filter_by = ["Setosa", "Versicolor", "Virginica"]
  var filter_index = 2

  return (
    <div id="outerContainer">
      <h1>ECS 193 Senior Design Project</h1>
      <TabGroup/>
      <ScatterPlot filter={filter_by[filter_index]}/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
