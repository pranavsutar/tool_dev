import React, { useState } from "react";
import axios from "axios";
import './form.css'

export const RegExForm = () =>{
    const [regex, setRegex] = useState('');
    const [colNo,setColNo] = useState(0);
    const [result, setResult] = useState('');
    const [count, setCount] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/regularExp', {
            regex: regex,
            colNo: colNo
        })
        .then(res => {
            //console.log(res);
            setCount(res.data.count);
            console.log(res.data);
        })
    }
    const handleChangeRegex = (e) => {
        setRegex(e.target.value);
    }

    const handleChangeColNum = (e) => {
        setColNo(e.target.value);
    }
        return (
            <div >
                <h1>Regular Expression Form</h1>
                <form onClick={handleSubmit}>

                    <label>Regular Expression for Col &nbsp; </label>
                    <input type="text" name="regexrow" className="field" onChange={handleChangeRegex}/>
                    <input type="text" name="regexrow" className="field" onChange={handleChangeColNum}/>
                    <button type="submit" className="btn">Submit</button>
                    {
                        result ? <p>{result}</p> : null
                    }
                    {
                        count ? <p>Number Of Matches:{count}</p> : null
                    }
                </form>

            </div>
        )
}