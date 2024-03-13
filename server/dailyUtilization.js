import * as getData from "./getData.js";


function getStartDate(surgerys) {
    const starts = surgerys.map(surgery => surgery.start);
    return starts.map(dateString => new Date(dateString));
}

function getEndDate(surgerys) {
    const ends = surgerys.map(surgery => surgery.end);
    return ends.map(dateString => new Date(dateString));
}

function totalTime(starts, ends) {

    const timesPerSurgery = [];

    for (let i = 0; i < starts.length; i++) {
        const diffInMs = ends[i].getTime() - starts[i].getTime();
        const sumTime = Math.floor(diffInMs / (1000 * 60));
        timesPerSurgery.push(sumTime);
    }

    return timesPerSurgery;
}

export default async function dailyUtilization(date) {
    try {
        const daySurgery = await getData.getDailySurgery(date);
        if (daySurgery.length === 0) throw new Error("There is no surgery's data for this day.");
        const surgeryPerRoom = getData.getSurgeryPerRoom(daySurgery);
        const usedTotalTimesPerRoom = surgeryPerRoom.map(room => {
            const a = totalTime(getStartDate(room), getEndDate(room));
            return a.reduce((sum, time) => sum + time, 0);
        });
        const earliestStarts = surgeryPerRoom.map(room => {
            return room.reduce((earliest, current) => new Date(current.start).getTime() < new Date(earliest.start).getTime() ? current : earliest, room[0]);
        });
        const latestEnds = surgeryPerRoom.map(room => {
            return room.reduce((latest, current) => new Date(current.end).getTime() > new Date(latest.end).getTime() ? current : latest, room[0]);
        });
        const allTimePerRoom = totalTime(getStartDate(earliestStarts), getEndDate(latestEnds));
        const percentageOfUsage = [];
        for (let i = 0; i < usedTotalTimesPerRoom.length; i++) {
            if (allTimePerRoom[i] === 0) {
                percentageOfUsage.push(0);
            }
            else {
                let percentage = usedTotalTimesPerRoom[i] / allTimePerRoom[i];
                percentage = percentage * 100;
                percentageOfUsage.push(percentage);
            }
        }
        return percentageOfUsage;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}