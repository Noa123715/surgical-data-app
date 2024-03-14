/**
 * Calculates various metrics related to utilization and staff based on a specific date.
 *
 * @param date - The date for which to calculate the metrics.
 * @returns An object containing the calculated metrics or null values if data is not available.
 */
import dailyUtilization from './dailyUtilization.js';
import monthlyAverageUtilization from './monthlyAverageUtilization.js';
import amountOfStaff from './amountOfStaff.js';
import monthlyAveragesForStaff from './monthlyAveragesForStaff.js';

export default async function metrics(date) {
    try {
        // Calculate daily utilization
        const daily_utilization = await dailyUtilization(date);
        console.log(daily_utilization);
        if (!daily_utilization) throw new Error("There is no daily utilization data.");

        // Calculate monthly utilization average
        const utilizationAverage = await monthlyAverageUtilization(date);
        console.log(utilizationAverage);
        if (!utilizationAverage) throw new Error("There is no month utilization's Average data.");

        // Calculate amount of staff
        const amountStaff = await amountOfStaff(date);
        if (amountStaff === 0) throw new Error("There is no staff this day.");

        // Calculate monthly staff average
        const staffAverage = await monthlyAveragesForStaff(date);
        if (staffAverage === 0) throw new Error("There is no month staff's Average data.");

        // Return the calculated metrics
        return {
            "dailyUtilization": daily_utilization,
            "utilizationAverage": utilizationAverage,
            "amountOfStaff": amountStaff,
            "staffAverage": staffAverage
        }
    } catch (error) {
        // Log and return null values if an error occurs
        console.log(error.message);
        return {
            "dailyUtilization": null,
            "utilizationAverage": null,
            "amountOfStaff": null,
            "staffAverage": null
        }
    }
}
