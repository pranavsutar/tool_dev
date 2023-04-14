import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { RegExForm } from "./components/RegularExpression/form";
import MainPage from "./components/DefaultPage/Mainpage";
import NavigationBar from "./components/Navbar/Navigationbar";


// import './App.css';

function App() {
  return (
    <div className="total-main">
      <NavigationBar />
      <MainPage />
      {/* <RegExForm/> */}
    </div>
  );
}

export default App;
