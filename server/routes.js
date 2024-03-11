import express from 'express';
const router = express.Router();
import amountOfStaff from './amountOfStaff.js';

router.get('/:date', async (req, res) => {
    let result = await amountOfStaff(req.params.date);
    res.json(result);
});

export default router;