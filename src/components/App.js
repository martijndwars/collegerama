import React from 'react';
import './css/App.css';
import Play from './Play';
import Lecture from './Lecture';
import Download from './Download';
import HomeCard from './HomeCard';
import UpperBar from './UpperBar';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { isMobile } from "react-device-detect";
import * as bs from 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="App">
      <PhoneMessage/>
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
          <HomeCard to='/play' seen={true} Title='Search videos' imgUrl='/img/cinema.svg'></HomeCard>
          <HomeCard to='/download' seen={!isMobile} Title='Download new videos' imgUrl='/img/download.svg'></HomeCard>
        </div>
      </div>
  </div>

);

const PhoneMessage = () => (
  <div className="d-sm-none w-100 h-100 position-fixed fixed-top fixed-bottom phoneMessage">
    <p style={{
      fontSize: 100,
      color: "white",
      fontFamily: "Roboto",
      verticalAlign: "center"
      }} className="h-100 mt-5 mx-5 text-center">Please rotate your phone to view this app</p>
  </div>
);
  


export default App;
