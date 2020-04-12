import React from 'react';
import './css/App.css';
import Play from './Play';
import Lecture from './Lecture';
import Download from './Download';
import HomeCard from './HomeCard';
import UpperBar from './UpperBar';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>         
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/play" exact component={Play} />
              <Route path="/lecture/:id" exact component={Lecture} />
              <Route path="/download" exact component={Download} />
          </Switch>
          
      </Router>
    </div>
  );
}


const Home = () => (
  <div>
      <UpperBar></UpperBar>
      <div className="home">    
        <div className="container">
          <HomeCard to='/play' Title='Search videos' imgUrl='/img/cinema.svg'></HomeCard>
          <HomeCard to='/download' Title='Download new videos' imgUrl='/img/download.svg'></HomeCard>
        </div>
      </div>
  </div>

);

export default App;
