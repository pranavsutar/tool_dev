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
  "Mgo+DSMBaFt/QHRqVVhlX1pAaVddX2NLfUN3R2lcelRydUU3HVdTRHRcQl5jQH5SdERhX3xfdnE=;Mgo+DSMBPh8sVXJ0S0J+XE9BdVRGQmtWfFN0RnNYfVR1cV9EYUwgOX1dQl9gSX1Tf0ViW35cdndWRWU=;ORg4AjUWIQA/Gnt2VVhkQlFac1xJWXxBYVF2R2BJflx6cVBMYl1BNQtUQF1hSn5QdkxjWH1fcnJWQmhZ;MTI4NTU4NUAzMjMwMmUzNDJlMzBHTlpvRnpTUEZSVGd0Vmw4cnJTOFd0NUpoRGNJY0t1RkdYMUtwRERKUDlRPQ==;MTI4NTU4NkAzMjMwMmUzNDJlMzBvRC9id3daRTQ3dXp0NmpmNXBuZENmeUxNRDZhaFhTSzBOSTFQT0VVdmRrPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFpBVmdWdkx0RWFab19yflBDal5QVAciSV9jS31TdUVqWX5ccXZTQmNaVA==;MTI4NTU4OEAzMjMwMmUzNDJlMzBVc3BERkM0dDY5QnhRUk9jWmFSNk5CNGovNlJmUU1HSmEvOEt6TGdjZHNzPQ==;MTI4NTU4OUAzMjMwMmUzNDJlMzBrRUYxcEFvUVIyZitSWFN1ZDcvMWM1cTJrZytFSnlNVTcyeGc0dG5TZ2VFPQ==;Mgo+DSMBMAY9C3t2VVhkQlFac1xJWXxBYVF2R2BJflx6cVBMYl1BNQtUQF1hSn5QdkxjWH1fcnJQQ2BZ;MTI4NTU5MUAzMjMwMmUzNDJlMzBKVDVURDJzdmpHSi84cG9LQWtqRk80Znh5WWpOV0UyY21EbGVXZlY0UzA0PQ==;MTI4NTU5MkAzMjMwMmUzNDJlMzBaa1oyTXNNSWRjNkg3eGhUOWxOcGJwbGRKZ0FFV0NiZVJISFRhTDVlakpvPQ==;MTI4NTU5M0AzMjMwMmUzNDJlMzBVc3BERkM0dDY5QnhRUk9jWmFSNk5CNGovNlJmUU1HSmEvOEt6TGdjZHNzPQ=="
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
