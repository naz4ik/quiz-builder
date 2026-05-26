'use strict';
import { Quiz } from '../models/Quiz.model.js';
import { Question } from '../models/Question.model.js';

export const findQuizzes = async () => {
  return Quiz.findAll({
    include: [{ model: Question, attributes: ['id'] }],
  });
};

export const findQuizById = async (id) => {
  return Quiz.findByPk(id, {
    include: [
      {
        model: Question,
        attributes: ['id', 'type', 'text', 'options', 'correctAnswer'],
      },
    ],
  });
};

export const createQuiz = async ({ title, questions }) => {
  const quiz = await Quiz.create({ title });

  if (questions && questions.length > 0) {
    await Question.bulkCreate(
      questions.map((q) => ({ ...q, quizId: quiz.id })),
    );
  }

  return findQuizById(quiz.id);
};