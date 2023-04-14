import React from "react";
import { useState } from "react";
import "./excel.css";

import {
  ColumnDirective,
  ColumnsDirective,
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
} from "@syncfusion/ej2-react-spreadsheet";

import Papa from "papaparse";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt+QHFqVkNrWU5FckBAXWFKblJ8RWZTelpgBShNYlxTR3ZbQ1ljSH5Wc0BgUXxW;Mgo+DSMBPh8sVXJ1S0d+X1RPc0BDWXxLflF1VWJTf1t6cVFWESFaRnZdQV1nSHpTd0VmXHpacXJd;ORg4AjUWIQA/Gnt2VFhhQlJBfVpdXGdWfFN0RnNYdV51flBCcC0sT3RfQF5jTX9XdkRjXHpbdHJWTg==;MTcyMDE5MUAzMjMxMmUzMTJlMzMzNUFvbDJNM3J4cExNckl0akFzNHBEM1dEWkNpTWRQWHUvL2l6VitudllBbDA9;MTcyMDE5MkAzMjMxMmUzMTJlMzMzNVF0L3dJZlRkUW0rVWJFdTc4SGNzRFpmMW1GMnJ5U2o3dnN6YmMvRit2Zmc9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RHQmJNYVF2R2BJflRwcV9DZEwgOX1dQl9gSXpSckViWXpbdXxTT2g=;MTcyMDE5NEAzMjMxMmUzMTJlMzMzNUhkTFIrMnVIemtyb0ErWmUzYU5yK1JkUVZ6N0o0NSs1Mm90Q3pJNXNUUE09;MTcyMDE5NUAzMjMxMmUzMTJlMzMzNURtWEVuZGZLV21LM2JBVys4am1HNXV0UDlnaUVSVHF4SWw2MWlnRzY0SGs9;Mgo+DSMBMAY9C3t2VFhhQlJBfVpdXGdWfFN0RnNYdV51flBCcC0sT3RfQF5jTX9XdkRjXHpbeXdTTg==;MTcyMDE5N0AzMjMxMmUzMTJlMzMzNWJETDIwZmV3TUtxckQ2WFJGZjdwSFVIdkhhMGkwdFRqQW85Rm5LeEhER2M9;MTcyMDE5OEAzMjMxMmUzMTJlMzMzNWYvQ08zakxEUkZCTUd2dGtEZmMxcTFudXFnRityWVhsZjl4YzkzYUc4bWs9;MTcyMDE5OUAzMjMxMmUzMTJlMzMzNUhkTFIrMnVIemtyb0ErWmUzYU5yK1JkUVZ6N0o0NSs1Mm90Q3pJNXNUUE09"
);

function Test() {
  const [jsonData, setJsonData] = useState(null);

  const handleCSVfile = (event) => {
    console.log(event);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (result) {
        setJsonData(result.data);
      },
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleCSVfile}
        style={{ display: "block", margin: "10px auto" }}
      />

      <SpreadsheetComponent>
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={jsonData}></RangeDirective>
            </RangesDirective>
            <ColumnsDirective>
              <ColumnDirective width={160}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
}

export default Test;
