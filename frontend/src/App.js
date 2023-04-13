import React, { useState } from 'react';
import axios from 'axios';
import MainPage from './components/DefaultPage/Mainpage';
import NavigationBar from './components/Navbar/Navigationbar';
import "./App.css"
import { RegExForm } from './components/RegularExpression/form';


// import './App.css';

function App() {
  
  
  return (
    <div className='total-main'>
      <NavigationBar/>
      <MainPage/>
      <RegExForm/>
    </div>
  );
}




export default App;
