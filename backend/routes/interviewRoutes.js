const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Получить все собеседования
router.get('/', async (req, res) => {
    try {
        const interviews = await Interviews.findAll();
        res.json(interviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Создать новое собеседование
router.post('/', async (req, res) => {
    try {
        const { candidate, position, date, notes } = req.body;
        const interview = await Interviews.create({ candidate, position, date, notes });
        res.status(201).json(interview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
