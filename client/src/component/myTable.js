import React, { useState, useEffect } from "react";

export default function MyTable(props) {

    const [headers, headersState] = useState([]);

    useEffect(() => {
        headersState(Array.from({ length: 32 }, (_, index) => `Room ${index + 1}`));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Room</th>
                    {headers?.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Daily Utilization</th>
                    {props?.dailyUtilization?.map((value) => (
                        <td>{Number.isInteger(value) ? value.toFixed(0) : value.toFixed(3)}</td>
                    ))}
                </tr>
                <tr>
                    <th>Utilization Average</th>
                    {props?.utilizationAverage?.map((value) => (
                        <td>{Number.isInteger(value) ? value.toFixed(0) : value.toFixed(3)}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}