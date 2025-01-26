const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.locals.db = db;

db.getConnection()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Error connecting to the database', err));

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
        req.user = user;
        next();
    });
};


// Тестовые маршруты
const testRouter = require('./routes/testRoutes')(db, authenticateToken);
app.use('/api/tests', testRouter);


function calculateScore(answers) {
    const maxScore = Object.keys(answers).length * 5;
    let score = 0;

    Object.entries(answers).forEach(([questionId, answer]) => {
        const answerIndex = questions[questionId - 1].options.indexOf(answer);
        score += 5 - answerIndex;
    });

    return Math.round((score / maxScore) * 100);
}


const userRoutes = require('./routes/userRoutes')(db, jwt);
app.use('/api/users', userRoutes);

const interviewRoutes = require('./routes/interviewsRoutes')(db, authenticateToken);
app.use('/api/interviews', interviewRoutes);



const feedbackRoutes = require('./routes/feedbackRoutes')(db, authenticateToken);
app.use('/api/feedback', feedbackRoutes);

const results = require('./routes/results')(db, authenticateToken);
app.use('/api/results', results);

const processedResults = require('./routes/processedResults');
app.use('/api/processedResults', processedResults(db, authenticateToken));

const dashboardRoutes = require('./routes/dashboard')(db, authenticateToken);
app.use('/api/dashboard', dashboardRoutes);

const admin = require('./routes/admin')(db, authenticateToken);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));