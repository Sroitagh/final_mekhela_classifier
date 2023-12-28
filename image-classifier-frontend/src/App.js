
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from  './components/homescreen';
import ClassifyScreen from './components/classifier';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/classify" element={<ClassifyScreen />} />
      </Routes>
    </Router>
  );
};

export default App;