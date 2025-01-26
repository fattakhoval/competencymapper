const express = require('express');
const router = express.Router();

// Экспорт маршрута с подключением базы данных
module.exports = (db) => {
    router.use((req, res, next) => {
        req.db = db;  // Подключаем пул соединений MySQL
        console.log('Database is set on the request'); // Логируем подключение к базе данных
        next();
    });

    // Получение всех интервью
    router.get('/', async (req, res) => {
        console.log('Fetching interviews...');
        try {
            const [interviews] = await db.query(`
                SELECT i.*, u.name as user_name 
                FROM Interviews i 
                LEFT JOIN users u ON i.id_user = u.id
            `);
            console.log('Fetched interviews:', interviews); // Добавьте для отладки
            res.status(200).json(interviews);
        } catch (err) {
            console.error('Error fetching interviews:', err);
            res.status(500).json({ error: 'Failed to fetch interviews' });
        }
    });
    
    router.get('/users', async (req, res) => {
        try {
            const [users] = await db.query('SELECT id, name FROM users');
            res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    });
    // Создание нового интервью
    router.post('/', async (req, res) => {
        const { id_user, position, date, notes } = req.body;
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Берем только дату
    
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


    return router;
};
