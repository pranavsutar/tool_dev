import React, { useRef } from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

function CSVJSON() {
  const inputRef = useRef(null);

  const handleFileUpload = () => {
    const file = inputRef.current.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );
      const jsData = `const data = ${JSON.stringify(
        jsonData
      )}; export default data;`;
      const blob = new Blob([jsData], {
        type: "text/javascript;charset=utf-8",
      });
      FileSaver.saveAs(blob, "testdata.js");
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        accept=".csv"
        onChange={handleFileUpload}
        // style={{ display: "none" }}
      />
    </div>
  );
}

export default CSVJSON;
