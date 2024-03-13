import dailyUtilization from './dailyUtilization.js';
import monthlyAverageUtilization from './monthlyAverageUtilization.js';
import amountOfStaff from './amountOfStaff.js';
import monthlyAveragesForStaff from './monthlyAveragesForStaff.js';

export default async function metrics(date) {
    try {
        const daily_utilization = await dailyUtilization(date);
        console.log(daily_utilization);
        if (!daily_utilization) throw new Error("There is no daily utilization data.");
        const utilizationAverage = await monthlyAverageUtilization(date);
        console.log(utilizationAverage);
        if (!utilizationAverage) throw new Error("There is no month utilization's Average data.");
        const amountStaff = await amountOfStaff(date);
        if (amountStaff === 0) throw new Error("There is no staff this day.");
        const staffAverage = await monthlyAveragesForStaff(date);
        if (staffAverage === 0) throw new Error("There is no month staff's Average data.");
        return {
            "dailyUtilization": daily_utilization,
            "utilizationAverage": utilizationAverage,
            "amountOfStaff": amountStaff,
            "staffAverage": staffAverage
        }
    } catch (error) {
        console.log(error.message);
        return {
            "dailyUtilization": null,
            "utilizationAverage": null,
            "amountOfStaff": null,
            "staffAverage": null
        }
    }
}