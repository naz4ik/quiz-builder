import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quiz } from "../../types/Quiz";
import { FullQuiz } from "../../components/FullQuiz/FullQuiz";
import { Header } from "../../components/Header/Header";

export const QuizDetailPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [id]);

  if (!quiz) return <p>Завантаження...</p>;

  return (
    <>
      <Header />
      <FullQuiz quiz={quiz} />
    </>
  );
};