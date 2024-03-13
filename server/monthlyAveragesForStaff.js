import * as getData from './getData.js';
import amountOfStaff from './amountOfStaff.js';

async function getStaffPerDay(date) {

    const dayInMonth = getData.getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    month = (month < 10) ? `0${month}` : `${month}`;

    try {
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
        if (amountOfDayInMonth === 0) throw new Error("There is no day in this month to calculate")
        return { "amountOfStaffPerDay": amountOfStaffPerDay, "amountOfDayInMonth": amountOfDayInMonth };
    } catch (error) {
        console.log(error.message);
        return { "amountOfStaffPerDay": null, "amountOfDayInMonth": 0 };
    }

}

export default async function monthlyAveragesForStaff(date) {

    try {
        const response = await getStaffPerDay(date);
        if (response.amountOfDayInMonth === 0) throw new Error('There no day in this month to calculate');
        const monthlyAmountOfStaff = response.amountOfStaffPerDay.reduce((sum, value) => sum + value, 0);
        return monthlyAmountOfStaff / response.amountOfDayInMonth;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
}