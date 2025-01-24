const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (db) => {
    const router = express.Router();

    // Регистрация
    router.post('/register', async (req, res) => {
        try {
            const { email, password, name, role } = req.body;

            // Проверка на существующий email
            const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({ error: 'Email already in use' });
            }

            // Хеширование пароля и сохранение в БД
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query(
                'INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
                [name, email, hashedPassword, role]
            );

            // Лог успешной регистрации
            console.log(`User registered successfully: ${name}, ${email}`);
            res.status(201).json({ message: 'User registered', userId: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Registration failed' });
        }
    });


    // Авторизация
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;

            // Поиск пользователя в БД
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Генерация токена
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        }
    });

    return router;
};
