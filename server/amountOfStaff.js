/*import * as getData from "./getData.js";

function getStaffPerRoom(surgerys) {
    let staff = surgerys.map(surgery => surgery.staff);
    //להבין איך המערך בנוי ולהוריד כפילויות
    return staff;
}

export default async function amountOfStaff(date) {
    const daySurgery = await getData.getDailySurgery(date);
    console.log(daySurgery);
    const surgeryPerRoom = getData.getSurgeryPerRoom(daySurgery);
    const staffPerRoom = surgeryPerRoom.map(room => {

    });
    return staffPerRoom;
}
*/