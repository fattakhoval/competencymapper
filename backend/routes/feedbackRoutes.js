// feedbackRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db, authenticateToken) => {
    router.use(authenticateToken); // Используем middleware для всех маршрутов

    router.get('/', async (req, res) => {
        console.log('Fetching feedback from the database...'); // Лог, чтобы увидеть когда выполняется запрос
        try {
            const [feedback] = await db.query('SELECT * FROM Feedback ORDER BY createdAt DESC');
            console.log('Feedback fetched:', feedback); // Лог данных, которые были получены
            res.json(feedback);
        } catch (err) {
            console.error('Error fetching feedback:', err);
            res.status(500).json({ error: 'Failed to fetch feedback' });
        }
    });

    router.post('/', async (req, res) => {
        const { text, rating } = req.body;
        const userId = req.user.id; // Получаем userId из токена

        if (!text || !rating) {
            return res.status(400).json({ error: 'Text and rating are required' });
        }

        try {
            const result = await db.query('INSERT INTO Feedback (text, rating, userId, createdAt) VALUES (?, ?, ?, NOW())', [text, rating, userId]);
            res.status(201).json({ id: result[0].insertId, text, rating, userId, createdAt: new Date() });
        } catch (err) {
            console.error('Error adding feedback:', err);
            res.status(500).json({ error: 'Failed to add feedback' });
        }
    });

    return router;
};
