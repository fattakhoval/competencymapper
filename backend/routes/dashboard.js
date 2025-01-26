// const express = require('express');

// module.exports = (db, authenticateToken) => {
//     const router = express.Router();
//     router.use(authenticateToken);

//     router.get('/stats', async (req, res) => {
//         try {
//             const userId = req.user.id;
//             const [results] = await db.query(
//                 'SELECT score FROM TestResults WHERE userId = ?',
//                 [userId]
//             );
    
//             if (!results.length) {
//                 return res.json({
//                     completedTests: 0,
//                     averageScore: 0,
//                     skillsToImprove: 0
//                 });
//             }
    
//             let totalPercentage = 0;
//             let skillsToImprove = 0;
    
//             const latestResult = results[0];
//             const scores = latestResult.score;
    
//             Object.values(scores).forEach(skill => {
//                 totalPercentage += Number(skill.percentage);
//                 if (skill.percentage < 50) skillsToImprove++;
//             });
    
//             const averageScore = Math.round(totalPercentage / Object.keys(scores).length);
    
//             res.json({
//                 completedTests: results.length,
//                 averageScore,
//                 skillsToImprove
//             });
    
//         } catch (error) {
//             console.error('Error details:', error);
//             res.status(500).json({ error: error.message });
//         }
//     });
     
    
//     return router;
// };
const express = require('express');

module.exports = (db, authenticateToken) => {
    const router = express.Router();
    router.use(authenticateToken);

    router.get('/stats', async (req, res) => {
        try {
            const userId = req.user.id;
            const [results] = await db.query(
                'SELECT score FROM TestResults WHERE userId = ?',
                [userId]
            );
    
            if (!results.length) {
                return res.json({
                    completedTests: 0,
                    averageScore: 0,
                    skillsToImprove: 0
                });
            }
    
            let totalPercentage = 0;
            let skillsToImprove = 0;
    
            const latestResult = results[0];
            const scores = typeof latestResult.score === 'string' ? JSON.parse(latestResult.score) : latestResult.score;
    
            Object.values(scores).forEach(skill => {
                totalPercentage += Number(skill.percentage);
                if (skill.percentage < 50) skillsToImprove++;
            });
    
            const averageScore = Math.round(totalPercentage / Object.keys(scores).length);
    
            res.json({
                completedTests: results.length,
                averageScore,
                skillsToImprove
            });
    
        } catch (error) {
            console.error('Error details:', error);
            res.status(500).json({ error: error.message });
        }
    });
    return router;
};