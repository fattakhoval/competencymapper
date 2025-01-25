const express = require('express');
const jwt = require('jsonwebtoken');



module.exports = (db, authenticateToken) => {
    const router = express.Router();

    // Middleware для проверки токена
    router.use(authenticateToken);

    // Получение результатов теста
    router.get('/', async (req, res) => {
        try {
            const userId = req.user.id;
            console.log('User ID:', userId);
            
            const [results] = await db.query(
                'SELECT score, completedAt FROM TestResults WHERE userId = ?',
                [userId]
            );
            console.log('DB Results:', results);
            
            res.status(200).json(results);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to retrieve test results' });
        }
    });
    return router;
};
