/**
 * Calculates the amount of staff needed for a given date based on surgery data.
 *
 * @param {String} date - The date for which to calculate the amount of staff.
 * @returns {Number} The total amount of staff needed for the given date.
 */
import * as getData from "./getData.js";

export default async function amountOfStaff(date) {
    try {
        // Get the daily surgery data for the date
        const daySurgery = await getData.getDailySurgery(date);
        // If there is no surgery data for the date, throw an error
        if (daySurgery.length === 0) throw new Error("There is no surgery's data for this date.");
        // Extract the staff from the surgery data and remove duplicates
        let staff = daySurgery.map(surgery => surgery.staff).flat();
        staff = [...new Set(staff)];
        // Return the total amount of staff needed
        return staff.length;
    } catch (error) {
        // If an error occurs, log the error message and return 0
        console.log(error.message);
        return 0;
    }
}
