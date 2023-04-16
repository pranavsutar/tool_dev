import React, { useState, useEffect } from "react";
import Codebox from "../Codebox";

function AnalysisDetails(props) {
  const { language, binning_cat_name } = props;

  // use state hooks to store analysisData and bargraph_binning_cat
  const [analysisData, setAnalysisData] = useState(props.analysisData);
  const [bargraph_binning_cat, setBargraphBinningCat] = useState(
    props.bargraph_binning_cat
  );

  // use effect hooks to update analysisData and bargraph_binning_cat when props change
  useEffect(() => {
    setAnalysisData(props.analysisData);
  }, [props.analysisData]);

  useEffect(() => {
    setBargraphBinningCat(props.bargraph_binning_cat);
  }, [props.bargraph_binning_cat]);

  // use state hook to store the sentences
  const [sentences, setSentences] = useState([]);

  // use effect hook to split the text into sentences when analysisData changes
  useEffect(() => {
    function splitIntoSentences(text) {
        const sentences = text.split("\n");
        return sentences.filter((sentence) => sentence.length > 0);
      }

    setSentences(splitIntoSentences(analysisData.binning_cat.Info));
  }, [analysisData]);

  return (
    <div className="analysis-details">
      <h3 className="data-smells-title">{binning_cat_name}</h3>

      <ul className="data-smells-list">
        {sentences.map((sentence, index) => (
          <li key={index}>{sentence}</li>
        ))}
      </ul>
      <Codebox language={language} code={analysisData.binning_cat.Code} />
      {bargraph_binning_cat && (
        <div>
          <h4>{binning_cat_name}</h4>
          <img
            src={`data:image/png;base64,${bargraph_binning_cat}`}
            alt="binning_categorical"
          />
        </div>
      )}
    </div>
  );
}

export default AnalysisDetails;