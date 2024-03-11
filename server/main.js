import dailyUtilization from './dailyUtilization.js';
import monthlyAverageUtilization from './monthlyAverageUtilization.js';
import amountOfStaff from './amountOfStaff.js';
import monthlyAveragesForStaff from './monthlyAveragesForStaff.js';

export default async function metrics(date) {
    const daily_utilization = await dailyUtilization(date);
    const utilizationAverage = await monthlyAverageUtilization(date);
    const amountStaff = await amountOfStaff(date);
    const staffAverage = await monthlyAveragesForStaff(date);

    return {
        "dailyUtilization": daily_utilization,
        "utilizationAverage": utilizationAverage,
        "amountOfStaff": amountStaff,
        "staffAverage": staffAverage
    }
}