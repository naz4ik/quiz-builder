"use strict";
import { DataTypes } from "sequelize";
import { Quiz } from "./Quiz.model.js";
import { client } from '../../db.js';


export const Question = client.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM("boolean", "input", "checkbox"),
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  correctAnswer: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

Quiz.hasMany(Question, { foreignKey: "quizId", onDelete: "CASCADE" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });
