import * as getData from './getData.js';
import amountOfStaff from './amountOfStaff.js';

async function getStaffPerDay(date) {

    const dayInMonth = getData.getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    month = (month < 10) ? `0${month}` : `${month}`;

    let amountOfDayInMonth = 0;
    const amountOfStaffPerDay = [];
    for (let i = 0; i < dayInMonth; i++) {
        let day = (i < 10) ? `0${i + 1}` : `${i + 1}`;
        const amountOfStaffForOneDay = await amountOfStaff(`${year}-${month}-${day}`);
        if (amountOfStaffForOneDay) {
            amountOfDayInMonth++;
            amountOfStaffPerDay.push(amountOfStaffForOneDay);
        }
    }
    return { "amountOfStaffPerDay": amountOfStaffPerDay, "amountOfDayInMonth": amountOfDayInMonth };
}

export default async function monthlyAveragesForStaff(date) {

    const response = await getStaffPerDay(date);
    const monthlyAmountOfStaff = response.amountOfStaffPerDay.reduce((sum, value) => sum + value, 0);
    return monthlyAmountOfStaff / response.amountOfDayInMonth;
}