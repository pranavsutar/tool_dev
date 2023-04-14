import "./excel.css";
import {
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-spreadsheet";



// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt+QHFqVkNrWU5NaV1CX2BZe1l1TWlYe04BCV5EYF5SRHJfS11mSnZSfkNnWX0=;Mgo+DSMBPh8sVXJ1S0d+X1RPc0BLQmFJfFBmQGlad1RxcEU3HVdTRHRcQlljQH5WdU1iUXlYcHY=;ORg4AjUWIQA/Gnt2VFhhQlJBfVpdVHxLflF1VWZTfFZ6dVFWESFaRnZdQV1nSXdTc0ZrWHdYeHRX;MTY2MjQzM0AzMjMxMmUzMTJlMzMzNVh1YWwzdjR1RmJqc1Q3K24vb21DZkJvNlVnbWhubklOZlJWYVgxNVpmM1k9;MTY2MjQzNEAzMjMxMmUzMTJlMzMzNUxpMHVsVjVZQU5INzZ3RmZPb2dWZi9CUG1mZ3BRaVdETVUrK2x6WHU5Wmc9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RHQmpWfFN0RnNcdV14flRCcC0sT3RfQF5jTX5adkBgUX5Wd3NVRA==;MTY2MjQzNkAzMjMxMmUzMTJlMzMzNU5yRzF1bElIU3o5NDFlMEJ6ZVpXZVU1ZnJuQ2RXckNwMGNvWmhaNm5RQ3M9;MTY2MjQzN0AzMjMxMmUzMTJlMzMzNVpzOEszZFk5ODhrakpWbzVOdGxiMHNZdWRsOHJSVkxtU1ZTdHBtamhRNnc9;Mgo+DSMBMAY9C3t2VFhhQlJBfVpdVHxLflF1VWZTfFZ6dVFWESFaRnZdQV1nSXdTc0ZrWHdWdHdX;MTY2MjQzOUAzMjMxMmUzMTJlMzMzNVh6UHlQa2IzMzNuNlp0K1JjVkVwR0J5d2h2TFZlZTVvNUxMRTF5dXo3MGM9;MTY2MjQ0MEAzMjMxMmUzMTJlMzMzNUYvQUlKSmFYcTgwZzFSM21UaFZsOFVvRDNYQlMxOWZxZFE0V245QjNYZW89;MTY2MjQ0MUAzMjMxMmUzMTJlMzMzNU5yRzF1bElIU3o5NDFlMEJ6ZVpXZVU1ZnJuQ2RXckNwMGNvWmhaNm5RQ3M9"
);

function Excel(props) {

  return (
    <div className="Sheet">
      <SpreadsheetComponent
        allowOpen={true}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
      >
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={props.myjson}></RangeDirective>
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

export default Excel;
