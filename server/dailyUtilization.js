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
        // Calculates the total time in minutes between start and end dates for each surgery
        const diffInMs = ends[i].getTime() - starts[i].getTime();
        const sumTime = Math.floor(diffInMs / (1000 * 60));
        timesPerSurgery.push(sumTime);
    }

    return timesPerSurgery;
}

/**
 * Calculates the daily utilization percentage for each surgery room based on surgery data for a given date.
 *
 * @param {String} date - The date for which to calculate the daily utilization.
 * @returns {Array[Array]} An array containing the daily utilization percentage for each surgery room.
 *          Returns null if there is no surgery data for the given date.
 */
export default async function dailyUtilization(date) {
    try {
        // Get the daily surgery data for the date
        const daySurgery = await getData.getDailySurgery(date);
        // If there is no surgery data for the date, throw an error
        if (daySurgery.length === 0) throw new Error("There is no surgery's data for this day.");

        // Calculate the total time used per surgery room
        const surgeryPerRoom = getData.getSurgeryPerRoom(daySurgery);
        const usedTotalTimesPerRoom = surgeryPerRoom.map(room => {
            const a = totalTime(getStartDate(room), getEndDate(room));
            return a.reduce((sum, time) => sum + time, 0);
        });

        // Calculate the earliest start and latest end times per surgery room
        const earliestStarts = surgeryPerRoom.map(room => {
            return room.reduce((earliest, current) => new Date(current.start).getTime() < new Date(earliest.start).getTime() ? current : earliest, room[0]);
        });
        const latestEnds = surgeryPerRoom.map(room => {
            return room.reduce((latest, current) => new Date(current.end).getTime() > new Date(latest.end).getTime() ? current : latest, room[0]);
        });

        // Calculate the total time available per surgery room
        const allTimePerRoom = totalTime(getStartDate(earliestStarts), getEndDate(latestEnds));

        // Calculate the percentage of usage for each surgery room
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
        // If an error occurs, log the error message and return null
        console.log(error.message);
        return null;
    }
}
