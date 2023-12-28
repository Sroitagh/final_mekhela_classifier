// HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import './homescreen.css';

const HomeScreen = () => {
  return (
    <div className="background-container">
      <h1 className="header-text">AN EFFECTIVE CLASSIFIER FOR MEKHELA SADOR</h1>
      <div >
        <Link to="/classify" className="try-button">
          Give it a try 
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
