import * as getData from './getData.js';
import dailyUtilization from './dailyUtilization.js';

async function getPercentageOfUsagePerDay(date) {

    const dayInMonth = getData.getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    month = (month < 10) ? `0${month}` : `${month}`;

    try {
        let amountOfDayInMonth = 0;
        const percentageOfUsagePerDay = [];
        for (let i = 0; i < dayInMonth; i++) {
            let day = (i < 10) ? `0${i + 1}` : `${i + 1}`;
            const percentageOfUsageForOneDay = await dailyUtilization(`${year}-${month}-${day}`);
            if (percentageOfUsageForOneDay) {
                amountOfDayInMonth++;
                percentageOfUsagePerDay.push(percentageOfUsageForOneDay);
            }
        }
        if (amountOfDayInMonth === 0) throw new Error('There is no day in this month to calculate');
        return { "percentageOfUsagePerDay": percentageOfUsagePerDay, "amountOfDayInMonth": amountOfDayInMonth };
    } catch (error) {
        console.log(error.message);
        return { "percentageOfUsagePerDay": null, "amountOfDayInMonth": 0 };
    }
}

export default async function monthlyAverageUtilization(date) {

    try {
        const response = await getPercentageOfUsagePerDay(date);
        if (response.amountOfDayInMonth === 0) throw new Error('There is no day to caculate');
        const monthlyAverage = [];
        for (let i = 0; i < response.percentageOfUsagePerDay[0].length; i++) {
            let sum = 0;
            for (let j = 0; j < response.percentageOfUsagePerDay.length; j++) {
                sum = sum + response.percentageOfUsagePerDay[j][i];
            }
            monthlyAverage.push(sum / response.amountOfDayInMonth);
        }
        return monthlyAverage;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}