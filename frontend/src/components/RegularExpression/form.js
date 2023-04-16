import React, { useState } from "react";
import axios from "axios";
import './form.css'

export const RegExForm = () =>{
    const [regex, setRegex] = useState('');
    const [result, setResult] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/regularExp', regex)
        .then(res => {
            //console.log(res);
            console.log(res.data);
        })
    }
    const handleChange = (e) => {
        setRegex(e.target.value);
        setResult('To Be Implemented');
    }
        return (
            <div >
                <h1>Regular Expression Form</h1>
                <form onClick={handleSubmit}>

                    <label>Regular Expression for Row  &nbsp; </label>
                    <input type="text" name="regexrow" className="field" onChange={handleChange}/>
                    {regex}
                    <button type="submit" className="btn">Submit</button>
                    {
                        result ? <p>{result}</p> : null
                    }

                </form>

                <form onClick={handleSubmit}>

                    <label>Regular Expression for Col &nbsp; &nbsp; </label>
                    <input type="text" name="regexcolumn" className="field" onChange={handleChange}/>
                    {regex}
                    <button type="submit" className="btn">Submit</button>
                    {
                        result ? <p>{result}</p> : null
                    }

                </form>

            </div>
        )
}