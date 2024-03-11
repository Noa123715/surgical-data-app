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
        <div className="landingPage">
            <h1 className="item">Hello to Surgical Data 🏥</h1>
            <label className="item" htmlFor='date'>Please enter the date for which you want to receive information</label>
            <input className="item" type="date" id="date" name="date" onChange={change} required />
            <button className="item" onClick={toSubmit}>submit</button>
        </div>
    )
}