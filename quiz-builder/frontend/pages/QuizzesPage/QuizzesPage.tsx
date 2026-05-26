import { useEffect, useState } from "react";

import { Header } from "../../components/Header/Header";
import { Quiz } from "../../types/Quiz";
import { QuizCard } from "../../components/QuizCard/QuizCard";

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div>
      <Header />
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          onDelete={(id) => setQuizzes(quizzes.filter((q) => q.id !== id))}
        />
      ))}
    </div>
  );
};
