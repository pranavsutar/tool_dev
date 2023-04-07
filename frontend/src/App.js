import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import './App.css';
import Navbar from './Components/Navbar';
import Codebox from './Components/Codebox';
import Excel from './Components/excel/Excel';
import  Papa from "papaparse";

const language = 'python';
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);
  const [boxplot, setBoxplot] = useState(null);


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    // Added for excel Purpose, which itself is Okay
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (result) {
        setJsonData(result.data);
      },
    });
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
        setBoxplot(response.data.outliers.plot);
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
    <>
    <Navbar />
    <div className="App">
      
      {/*       {loading && <div className="loading-overlay"><div className="spinner"></div></div>} { show spinner when loading } */}
      { isLoading  && <div className="loading-overlay"><div className="spinner"></div>
          <div className="loading-spinner">
            <Spinner animation="border" role="status">  
              <figcaption className="sr-only">Loading...</figcaption>
            </Spinner>
          </div>
        </div>}
      <header className="App-header">
        <h1>SniffCSV<br></br>Data Smells Detector</h1>
        <div id='input-file-container'>
          <input type="file"  className="input-file" onChange={handleFileUpload} />
          <button onClick={handleUpload} className="analyze-btn">Analyze</button>
        </div>
        
        { (
    analysisData && (
      <>
      
          <Excel myjson={jsonData} />
      <div className="results-container">
          <h2 className="analysis-title">Analysis Results</h2>
          <div className="analysis-summary">
            <p>Number of Rows: {analysisData.num_rows}</p>
            <p>Number of Columns: {analysisData.num_cols}</p>
            {<p >Column Names: <p id='Column-Names'>{analysisData.column_names.join(', ')}</p></p>}
          </div>
          <div className="analysis-details">
            <h3 className="data-smells-title">Special Missing Values</h3>
                                  
            <ul className="data-smells-list">
              {splitIntoSentences(analysisData.sp_missing_values.Info).map((sentence, index) =>
                <li key={index}>{sentence}</li>
                )}
            </ul>
            <Codebox language={language} code={analysisData.sp_missing_values.Code} />
              {bargraph_sp_miss && (
                <div>
                  <h3>Special Missing Values</h3>
                  <img src={`data:image/png;base64,${bargraph_sp_miss}`} alt="special missing values" />
                </div>
              )}
              <h3> NaN Values</h3>
                  <ul className="data-smells-list">
                    {splitIntoSentences(analysisData.sp_missing_values.InfoNan).map((sentence, index) =>
                      <li key={index}>{sentence}</li>
                      )}
                  </ul>
                  <Codebox language={language} code={analysisData.sp_missing_values.Code_Nan} />
              {bargraph_nan && (
                <div>
                  <h3>NaN Values</h3>
                  <img src={`data:image/png;base64,${bargraph_nan}`} alt="NaN values" />
                </div>
              )}
          </div>
          <div className="analysis-details">
            <h3 className="data-smells-title">Missing Values</h3>
                                  
            <ul className="data-smells-list">
              {splitIntoSentences(analysisData.missing_values.Info).map((sentence, index) =>
                <li key={index}>{sentence}</li>
                )}
            </ul>
            <Codebox language={language} code={analysisData.missing_values.Code} />
              {bargraph_nan && (
                <div>
                  <h3> Missing Values</h3>
                  <img src={`data:image/png;base64,${bargraph_nan}`} alt="missing values" />
                </div>
              )}
          </div>
          <div className='analysis-details'>
            <h3 className='data-smells-title'>Correlated Values</h3>
            <div className='heatmap-container'>
            {heatmapData && (
              <div>
                <h3>Correlation Heatmap</h3>
                <img src={`data:image/png;base64,${heatmapData}`} alt="correlation heatmap" />
              </div>
            )}
            <ul className="data-smells-list">
              {analysisData.correlated.map((sentence, index) =>
                <li key={index}>{sentence}</li>
              )}
            </ul>
            </div>
          </div>
          <div className='analysis-details'>
            <h3 className='data-smells-title'>Outliers</h3>
            <ul className="data-smells-list">
              {splitIntoSentences(analysisData.outliers.Info).map((sentence, index) =>
                <li key={index}>{sentence}</li>
              )}
            </ul>
            <Codebox language={language} code={analysisData.outliers.Code} />
            {boxplot && (
              <div>
                <h3>Boxplot</h3>
                <img src={`data:image/png;base64,${boxplot}`} alt="boxplot" />
              </div>
            )}
          </div>  
          <div className='analysis-details'>
            <h3 className='data-smells-title'>Duplicate Values</h3>
            <ul className="data-smells-list">
              {splitIntoSentences(analysisData.duplicates).map((sentence, index) =>
                <li key={index}>{sentence}</li>
              )}
            </ul>
          </div>
          <button className="download-btn" onClick={handleDownload}>Download Results as PDF</button>
        </div>
        </>)
      )}
      </header>
    </div>
    </>
  );
}

// If a long string with many sentences is given, then it will return an array of sentences
function splitIntoSentences(text) {
  const sentences = text.split("\n");
  return sentences.filter(sentence => sentence.length > 0);
}

export default App;
