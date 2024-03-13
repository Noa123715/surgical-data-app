const { test, expect } = require('@playwright/test');

test('verify daily utilization calculation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // עבור כל צירוף של תאריכים באורך נתון, נבדוק את התוצאה שמחזירה הפונקציה dailyUtilization
    const datesToCheck = ['2024-03-01', '2023-12-30', '2024-01-01'];
    for (const date of datesToCheck) {
        await page.fill('#date-input', date); // מלא את התאריך בטופס הרלוונטי
        await page.click('#submit-button'); // לחץ על כפתור השליחה
        
        // צפייה בערך של התוצאה מתוך האפליקציה
        const result = await page.textContent('.utilization-value');

        // חישוב הערך המצופה
        const expectedValue = calculateExpectedValue(date); // פונקציה שלוקחת את התאריך ומחזירה את הערך המצופה

        expect(result).toBe(expectedValue); // בדיקת הערך המצויין מול הערך המצופ
    }
});

function calculateExpectedValue(date) {
    // קביעת תאריך התחלה ותאריך סיום של התיקונים היומיים
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setSeconds(endOfDay.getSeconds() - 1);

    // סינון התיקונים היומיים לפי טווח התאריכים
    const daySurgery = surgeryData.filter(surgery =>
        new Date(surgery.start) >= startOfDay && new Date(surgery.end) <= endOfDay
    );

    // חישוב השימוש הכולל בדיוק עבור התיקונים היומיים
    const totalMinutes = daySurgery.reduce((total, surgery) => {
        const startTime = new Date(surgery.start);
        const endTime = new Date(surgery.end);
        return total + ((endTime - startTime) / (1000 * 60)); // חישוב השימוש בדקות
    }, 0);

    // חישוב השימוש הכולל בדיוק עבור כל חדר וחישוב האחוז של השימוש היומי בכל חדר
    const totalRoomUsage = new Array(32).fill(0); // מערך לאחסון סך כל זמן השימוש בדקות לכל חדר
    const roomUtilizationPercentage = new Array(32).fill(0); // מערך לאחסון אחוז שימוש בכל חדר
    daySurgery.forEach(surgery => {
        const roomIndex = parseInt(surgery.room_id.slice(3)) - 1; // אינדקס החדר במערך, המרה למספר חדר מספרי לאינדקס
        const startTime = new Date(surgery.start);
        const endTime = new Date(surgery.end);
        totalRoomUsage[roomIndex] += (endTime - startTime) / (1000 * 60); // חישוב השימוש בדקות לכל חדר
    });
    totalRoomUsage.forEach((usage, index) => {
        roomUtilizationPercentage[index] = usage / totalMinutes; // חישוב האחוז של השימוש היומי בכל חדר
    });

    // החזרת האחוז של השימוש בכל חדר
    return roomUtilizationPercentage;
}
