import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./todos";
import Pictures from "./pictures";
import "./styles.css";
import Landing from "./landing";

export default function App() {
  return (
    <Router>
      <Route exact path={"/"} component={Landing} />
      <Route path={"/todos"} component={Todos} />
      <Route path={"/pictures"} component={Pictures} />
    </Router>
  );
}
