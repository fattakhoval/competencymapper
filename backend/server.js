const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken'); // Подключаем библиотеку для работы с JWT
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Настройка соединения с базой данных
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Добавляем db в app.locals
app.locals.db = db;

// Проверка соединения с базой данных
db.getConnection()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Error connecting to the database', err));

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user; // Сохраняем информацию о пользователе в запросе
        next();
    });
};

// Подключение маршрутов
const userRoutes = require('./routes/userRoutes')(db, jwt);
app.use('/api/users', userRoutes);

const interviewRoutes = require('./routes/interviewsRoutes')(db, authenticateToken);
app.use('/api/interviews', interviewRoutes);

const feedbackRoutes = require('./routes/feedbackRoutes')(db, authenticateToken);
app.use('/api/feedback', feedbackRoutes);

// Сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));