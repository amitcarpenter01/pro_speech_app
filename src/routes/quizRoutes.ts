import express from 'express';
import * as quizController from '../controllers/quizController';

const router = express.Router();

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.put('/:id', quizController.updateQuizById);
router.delete('/:id', quizController.deleteQuizById);

export default router;
