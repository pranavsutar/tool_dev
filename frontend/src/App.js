import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import MainPage from './components/MainPage/Mainpage';
import jsPDF from 'jspdf';
// import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true); // we will set this to false when the response is received
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        setAnalysisData(response.data);
        setHeatmapData(response.data.heatmap);
        setBargraph_sp_miss(response.data.bargraph_sp_miss);
        setBargraph_nan(response.data.bargraph_nan);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDownload = () => {
    setIsLoading(true); // off it when the pdf is downloaded, i.e after the pdf is saved
    const pdf = new jsPDF();
    const resultsContainer = document.getElementById('results-container');
    pdf.fromHTML(resultsContainer, 15, 15);
    // pdf.save('results.pdf');
    // setIsLoading(false);
    // it should be asynchoronous
    pdf.save('results.pdf').then(() => {
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    }); 
  };
  
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
