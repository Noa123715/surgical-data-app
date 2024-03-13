import * as getData from "./getData.js";

export default async function amountOfStaff(date) {
    try {
        const daySurgery = await getData.getDailySurgery(date);
        if (daySurgery.length === 0) throw new Error("There is no surgery's data for this date.");
        let staff = daySurgery.map(surgery => surgery.staff).flat();
        staff = [...new Set(staff)];
        return staff.length;
    } catch (error) {
        console.log(error.message);
        return 0;
    }
}