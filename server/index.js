import express, {json, urlencoded} from 'express';

const app = express();
const port = 8080;

import monthlyAveragesForStaff from './routes.js';

app.use(json());
app.use(urlencoded({extended: true, }));

import cors from 'cors';
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use("/api/monthlyAveragesForStaff", monthlyAveragesForStaff);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
