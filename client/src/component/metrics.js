import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MyTable from "./myTable.js";

export default function Metrics(props) {

    const date = props.date;
    const [data, dataState] = useState([]);
    let Navigate = useNavigate();

    async function toReturn(e) {
        try {
            props.dateToInformation(null);
            Navigate('/landingPage');
        }
        catch (err) {
            console.log(err);
        }
    }

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
            <h1 className="data"><u>{`Information for: ${date}`}</u></h1>
            <div>
                {data.dailyUtilization && data.utilizationAverage && <MyTable dailyUtilization={data.dailyUtilization} utilizationAverage={data.utilizationAverage} />}
                {data.amountOfStaff &&
                    <div className="data showStaff">
                        <h3>{`Amount of staff for all the rooms: ${data.amountOfStaff}`}</h3>
                        <h3>{`Monthly average of staff for all the rooms: ${Math.floor(data.staffAverage)}`}</h3>
                    </div>
                }
            </div>
            {!data.dailyUtilization &&
                <h3 className="data">
                    We are Sorry! <br />
                    There is no data available for this day.
                </h3>
            }
            <button className="return" onClick={toReturn}>return to choose another date</button>
        </>
    )
}