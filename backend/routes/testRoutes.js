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
    
            // Преобразуем JSON-строку обратно в объект, если это необходимо
            const parsedResults = results.map(result => ({
                ...result,
                score: JSON.parse(result.score),
            }));
    
            res.status(200).json(parsedResults);
        } catch (error) {
            console.error('Error retrieving test results:', error);
            res.status(500).json({ error: 'Failed to retrieve test results' });
        }
    });

    // Сохранение результата теста
    router.post('/', async (req, res) => {
        console.log("Request body:", req.body);
        console.log("Decoded user ID from token:", req.user?.id);
      
        try {
          // Проверяем, что пользователь авторизован
          if (!req.user || !req.user.id) {
            console.error("User not authenticated");
            return res.status(400).json({ error: 'User not authenticated' });
          }
      
          const userId = req.user.id;
          const { results } = req.body;
      
          // Проверяем, что results является объектом
          if (!results || typeof results !== 'object' || Array.isArray(results)) {
            console.error("Invalid results format:", results);
            return res.status(400).json({ error: 'Results must be a valid object' });
          }
      
          // Преобразуем результаты в JSON
          const resultsJson = JSON.stringify(results);
      
          // Выполняем запрос к базе данных
          const [result] = await db.query(
            'INSERT INTO TestResults (userId, score, completedAt) VALUES (?, ?, NOW())',
            [userId, resultsJson]
          );
      
          // Успешный ответ
          res.status(201).json({
            message: 'Test result saved successfully',
            resultId: result.insertId,
          });
        } catch (error) {
          // Логируем ошибку
          console.error("Error saving test result:", error);
          res.status(500).json({ error: 'Failed to save test result' });
        }
      });
      


    return router;
};
