import React from 'react';
import './css/App.css';
import Play from './Play';
import Lecture from './Lecture';
import Download from './Download';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" exact component={Play} />
          <Route path="/lecture/:id" exact component={Lecture} />
          <Route path="/download" exact component={Download} />
        </Switch>
      </div>
    </Router>
  );
}


const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/play">
      <p>play</p>
    </Link>
    <Link to="/download">
      <p>download</p>
    </Link>
  </div>
);

export default App;
