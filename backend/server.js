const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());



const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/feedback', feedbackRoutes);

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

