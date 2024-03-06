import * as getData from "./getdata.js";

function getStartDate(surgerys) {
    const starts = surgerys.map(surgery => surgery.start);
    return starts;
}

function getEndDate(surgerys) {
    const ends = surgerys.map(surgery => surgery.end);
    return ends;
}

function calcTotalTime(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);

    const diffInMs = endTime.getTime() - startTime.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}

function totalTime(surgeryPerRoom) {

    const starts = getStartDate(surgeryPerRoom);
    const ends = getEndDate(surgeryPerRoom);

    const timesPerSurgery = [];

    for (let i = 0; i < starts.length; i++) {
        timesPerSurgery.push(calcTotalTime(starts[i], ends[i]));
    }

    return timesPerSurgery.reduce((sum, time) => sum + time, 0);;
}

function getSurgeryPerRoom(daySurgery) {
    /* return [[OR-1],[OR-2],[OR-3],....,[OR-32]] */
}

export async function dailyUtilization(date) {
    const allData = await getData.readJson();
    const daySurgery = allData.filter((surgery) => surgery.start == date);
    const surgeryPerRoom = getSurgeryPerRoom(daySurgery);
    const usedTotalTimesPerRoom = surgeryPerRoom.forEach(room => {
        return totalTime(room)
    });
    const earliestStarts = surgeryPerRoom.forEach(room => {
        return room.reduce((earliest, current) => current < earliest ? current : earliest, room[0]);
    });
    const latestEnds = surgeryPerRoom.forEach(room => {
        return room.reduce((latest, current) => current > latest ? current : latest, room[0]);
    });
}