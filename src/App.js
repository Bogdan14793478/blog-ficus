import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Authorization/Login";
// import Register from "./components/Author/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login /> }>
        </Route>
       {/* </Switch> */}
      
      {/* <Navbar>??? /> */}
      {/* <Switch> */}
        <Route path="/homepage">
          {/* <Home /> */}
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
