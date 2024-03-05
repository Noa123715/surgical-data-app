import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function LandingPage(props) {

    let Navigate = useNavigate();

    async function change(e) {
        e.preventDefault();
        const { name, value } = e.target;
        props.dateToInformation(value);
    }

    async function toSubmit(e) {
        try {
            Navigate('/metrics');
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1>hello</h1>
            <label htmlFor='date'>Please enter the date for which you want to receive information</label>
            <input type="date" id="date" name="date" onChange={change} required />
            <button onClick={toSubmit}>submit</button>
        </>
    )
}