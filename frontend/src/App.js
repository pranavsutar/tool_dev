import React, { useState } from 'react';
import axios from 'axios';
import MainPage from './components/DefaultPage/Mainpage';
import NavigationBar from './components/Navbar/Navigationbar';
import "./App.css"


// import './App.css';

function App() {
  
  
  return (
    <div className='total-main'>
      <NavigationBar/>
      <MainPage/>
    </div>
  );
}




export default App;
