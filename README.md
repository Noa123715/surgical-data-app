# surgical-data-app
Just before we begin... <br/>
I would like to express my gratitude to all the doctors, nurses, and hospital staff around the world for their dedicated work and for saving so many lives.

# Application Overview
This project is a full-stack web application designed to process and display surgical data. The application ingests data from a file, processes it on the backend, and presents relevant metrics on the frontend. The frontend is built with React, while the backend is powered by Node.js.

# Setup and Installation
To run the application locally, follow these steps:
1. Open your Command Line. (1. Press WinKey + R, 2. Type cmd, 3. Press Enter)
2. Clone the repository from GitHub: 

    ```bash
    git clone https://github.com/Noa123715/surgical-data-app.git
    ```

3. Install dependencies for both the client and server:

    ```bash
    cd client
    ```

    ```bash
    npm install
    ```

    ```bash
    cd ../server
    ```

    ```bash 
    npm install
    ```

4. Start the backend server:

    ```bash
    node index.js &
    ```

5. Start the frontend application:

    ```bash
    cd ../client
    ```

    ```bash
    npm start &
    ```

6. If the browser does not open automatically, navigate to http://localhost:3000 to view the application.

# Usage Instructions
Once the application is running, you can use it to view surgical data.
1. Use the date picker input to select the desired date.
2. Click the "Submit" button to retrieve the data for the selected date.
If data is available for the selected date, it will be displayed as follows:

    A table showing the daily room utilization percentage and the monthly average for each room.
    Total team count for the selected day and the monthly average team count for all rooms combined.

If no data is available for the selected date, you will receive a message indicating that no data is available.

# API Endpoints
The backend server provides the following API endpoints:

    GET /api/getMetrics: Retrieves all surgical data.

# Data Processing and Metrics Calculation
The application processes surgical data to calculate various metrics. This includes aggregating data for daily room utilization, calculating average monthly utilization, and aggregating counts for nurses and anesthesiologists for each day along with their monthly averages.

# Tests
Purpose <br/>
The tests are written in Playwright using TypeScript.<br/>
These tests serve as a scenario for the user interacting with the site and checking if everything works as planned. <br/>
The tests will execute and provide feedback on whether the application is functioning correctly according to the specifications.

# Running the Tests
To run the tests, follow these steps:

- Install dependencies:

    In the terminal write this command:

    ```bash
    cd ../test
    ```

    ```bash
    npm install
    ```

2. Make sure your server and client project is running...

3. 
    ```bash
    npx playwright test --grep "[ change it with the file's name ]"
    ``` 


# Explanation of each test's role:

1. amountOfStaff - Checks that when a date is entered, the number of staff for the day and the monthly average are greater than 0 and are whole numbers, as an operating room cannot function without staff and there are no partial staff members.

2. dailyUtilization - Ensures that the daily utilization percentage is a number within the range of 0 to 100, which is the range for percentages.

3. dialog - Verifies that when no date is entered, nothing happens and the next page is not loaded.

4. monthlyUtilizationAverage - Checks that the average daily utilization percentage is a number within the range of 0 to 100, which is the range for percentages.

5. noDataForThisDate - Checks that for a date without any data, the message "We are Sorry! ..." is displayed.

6. returnToLandingPage - Verifies that the "return to choose another date" button works correctly.

<br/>
<br/>
The application was developed by Noa Abecassis in March 2024. This is the first version of the application.
<br/>

# I hope you enjoy using my application and that it proves to be helpful to many people.