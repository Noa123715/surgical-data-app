import * as getData from "./getData.js";

export default async function amountOfStaff(date) {
    const daySurgery = await getData.getDailySurgery(date);
    let staff = daySurgery.map(surgery => surgery.staff).flat();
    staff = [...new Set(staff)];
    return staff.length;
}