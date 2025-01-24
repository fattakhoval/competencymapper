const express = require('express');
const router = express.Router();

// Добавление теста
router.post('/', async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create test' });
    }
});

// Получение всех тестов
router.get('/', async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tests' });
    }
});

module.exports = router;
