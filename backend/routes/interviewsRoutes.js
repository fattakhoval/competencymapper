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
            const [interviews] = await req.db.query('SELECT * FROM Interviews');
            console.log('Interviews fetched:', interviews);
            res.status(200).json(interviews);
        } catch (err) {
            console.error('Error fetching interviews:', err); // Логируем ошибку
            res.status(500).json({ error: 'Failed to fetch interviews' });
        }
    });

    // Создание нового интервью
    // Создание нового интервью
    router.post('/', async (req, res) => {
        const { candidate, position, date, notes } = req.body;
        console.log('Creating interview with data:', req.body);  // Логируем данные

        // Преобразуем дату в нужный формат
        const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        try {
            const [result] = await req.db.query(
                'INSERT INTO Interviews (candidate, position, date, notes) VALUES (?, ?, ?, ?)',
                [candidate, position, formattedDate, notes]  // Используем преобразованную дату
            );
            console.log('Interview created, ID:', result.insertId);
            res.status(201).json({ id: result.insertId, ...req.body });
        } catch (err) {
            console.error('Error creating interview:', err);  // Логируем ошибку
            res.status(500).json({ error: 'Failed to create interview' });
        }
    });


    // Обновление статуса интервью
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            await req.db.query('UPDATE Interviews SET status = ? WHERE id = ?', [status, id]);
            res.status(200).json({ message: 'Interview updated successfully' });
        } catch (err) {
            console.error('Error updating interview:', err);
            res.status(500).json({ error: 'Failed to update interview' });
        }
    });

    // Удаление интервью
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            await req.db.query('DELETE FROM Interviews WHERE id = ?', [id]);
            res.status(200).json({ message: 'Interview deleted successfully' });
        } catch (err) {
            console.error('Error deleting interview:', err);
            res.status(500).json({ error: 'Failed to delete interview' });
        }
    });

    return router;
};
