import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import MainPage from './components/MainPage/Mainpage';
import NavigationBar from './components/Navbar/Navigationbar';


// import './App.css';

function App() {
  
  
  return (
    <div>
      <NavigationBar/>
      <MainPage/>
    </div>
  );
}




export default App;
