/**
 * Creates and configures an Express server with middleware and routes.
 */
import express, { json, urlencoded } from 'express';
import metrics from './routes.js';
import cors from 'cors';

const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(json());
// Middleware to parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Route for metrics API
app.use("/api/getMetrics", metrics);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
