import { getStartDate, getEndDate } from "./getdata.js";

async function returnOnlyTime(date) {

}

export default function dailyUtilization() {

    const starts = getStartDate();
    const ends = getEndDate();

    const totalTimes = [];

    for (let i = 0; i < starts.length; i++) {
        const startTime = new Date(starts[i]);
        const endTime = new Date(ends[i]);

        const diffInMs = endTime.getTime() - startTime.getTime();
        const totalTimeInMinutes = Math.floor(diffInMs / (1000 * 60));

        totalTimes.push(totalTimeInMinutes);
    }
}