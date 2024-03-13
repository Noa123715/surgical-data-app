import express from 'express';
const router = express.Router();
import metrics from './main.js';

router.get('/:date', async (req, res) => {
    let result = await metrics(req.params.date);
    res.json(result);
});

export default router;