import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Demo from "./component/deom01";
import Upload from "./component/Upload";

function App() {
  return (
    <div className="App">
      {/* <Demo /> */}
      <Upload />
    </div>
  );
}

export default App;
