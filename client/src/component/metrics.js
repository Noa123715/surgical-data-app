import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MyTable from "./myTable.js";

export default function Metrics(props) {

    const date = props.date;
    const [data, dataState] = useState([]);

    async function getAllTheData(props) {
        try {
            let response = await fetch(`http://localhost:8080/api/getMetrics/${props.date}`);
            response = await response.json();
            dataState(response);
        }
        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getAllTheData(props);
    }, []);


    return (
        <>
            <h1>{`Information for the date: ${date}`}</h1>
            <div>
                <MyTable dailyUtilization={data.dailyUtilization} utilizationAverage={data.utilizationAverage}/>
                <h3>{`Amount of staff for all the rooms: ${data.amountOfStaff}`}</h3>
                <h3>{`Monthly average of staff for all the rooms: ${Math.floor(data.staffAverage)}`}</h3>
            </div>
        </>
    )
}