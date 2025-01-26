const express = require('express');
const router = express.Router();

module.exports = (db, authenticateToken) => {
    router.use(authenticateToken);

    router.get('/', async (req, res) => {
        const userId = req.user.id;
        try {
            const [interviews] = await db.query(`
                SELECT i.*, u.name as user_name 
                FROM Interviews i 
                LEFT JOIN users u ON i.id_user = u.id 
                WHERE i.id_user = ?
            `, [userId]);
            res.status(200).json(interviews);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Failed to fetch interviews' });
        }
    });

    return router;
};