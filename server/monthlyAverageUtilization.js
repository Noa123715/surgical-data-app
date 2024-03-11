import dailyUtilization from './dailyUtilizationService.js';

const february = 2;
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(date) {
    const year = new Date(date).getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDayInMonth(date) {
    let month = new Date(date).getMonth(); // return the number of the month -1
    if (isLeapYear(date) && month + 1 === february) {
        return daysInMonth[month] + 1;
    }
    return daysInMonth[month];
}

async function getPercentageOfUsagePerDay(date) {

    const dayInMonth = getDayInMonth(date);
    let year = (new Date(date).getFullYear()).toString();
    let month = (new Date(date).getMonth() + 1).toString();
    month = (month < 10) ? `0${month}` : `${month}`;

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
    return { "percentageOfUsagePerDay": percentageOfUsagePerDay, "amountOfDayInMonth": amountOfDayInMonth };
}

export default async function monthlyAverageUtilization(date) {

    const response = await getPercentageOfUsagePerDay(date);
    const monthlyAverage = [];
    for (let i = 0; i < response.percentageOfUsagePerDay[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < response.percentageOfUsagePerDay.length; j++) {
            sum = sum + response.percentageOfUsagePerDay[j][i];
        }
        monthlyAverage.push(sum / response.amountOfDayInMonth);
    }
    console.log(monthlyAverage);
    return monthlyAverage;
}