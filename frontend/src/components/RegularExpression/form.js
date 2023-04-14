import React, { useState } from "react";
import axios from "axios";

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
    }
        return (
            <div>
                <h1>Regular Expression Form</h1>
                <form onClick={handleSubmit}>
                    <label>Regular Expression</label>
                    <input type="text" name="regex" onChange={handleChange}/>
                    {regex}
                    <button type="submit">Submit</button>
                    {
                        result ? <p>{result}</p> : null
                    }
                </form>
            </div>
        )
}