import express from 'express';
const router = express.Router();
import metrics from './main.js';

// route for getting the metrics
router.get('/:date', async (req, res) => {
    // async function to get the metrics for the given date
    let result = await metrics(req.params.date);
    // return the result
    res.json(result);
});

export default router;