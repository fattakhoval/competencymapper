const express = require('express');
const router = express.Router();

// Пример маршрута
router.get('/', (req, res) => {
    res.send('Feedback routes working!');
});

module.exports = router;
