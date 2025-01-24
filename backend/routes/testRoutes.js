const express = require('express');
const jwt = require('jsonwebtoken');

// backend/routes/testRoutes.js

module.exports = (db, authenticateToken) => {
    const router = express.Router();

    // Middleware для проверки токена
    router.use(authenticateToken);

    // Получение результатов теста
    router.get('/', async (req, res) => {
        try {
            const userId = req.user.id;
            const [results] = await db.query(
                'SELECT score, completedAt FROM TestResults WHERE userId = ? ORDER BY completedAt DESC',
                [userId]
            );
            res.status(200).json(results);
        } catch (error) {
            console.error('Error retrieving test results:', error);
            res.status(500).json({ error: 'Failed to retrieve test results' });
        }
    });

    // Сохранение результата теста
    router.post('/', async (req, res) => {
        try {
            const userId = req.user.id;
            const { score } = req.body;

            if (!score) {
                return res.status(400).json({ error: 'Score is required' });
            }

            const [result] = await db.query(
                'INSERT INTO TestResults (userId, score, completedAt) VALUES (?, ?, NOW())',
                [userId, score]
            );

            res.status(201).json({
                message: 'Test result saved successfully',
                resultId: result.insertId,
            });
        } catch (error) {
            console.error('Error saving test result:', error);
            res.status(500).json({ error: 'Failed to save test result' });
        }
    });

    return router;
};
