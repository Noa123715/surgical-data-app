import express from 'express';
const router = express.Router();
import monthlyAveragesForStaff from './monthlyAveragesForStaff.js';

router.get('/:date', async (req, res) => {
    let result = await monthlyAveragesForStaff(req.params.date);
    res.json(result);
});

export default router;