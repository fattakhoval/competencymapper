const jwt = require('jsonwebtoken');

module.exports = (db) => {
    const router = express.Router();

    router.post('/test-results', async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const { score } = req.body;

            const [result] = await db.execute(
                'INSERT INTO TestResults (userId, score, completedAt) VALUES (?, ?, NOW())',
                [userId, score]
            );

            res.status(201).json({
                message: 'Test result saved successfully',
                resultId: result.insertId,
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(401).json({ error: 'Unauthorized' });
        }
    });

    return router;
};