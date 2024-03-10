import fs from 'fs';

const filePath = 'operations_data.json';

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
/*
export async function getEndDate() {
    data = await readJson();
    const ends = data.data.map(entry => entry.end);
    return ends;
}

export async function getRoomId() {
    data = await readJson();
    const room_id = data.data.map(entry => entry.room_id);
    return room_id;
}

export async function getStaff() {
    data = await readJson();
    const staff = data.data.map(entry => entry.staff);
    return staff;
}
*/