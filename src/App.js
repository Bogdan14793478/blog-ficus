import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Authorization/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login /> }>
        </Route>
        <Route path="/homepage">
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
