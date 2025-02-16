// adminTestRoutes.js
const express = require('express');

module.exports = (db, authenticateToken) => {
    const router = express.Router();

    // Middleware для проверки роли администратора
    const isAdmin = (req, res, next) => {
        console.log('Checking admin role:', req.user);
        if (!req.user || req.user.role !== 'admin') {
            console.log('Access denied: user is not admin');
            return res.status(403).json({ error: 'Access denied: Admin only' });
        }
        console.log('Admin access granted');
        next();
    };

    // Применяем middleware
    router.use(authenticateToken);
    router.use(isAdmin);

    // Получение всех тестов
    router.get('/tests', async (req, res) => {
        console.log('=== Getting all tests ===');
        try {
            console.log('Executing SELECT query...');
            const [tests] = await db.query(
                'SELECT id, category, question, options FROM Tests ORDER BY category, id'
            );
            
            console.log('Raw tests data:', tests);

            // Преобразуем options из JSON в массив
            const formattedTests = tests.map(test => {
                try {
                    const options = typeof test.options === 'string' 
                        ? JSON.parse(test.options) 
                        : test.options;
                    
                    return {
                        id: test.id,
                        category: test.category,
                        question: test.question,
                        options: options
                    };
                } catch (error) {
                    console.error(`Error parsing options for test ${test.id}:`, error);
                    return {
                        ...test,
                        options: []
                    };
                }
            });

            console.log('Formatted tests:', formattedTests);
            res.json(formattedTests);
        } catch (error) {
            console.error('Error fetching tests:', error);
            res.status(500).json({ 
                error: 'Failed to fetch tests',
                details: error.message 
            });
        }
    });
    // Добавление нового теста
    router.post('/tests', async (req, res) => {
        try {
            const { category, question, options } = req.body;

            if (!category || !question || !options || !Array.isArray(options)) {
                return res.status(400).json({ error: 'Invalid test data' });
            }

            const [result] = await db.query(
                'INSERT INTO Tests (category, question, options) VALUES (?, ?, ?)',
                [category, question, JSON.stringify(options)]
            );

            res.status(201).json({
                id: result.insertId,
                message: 'Test created successfully'
            });
        } catch (error) {
            console.error('Error creating test:', error);
            res.status(500).json({ error: 'Failed to create test' });
        }
    });

    // Обновление теста
    router.put('/tests/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { category, question, options } = req.body;

            if (!category || !question || !options || !Array.isArray(options)) {
                return res.status(400).json({ error: 'Invalid test data' });
            }

            const [result] = await db.query(
                'UPDATE Tests SET category = ?, question = ?, options = ? WHERE id = ?',
                [category, question, JSON.stringify(options), id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Test not found' });
            }

            res.json({ message: 'Test updated successfully' });
        } catch (error) {
            console.error('Error updating test:', error);
            res.status(500).json({ error: 'Failed to update test' });
        }
    });

    // Удаление теста
    router.delete('/tests/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [result] = await db.query('DELETE FROM Tests WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Test not found' });
            }

            res.json({ message: 'Test deleted successfully' });
        } catch (error) {
            console.error('Error deleting test:', error);
            res.status(500).json({ error: 'Failed to delete test' });
        }
    });

    return router;
};