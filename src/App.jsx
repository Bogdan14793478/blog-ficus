import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Authorization/Login";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/homepage" />
      </Switch>
    </Router>
  );
}

// export default App;
