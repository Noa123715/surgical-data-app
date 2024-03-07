import dailyUtilization from './dailyUtilizationService';

function getPercentageOfUsagePerDay(date) {

    const dayInMonth = 31;
    const year = string(new Date(date).getFullYear());
    const month = string(new Date(date).getMonth());
    const percentageOfUsagePerDay = [];
    for (let i = 0; i < dayInMonth; i++) {
        let day;
        if (i < 10) { day = `0${i}`; }
        else { day = i; }
        const percentageOfUsageForOneDay = dailyUtilization(`${day}-${month}-${year}`);
        //percentageOfUsageForOneDay.every(percentage => percentage === 0);
        // מה לעשות עם זה שלכל כל החודשים הם בדיוק 30 ימים?
        percentageOfUsagePerDay.push(percentageOfUsageForOneDay);
    }
    return percentageOfUsagePerDay;
}

export default async function monthlyAverageUtilization(date) {

    const percentageOfUsagePerDay = getPercentageOfUsagePerDay(date);
    
}