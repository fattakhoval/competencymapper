const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
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

// Проверка соединения с базой данных
db.getConnection()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Error connecting to the database', err));

// Маршруты
const userRoutes = require('./routes/userRoutes')(db);
app.use('/api/users', userRoutes);

const interviewRoutes = require('./routes/interviewsRoutes')(db);
app.use('/api/interviews', interviewRoutes);

// Сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
