import express, {json, urlencoded} from "express";
const app = express();
const port = 8080;

app.use(json());
app.use(urlencoded({extended: true, }));

app.use("api/metrics", metrics);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
