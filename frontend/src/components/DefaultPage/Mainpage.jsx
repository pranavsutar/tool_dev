import Excel from "../ExcelSheet/Excel";
import { Spinner } from "react-bootstrap";
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import "./Mainpage.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";

import Codebox from "../Codebox";

const language = "python";
export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bargraph_sp_miss, setBargraph_sp_miss] = useState(null);
  const [bargraph_nan, setBargraph_nan] = useState(null);
  const [bargraph_binning_cat, setBargraph_binning_cat] = useState(null);
  const [bargraph_class_imbal, setBargraph_class_imbal] = useState(null);
  // const [bargraph_sp_char, setBargraph_sp_char] = useState(null);
  // const [bargraph_hum_friendly, setBargraph_hum_friendly] = useState(null);
  // const [bargraph_tr_spaces, setBargraph_tr_spaces] = useState(null);
  const bargraph_sp_char = null;
  const bargraph_hum_friendly = null;
  const bargraph_tr_spaces = null;
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
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        setAnalysisData(response.data);
        setHeatmapData(response.data.heatmap);
        setBargraph_sp_miss(response.data.bargraph_sp_miss);
        setBargraph_nan(response.data.bargraph_nan);
        setBoxplot(response.data.outliers.plot);
        setBargraph_binning_cat(response.data.binning_cat.plot);
        setBargraph_class_imbal(response.data.imbalance.plot);
        // setBargraph_sp_char(response.data.sp_char.plot);
        // setBargraph_hum_friendly(response.data.hum_friendly.plot);
        // setBargraph_tr_spaces(response.data.tr_spaces.plot);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDownload = () => {
    setIsLoading(true); // off it when the pdf is downloaded, i.e after the pdf is saved
    const pdf = new jsPDF();
    const resultsContainer = document.getElementById("results-container");
    pdf.fromHTML(resultsContainer, 15, 15);
    // pdf.save('results.pdf');
    // setIsLoading(false);
    // it should be asynchoronous
    pdf
      .save("results.pdf")
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="main_file">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="Intput-and-Btn">
        <input
          type="file"
          name="file"
          accept=".csv"
          // Removed the onChange event handler of csv file
          onChange={handleFileUpload}
          className="input-file"
        />
        <Button
          className="button_1"
          variant="outline-dark"
          onClick={handleUpload}
        >
          {" "}
          Analysis{" "}
        </Button>
      </div>

      {analysisData && (
        <>
          <Excel myjson={jsonData} />
          <div className="results-container">
            <h2 className="analysis-title">Analysis Results</h2>
            <div className="analysis-summary">
              <p>Number of Rows: {analysisData.num_rows}</p>
              <p>Number of Columns: {analysisData.num_cols}</p>
              {
                <p>
                  Column Names:{" "}
                  <p id="Column-Names">
                    {analysisData.column_names.join(", ")}
                  </p>
                </p>
              }
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Special Missing Values</h3>

              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.sp_missing_values.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              <Codebox
                language={language}
                code={analysisData.sp_missing_values.Code}
              />
              {bargraph_sp_miss && (
                <div>
                  <h3>Special Missing Values</h3>
                  <img
                    src={`data:image/png;base64,${bargraph_sp_miss}`}
                    alt="special missing values"
                  />
                </div>
              )}
              <h3> NaN Values</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.sp_missing_values.InfoNan).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              <Codebox
                language={language}
                code={analysisData.sp_missing_values.Code_Nan}
              />
              {bargraph_nan && (
                <div>
                  <h4>NaN Values</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_nan}`}
                    alt="NaN values"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Missing Values</h3>

              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.missing_values.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              <Codebox
                language={language}
                code={analysisData.missing_values.Code}
              />
              {bargraph_nan && (
                <div>
                  <h4> Missing Values</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_nan}`}
                    alt="missing values"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Binning Categorical</h3>

              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.binning_cat.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              <Codebox
                language={language}
                code={analysisData.binning_cat.Code}
              />
              {bargraph_binning_cat && (
                <div>
                  <h4> Binning Categorical</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_binning_cat}`}
                    alt="binning_categorical"
                  />
                </div>
              )}
            </div>
            {/* Class Imbalance */}
            <div className="analysis-details">
              <h3 className="data-smells-title">Class Imbalance</h3>

              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.imbalance.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              {bargraph_class_imbal && (
                <div>
                  <h4> Class Imbalance</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_class_imbal}`}
                    alt="class_imbalance"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Special Characters</h3>

              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.sp_char.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              {bargraph_sp_char && (
                <div>
                  <h4> Special Characters</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_sp_char}`}
                    alt="special_characters"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Human Friendly</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.hum_friendly.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              {bargraph_hum_friendly && (
                <div>
                  <h4> Human Friendly</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_hum_friendly}`}
                    alt="hum_friendly"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Trailing Spaces</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.tr_spaces.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              {bargraph_tr_spaces && (
                <div>
                  <h4> Trailing Spaces</h4>
                  <img
                    src={`data:image/png;base64,${bargraph_tr_spaces}`}
                    alt="tr_spaces"
                  />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Correlated Values</h3>
              <div className="heatmap-container">
                {heatmapData && (
                  <div>
                    <h3>Correlation Heatmap</h3>
                    <img
                      src={`data:image/png;base64,${heatmapData}`}
                      alt="correlation heatmap"
                    />
                  </div>
                )}
                <ul className="data-smells-list">
                  {analysisData.correlated.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Outliers</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.outliers.Info).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
              <Codebox language={language} code={analysisData.outliers.Code} />
              {boxplot && (
                <div>
                  <h4>Boxplot</h4>
                  <img src={`data:image/png;base64,${boxplot}`} alt="boxplot" />
                </div>
              )}
            </div>
            <div className="analysis-details">
              <h3 className="data-smells-title">Duplicate Values</h3>
              <ul className="data-smells-list">
                {splitIntoSentences(analysisData.duplicates).map(
                  (sentence, index) => (
                    <li key={index}>{sentence}</li>
                  )
                )}
              </ul>
            </div>
            <button className="download-btn" onClick={handleDownload}>
              Download Results as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function splitIntoSentences(text) {
  const sentences = text.split("\n");
  return sentences.filter((sentence) => sentence.length > 0);
}
