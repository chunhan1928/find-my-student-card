import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import Homepage from './container/Homepage';
import Detail from './container/Detail';
import Heatmap from './container/Heatmap';
import Upload from './container/Uploadpage';
import BG from './components/BGpic';
import Login from './container/Login';
import { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Router>
    <Routes>
    {/* <Upload/> */}
      <Route path="/detail" element={<Detail/>} />
      <Route path="/home" element={<Homepage/>} />
      <Route path="/upload/:currentStep" element={<Upload/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/HeatMap" element={<Heatmap/>} />
    </Routes>
  </Router> 

  );
}

export default App;
