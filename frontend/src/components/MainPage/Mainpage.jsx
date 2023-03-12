import Excel from '../excel/Excel';
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "./Mainpage.css";
import jsPDF from 'jspdf';
import { Button } from 'react-bootstrap';



export default function MainPage() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);


  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
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
    <div className='main_file' >
      <input
        type="file"
        name="file"
        accept=".csv"
        // Removed the onChange event handler of csv file
        onChange={handleFileUpload}
        style={{ display: "block", margin: "10px auto" }}
        className="input-file"
      />



      <Excel myjson={jsonData} />
      <Button className="button_1" variant="outline-dark" onClick={handleUpload}>Submit</Button>

      {(
        analysisData && (
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
                {splitIntoSentences(analysisData.missing_values).map((sentence, index) =>
                  <li key={index}>{sentence}</li>
                )}
              </ul>
              {bargraph_sp_miss && (
                <div>
                  <h3>Special Missing Values</h3>
                  <img src={`data:image/png;base64,${bargraph_sp_miss}`} alt="special missing values" />
                </div>
              )}
              {bargraph_nan && (
                <div>
                  <h3>NaN Values</h3>
                  <img src={`data:image/png;base64,${bargraph_nan}`} alt="NaN values" />
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
              <h3 className='data-smells-title'>Duplicate Values</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.duplicates).map((sentence, index) =>
                  <li key={index}>{sentence}</li>
                )}
              </ul>
            </div>
            <button className="download-btn" onClick={handleDownload}>Download Results as PDF</button>
          </div>
        )
      )}
    </div>
  );
}

function splitIntoSentences(text) {
  const sentences = text.split("\n");
  return sentences.filter(sentence => sentence.length > 0);
}