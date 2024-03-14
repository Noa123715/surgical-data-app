import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage.js';
import Metrics from './metrics.js';

export default function Main() {

    const [date, dateState] = useState(null);
    const dateToInformation = (value) => {
        dateState(value)
    }

    return (
        <>
            <Routes>
                {/* <Route exact element={<Error />} path='*' /> */}
                <Route exact element={<LandingPage dateToInformation={dateToInformation} date={date}/>} path='/' />
                <Route exact element={<LandingPage dateToInformation={dateToInformation} date={date}/>} path='/landingPage' />
                <Route exact element={<Metrics dateToInformation={dateToInformation} date={date} />} path='/metrics/*' />
            </Routes>
        </>
    )
}