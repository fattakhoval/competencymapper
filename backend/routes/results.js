const express = require('express');

module.exports = (db, authenticateToken) => {
    const router = express.Router();
    router.use(authenticateToken);

    router.get('/', async (req, res) => {
        try {
            const userId = req.user.id;
            
            const [results] = await db.query(
                `SELECT score, completedAt 
                FROM TestResults 
                WHERE userId = ? 
                ORDER BY completedAt DESC`,
                [userId]
            );

            const processedResults = results.map(result => ({
                completedAt: result.completedAt,
                score: typeof result.score === 'string' ? JSON.parse(result.score) : result.score
            }));

            res.status(200).json({ currentResults: processedResults });
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to retrieve test results' });
        }
    });
    
    return router;
};