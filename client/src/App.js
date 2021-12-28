import './App.css';
import './style.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import File from './components/File';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Fileshow from './components/Fileshow';
import Login from "./components/Login";
import Register from "./components/Register";
import Userupload from './components/Userupload';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/uploadfile">
          <Userupload />
        </Route>
        <Route path="/">
          <File />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
