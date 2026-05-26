'use strict';
import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller.js';

export const router = Router();

router.get('/', quizController.getAll);
router.get('/:id', quizController.getById);
router.post('/', quizController.createQuiz);
router.delete('/:quizId', quizController.deleteQuiz);