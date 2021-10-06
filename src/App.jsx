import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Author/Login";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <div className="mainContainer" style={{ scale: 1 }}>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
}

// export default App;
