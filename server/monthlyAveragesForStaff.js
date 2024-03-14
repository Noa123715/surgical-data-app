import * as getData from './getData.js';
import amountOfStaff from './amountOfStaff.js';

async function getStaffPerDay(date) {
    // calculate amount of staff to all the day in the month to calculate the average
    const dayInMonth = getData.getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    // if the number is less than 10, add a 0 in front of it to have a number with 2 digits
    month = (month < 10) ? `0${month}` : `${month}`;

    try {
        let amountOfDayInMonth = 0;
        const amountOfStaffPerDay = [];
        for (let i = 0; i < dayInMonth; i++) {
            // Showing all the days of the month
            let day = (i < 10) ? `0${i + 1}` : `${i + 1}`;
            const amountOfStaffForOneDay = await amountOfStaff(`${year}-${month}-${day}`);
            if (amountOfStaffForOneDay) {
                // if the day have data, add it to the calculation of the average
                amountOfDayInMonth++;
                amountOfStaffPerDay.push(amountOfStaffForOneDay);
            }
        }
        // there is no day in this month to calculate
        if (amountOfDayInMonth === 0) throw new Error("There is no day in this month to calculate")
        return { "amountOfStaffPerDay": amountOfStaffPerDay, "amountOfDayInMonth": amountOfDayInMonth };
    } catch (error) {
        console.log(error.message);
        return { "amountOfStaffPerDay": null, "amountOfDayInMonth": 0 };
    }

}

/**
 * Calculate the monthly averages for staff based on the given date.
 *
 * @param date - The date for which to calculate the average
 * @return - The average staff for the month
 */
export default async function monthlyAveragesForStaff(date) {

    try {
        // get the amonut of all the days in this month to calculate the average
        const response = await getStaffPerDay(date);
        // check if there data for this month if there no data throw an error
        if (response.amountOfDayInMonth === 0) throw new Error('There no day in this month to calculate');
        // sum the amount of staff
        const monthlyAmountOfStaff = response.amountOfStaffPerDay.reduce((sum, value) => sum + value, 0);
        // calculate the average
        return monthlyAmountOfStaff / response.amountOfDayInMonth;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
}