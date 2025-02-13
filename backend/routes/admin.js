const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.use((req, res, next) => {
        req.db = db;
        console.log('Database is set on the request');
        next();
    });

    // Получение интервью с пагинацией
    router.get('/', async (req, res) => {
        console.log('Fetching interviews with pagination...');
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        try {
            // Получаем общее количество записей
            const [totalRows] = await db.query(
                'SELECT COUNT(*) as count FROM Interviews'
            );
            const total = totalRows[0].count;

            // Получаем записи для текущей страницы
            const [interviews] = await db.query(`
                SELECT i.*, u.name as user_name 
                FROM Interviews i 
                LEFT JOIN users u ON i.id_user = u.id
                ORDER BY i.date DESC
                LIMIT ? OFFSET ?
            `, [limit, offset]);

            res.status(200).json({
                interviews,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalInterviews: total
            });
        } catch (err) {
            console.error('Error fetching interviews:', err);
            res.status(500).json({ error: 'Failed to fetch interviews' });
        }
    });

    // Остальные маршруты остаются без изменений
    router.get('/users', async (req, res) => {
        try {
            const [users] = await db.query('SELECT id, name FROM users');
            res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });

    router.post('/', async (req, res) => {
        const { id_user, position, date, notes } = req.body;
        const formattedDate = new Date(date).toISOString().split('T')[0];
    
        try {
            const [result] = await req.db.query(
                'INSERT INTO Interviews (id_user, position, date, notes) VALUES (?, ?, ?, ?)',
                [id_user, position, formattedDate, notes]
            );
            res.status(201).json({ id: result.insertId, ...req.body });
        } catch (err) {
            console.error('Error creating interview:', err);
            res.status(500).json({ error: 'Failed to create interview' });
        }
    });
    // Добавляем новый маршрут для обновления статуса
    router.patch('/:id/status', async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            await db.query(
                'UPDATE Interviews SET status = ? WHERE id = ?',
                [status, id]
            );
            
            // Получаем обновленное интервью
            const [updatedInterview] = await db.query(
                `SELECT i.*, u.name as user_name 
                 FROM Interviews i 
                 LEFT JOIN users u ON i.id_user = u.id 
                 WHERE i.id = ?`,
                [id]
            );

            if (updatedInterview.length === 0) {
                return res.status(404).json({ error: 'Interview not found' });
            }

            res.status(200).json(updatedInterview[0]);
        } catch (err) {
            console.error('Error updating interview status:', err);
            res.status(500).json({ error: 'Failed to update interview status' });
        }
    });

    return router;
};