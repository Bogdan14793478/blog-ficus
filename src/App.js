import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Author/Login";
import Register from "./components/Author/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      {/* <Navbar>??? /> */}
      <Switch>
        <Route path="/homepage">
          {/* <Home /> */}
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
