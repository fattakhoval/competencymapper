const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Подключение базы данных

const Interview = sequelize.define('Interviews', {
  candidate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Scheduled',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Interview;
