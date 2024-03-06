import express from 'express';
const router = express.Router();
import dailyUtilizationService from './dailyUtilizationService.js';

router.get('/:date', async (req, res) => {
    console.log("hello");
    let result = await dailyUtilizationService(req.params.date);
    res.json(result);
});

export default router;