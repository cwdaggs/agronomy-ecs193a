import logo from './logo.svg';
import './App.css';
import {TabGroup, ToggleGroup} from './Button.js'

function App() {
  console.log("Hello World")
  return (
    <div id="outerContainer">
      <h1>ECS 193 Senior Design Project</h1>
      <TabGroup/>
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
