import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePage } from "./pages/CreatePage/CreatePage";
import { QuizzesPage } from "./pages/QuizzesPage/QuizzesPage";
import { QuizDetailPage } from "./pages/QuizDetailPage/QuizDetailPage";
import './App.module.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quizzes" replace />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/quizzes/:id" element={<QuizDetailPage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};
