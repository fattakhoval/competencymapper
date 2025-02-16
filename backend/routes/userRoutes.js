const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (db) => {
    const router = express.Router();

    router.post('/register', async (req, res) => {
        try {
            const { email, password, name, role } = req.body;
            
            const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const defaultRole = 'user'; // Устанавливаем роль по умолчанию
            
            const [result] = await db.query(
                'INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
                [name, email, hashedPassword, defaultRole]
            );
            
            res.status(201).json({ message: 'User registered', userId: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Registration failed' });
        }
    });

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            
            if (rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );
    
            const redirectPath = user.role === 'admin' ? '/admin' : '/';
            
            // Добавляем name в ответ сервера
            res.status(200).json({
                token,
                userId: user.id,
                role: user.role,
                name: user.name, // Добавляем имя пользователя
                redirectTo: redirectPath
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        }
    });
    
    return router;
};