import fs from 'fs';

const filePath = 'operations_data.json';
const february = 2;

export async function readJson() {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err);
    }
}

export async function getDailySurgery(date) {
    const allData = await readJson();
    return allData.filter((surgery) => surgery.start.split('T')[0] == date);
}

export function getSurgeryPerRoom(daySurgery) {
    const surgeryPerRoom = [[], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [],
    [], []];

    daySurgery.forEach(surgery => {
        switch (surgery.room_id) {
            case "OR-1":
                surgeryPerRoom[0].push(surgery);
                break;
            case "OR-2":
                surgeryPerRoom[1].push(surgery);
                break;
            case "OR-3":
                surgeryPerRoom[2].push(surgery);
                break;
            case "OR-4":
                surgeryPerRoom[3].push(surgery);
                break;
            case "OR-5":
                surgeryPerRoom[4].push(surgery);
                break;
            case "OR-6":
                surgeryPerRoom[5].push(surgery);
                break;
            case "OR-7":
                surgeryPerRoom[6].push(surgery);
                break;
            case "OR-8":
                surgeryPerRoom[7].push(surgery);
                break;
            case "OR-9":
                surgeryPerRoom[8].push(surgery);
                break;
            case "OR-10":
                surgeryPerRoom[9].push(surgery);
                break;
            case "OR-11":
                surgeryPerRoom[10].push(surgery);
                break;
            case "OR-12":
                surgeryPerRoom[11].push(surgery);
                break;
            case "OR-13":
                surgeryPerRoom[12].push(surgery);
                break;
            case "OR-14":
                surgeryPerRoom[13].push(surgery);
                break;
            case "OR-15":
                surgeryPerRoom[14].push(surgery);
                break;
            case "OR-16":
                surgeryPerRoom[15].push(surgery);
                break;
            case "OR-17":
                surgeryPerRoom[16].push(surgery);
                break;
            case "OR-18":
                surgeryPerRoom[17].push(surgery);
                break;
            case "OR-19":
                surgeryPerRoom[18].push(surgery);
                break;
            case "OR-20":
                surgeryPerRoom[19].push(surgery);
                break;
            case "OR-21":
                surgeryPerRoom[20].push(surgery);
                break;
            case "OR-22":
                surgeryPerRoom[21].push(surgery);
                break;
            case "OR-23":
                surgeryPerRoom[22].push(surgery);
                break;
            case "OR-24":
                surgeryPerRoom[23].push(surgery);
                break;
            case "OR-25":
                surgeryPerRoom[24].push(surgery);
                break;
            case "OR-26":
                surgeryPerRoom[25].push(surgery);
                break;
            case "OR-27":
                surgeryPerRoom[26].push(surgery);
                break;
            case "OR-28":
                surgeryPerRoom[27].push(surgery);
                break;
            case "OR-29":
                surgeryPerRoom[28].push(surgery);
                break;
            case "OR-30":
                surgeryPerRoom[29].push(surgery);
                break;
            case "OR-31":
                surgeryPerRoom[30].push(surgery);
                break;
            case "OR-32":
                surgeryPerRoom[31].push(surgery);
                break;
            default:
                console.log("cann't found the specifiec room");
                break;
        }
    });
    return surgeryPerRoom;
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(date) {
    const year = new Date(date).getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDayInMonth(date) {
    let month = new Date(date).getMonth(); // return the number of the month -1
    if (isLeapYear(date) && month + 1 === february) {
        return daysInMonth[month] + 1;
    }
    return daysInMonth[month];
}

/* 
function getSurgeryPerRoom(daySurgery) {
    const surgeryPerRoom = { data: [], size: 0 }; // Initialize dynamic array
    daySurgery.forEach(surgery => {
        const roomIndex = surgery.room_id.slice(2); // Extract room number (assuming "OR-" prefix)
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

        //// Initialize empty arrays for existing rooms (avoiding potential undefined values)
        //for (let i = 0; i < surgeryPerRoom.size; i++) {
        //  if (!surgeryPerRoom.data[i]) {
        //    surgeryPerRoom.data[i] = [];
        //  }
        //}

    return surgeryPerRoom.data;
} 
*/