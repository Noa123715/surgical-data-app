import * as getData from './getData.js';
import dailyUtilization from './dailyUtilization.js';

async function getPercentageOfUsagePerDay(date) {
    // calculate percentage of use to all the day in the month to calculate the average
    
    const dayInMonth = getData.getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    // if the number is less than 10, add a 0 in front of it to have a number with 2 digits
    month = (month < 10) ? `0${month}` : `${month}`;

    try {
        let amountOfDayInMonth = 0;
        const percentageOfUsagePerDay = [];
        for (let i = 0; i < dayInMonth; i++) {
            // Showing all the days of the month
            let day = (i < 10) ? `0${i + 1}` : `${i + 1}`;
            const percentageOfUsageForOneDay = await dailyUtilization(`${year}-${month}-${day}`);
            if (percentageOfUsageForOneDay) {
                // if the day have data, add it to the calculation of the average
                amountOfDayInMonth++;
                percentageOfUsagePerDay.push(percentageOfUsageForOneDay);
            }
        }
        // there is no day in this month to calculate
        if (amountOfDayInMonth === 0) throw new Error('There is no day in this month to calculate');
        return { "percentageOfUsagePerDay": percentageOfUsagePerDay, "amountOfDayInMonth": amountOfDayInMonth };
    } catch (error) {
        console.log(error.message);
        return { "percentageOfUsagePerDay": null, "amountOfDayInMonth": 0 };
    }
}

/**
 * Calculates the monthly average utilization based on the given date.
 *
 * @param {String} date - The date for which the utilization is calculated
 * @return {Array[Array]} An array containing the monthly average utilization values
 */
export default async function monthlyAverageUtilization(date) {

    try {
        // get the percentage of use of all the days in this month to calculate the average
        const response = await getPercentageOfUsagePerDay(date);
        // check if there data for this month if there no data throw an error
        if (response.amountOfDayInMonth === 0) throw new Error('There is no day to caculate');
        // sum the all the percentage of use per room
        const monthlyAverage = [];
        for (let i = 0; i < response.percentageOfUsagePerDay[0].length; i++) {
            let sum = 0;
            for (let j = 0; j < response.percentageOfUsagePerDay.length; j++) {
                sum = sum + response.percentageOfUsagePerDay[j][i];
            }
            // calculate the average per room
            monthlyAverage.push(sum / response.amountOfDayInMonth);
        }
        return monthlyAverage;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}