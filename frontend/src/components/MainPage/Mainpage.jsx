import Excel from '../excel/Excel';
import React, { useState } from "react";
import Papa from "papaparse";
import "./Mainpage.css"
import { defaultData } from '../excel/data';



export default function MainPage() {
    const [jsonData, setJsonData] = useState(null);

    const handleCSVfile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: function (result) {
                setJsonData(JSON.stringify(result.data, null, 2));
            },
        });
    };
    return (
        <div>
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={handleCSVfile}
                style={{ display: "block", margin: "10px auto" }}
                className="input-file"
            />

            {/* {jsonData && <pre>{jsonData}</pre>} */}
            {/* {defaultData && <pre>{defaultData}</pre>} */}

            <Excel myjson={jsonData} />
        </div>
    );
}