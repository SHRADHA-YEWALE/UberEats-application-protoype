import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-page">
      <Jumbotron>
        <h1>Welcome to UberEats!</h1>
      </Jumbotron>
    </div>
  );
}

export default Landing;
