import express from 'express';
const router = express.Router();
import monthlyAverageUtilization from './monthlyAverageUtilization.js';

router.get('/:date', async (req, res) => {
    let result = await monthlyAverageUtilization(req.params.date);
    res.json(result);
});

export default router;