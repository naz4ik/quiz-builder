"use strict";
import * as quizService from "../services/quiz.service.js";
import { Quiz } from "../models/Quiz.model.js";

export const createQuiz = async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions) {
    return res.sendStatus(400);
  }

  const newQuiz = await quizService.createQuiz({title, questions});

  res.status(201).send(newQuiz);
};

export const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    return res.sendStatus(400);
  }

  await Quiz.destroy({ where: { id: quizId } });

  res.sendStatus(204);
};

export const getAll = async (req, res) => {
  const quizzes = await quizService.findQuizzes();

  res.status(200).send(quizzes);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const quiz = await quizService.findQuizById(id);

  if (!quiz) {
     return res.status(404).json({ error: "Quiz not found" });
  }
  res.status(200).send(quiz);
};
