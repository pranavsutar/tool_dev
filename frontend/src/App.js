import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import MainPage from './components/MainPage/Mainpage';

// import './App.css';

function App() {
  
  
  return (
    <div>
      <MainPage/>
    </div>
  );
}

// If a long string with many sentences is given, then it will return an array of sentences
// function splitIntoSentences(text) {
//   const sentences = text.split("\n");
//   return sentences.filter(sentence => sentence.length > 0);
// }


export default App;
