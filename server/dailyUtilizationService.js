import * as getData from "./getdata.js";


function getStartDate(surgerys) {
    const starts = surgerys.map(surgery => surgery.start);
    return starts;
}

function getEndDate(surgerys) {
    const ends = surgerys.map(surgery => surgery.end);
    return ends;
}

function totalTime(starts, ends) {

    const timesPerSurgery = [];

    for (let i = 0; i < starts.length; i++) {
        const diffInMs = ends[i].getTime() - starts[i].getTime();
        const sumTime = Math.floor(diffInMs / (1000 * 60));
        timesPerSurgery.push(sumTime);
    }

    return timesPerSurgery.reduce((sum, time) => sum + time, 0);
}

/*
function getSurgeryPerRoom(daySurgery) {
    const surgeryPerRoom = [[], [], [], [], [], [], [], [], [], [], [],
                            [], [], [], [], [], [], [], [], [], [], [],
                            [], [], [], [], [], [], [], [], [], []];
    
    daySurgery.forEach(surgery => {
        switch (surgery.room) {
            case "OR-1":
                surgeryPerRoom[1].push(surgery);
                break;
            case "OR-2":
                surgeryPerRoom[2].push(surgery);
                break;
            case "OR-3":
                surgeryPerRoom[3].push(surgery);
                break;
            case "OR-4":
                surgeryPerRoom[4].push(surgery);
                break;
            case "OR-5":
                surgeryPerRoom[5].push(surgery);
                break;
            case "OR-6":
                surgeryPerRoom[6].push(surgery);
                break;
            case "OR-7":
                surgeryPerRoom[7].push(surgery);
                break;
            case "OR-8":
                surgeryPerRoom[8].push(surgery);
                break;
            case "OR-9":
                surgeryPerRoom[9].push(surgery);
                break;
            case "OR-10":
                surgeryPerRoom[10].push(surgery);
                break;
            case "OR-11":
                surgeryPerRoom[11].push(surgery);
                break;
            case "OR-12":
                surgeryPerRoom[12].push(surgery);
                break;
            case "OR-13":
                surgeryPerRoom[13].push(surgery);
                break;
            case "OR-14":
                surgeryPerRoom[14].push(surgery);
                break;
            case "OR-15":
                surgeryPerRoom[15].push(surgery);
                break;
            case "OR-16":
                surgeryPerRoom[16].push(surgery);
                break;
            case "OR-17":
                surgeryPerRoom[17].push(surgery);
                break;
            case "OR-18":
                surgeryPerRoom[18].push(surgery);
                break;
            case "OR-19":
                surgeryPerRoom[19].push(surgery);
                break;
            case "OR-20":
                surgeryPerRoom[20].push(surgery);
                break;
            case "OR-21":
                surgeryPerRoom[21].push(surgery);
                break;
            case "OR-22":
                surgeryPerRoom[22].push(surgery);
                break;
            case "OR-23":
                surgeryPerRoom[23].push(surgery);
                break;
            case "OR-24":
                surgeryPerRoom[24].push(surgery);
                break;
            case "OR-25":
                surgeryPerRoom[25].push(surgery);
                break;
            case "OR-26":
                surgeryPerRoom[26].push(surgery);
                break;
            case "OR-27":
                surgeryPerRoom[27].push(surgery);
                break;
            case "OR-28":
                surgeryPerRoom[28].push(surgery);
                break;
            case "OR-29":
                surgeryPerRoom[29].push(surgery);
                break;
            case "OR-30":
                surgeryPerRoom[30].push(surgery);
                break;
            case "OR-31":
                surgeryPerRoom[31].push(surgery);
                break;
            case "OR-32":
                surgeryPerRoom[32].push(surgery);
                break;
            default:
                console.log("cann't found the specifiec room");
                break;
        }
    });
    return surgeryPerRoom;
} 
*/
function getSurgeryPerRoom(daySurgery) {
    const surgeryPerRoom = { data: [], size: 0 }; // Initialize dynamic array

    daySurgery.forEach(surgery => {
        const roomIndex = surgery.room.slice(2); // Extract room number (assuming "OR-" prefix)
        const roomNumber = parseInt(roomIndex) - 1; // Convert room number to index (0-based)

        // Check if room already exists in the dynamic array
        if (roomNumber >= surgeryPerRoom.size) {
            // Resize the dynamic array if necessary
            surgeryPerRoom.data.length = roomNumber + 1; // Allocate space for new room
            surgeryPerRoom.size = roomNumber + 1; // Update size
        }

        // Add surgery to the corresponding room
        surgeryPerRoom.data[roomNumber].push(surgery);
    });

    /*
        // Initialize empty arrays for existing rooms (avoiding potential undefined values)
        for (let i = 0; i < surgeryPerRoom.size; i++) {
          if (!surgeryPerRoom.data[i]) {
            surgeryPerRoom.data[i] = [];
          }
        }
    */
    return surgeryPerRoom.data;
}


export default async function dailyUtilization(date) {
    console.log("enter to daily");
    const allData = await getData.readJson();
    const daySurgery = allData.filter((surgery) => surgery.start.split('T')[0] == date);
    const surgeryPerRoom = getSurgeryPerRoom(daySurgery);
    const usedTotalTimesPerRoom = surgeryPerRoom.forEach(room => {
        return totalTime(getStartDate(room), getEndDate(room));
    });
    const earliestStarts = surgeryPerRoom.forEach(room => {
        return room.reduce((earliest, current) => current.start < earliest.start ? current.start : earliest.start, room[0].start);
    });
    const latestEnds = surgeryPerRoom.forEach(room => {
        return room.reduce((latest, current) => current.end > latest.end ? current.end : latest.end, room[0].end);
    });
    const allTimePerRoom = totalTime(getStartDate(earliestStarts), getEndDate(latestEnds));
    const percentageOfUsage = [];
    for (let i = 0; i < starts.length; i++) {
        const percentage = usedTotalTimesPerRoom[i] / allTimePerRoom[i];
        percentageOfUsage.push(percentage);
    }
    return percentageOfUsage;
}
