const express = require('express');

module.exports = (db, authenticateToken) => {
    const router = express.Router();
    router.use(authenticateToken);

    router.get('/', async (req, res) => {
        try {
            console.log('ProcessedResults route hit');
            const userId = req.user.id;
            console.log('User ID:', userId);
            
            const [results] = await db.query(
                `SELECT score, completedAt 
                FROM TestResults 
                WHERE userId = ? 
                ORDER BY completedAt DESC`,
                [userId]
            );
            console.log('Query results:', results);

            const processedResults = results.map(result => ({
                completedAt: result.completedAt,
                score: typeof result.score === 'string' ? JSON.parse(result.score) : result.score
            }));
            console.log('Processed results:', processedResults);

            res.json(processedResults);
            
        } catch (error) {
            console.error('Error in processedResults:', error);
            res.status(500).json({ message: 'Failed to retrieve test results' });
        }
    });
    
    return router;
};