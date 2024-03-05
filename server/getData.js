import fs from 'fs';

const filePath = 'operations_data.json';

async function readJson() {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err);
    }
}

export async function getStartDate() {
    data = await readJson();
    const starts = data.data.map(entry => entry.start);
    return starts;
}

async function getEndDate() {
    data = await readJson();
    const ends = data.data.map(entry => entry.end);
    return ends;
}

async function getRoomId() {
    data = await readJson();
    const room_id = data.data.map(entry => entry.room_id);
    return room_id;
}

async function getStaff() {
    data = await readJson();
    const staff = data.data.map(entry => entry.staff);
    return staff;
}
