'use strict';
import { DataTypes } from 'sequelize';
import { client } from '../../db.js';



export const Quiz = client.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});