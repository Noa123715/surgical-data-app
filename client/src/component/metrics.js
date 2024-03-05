import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function Metrics(props) {

    const date = props.date;

    async function getTheAllTheData(props) {
        try {
            let response = await fetch(`http://localhost:8080/api/schedule/${teacherId}/${courseId}`);
            response = await response.json();
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <h1>{`Information for the date: ${date}`}</h1>
        </>
    )
}