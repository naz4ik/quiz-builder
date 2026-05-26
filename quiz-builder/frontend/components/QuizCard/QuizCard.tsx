import { Quiz } from "../../types/Quiz";
import { Link } from "react-router";
import styles from "./quizCard.module.scss";

type Props = {
  quiz: Quiz;
  onDelete: (id: number) => void;
};

export const QuizCard = ({ quiz, onDelete }: Props) => {
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes/${quiz.id}`, {
      method: "DELETE",
    }).then(() => onDelete(quiz.id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link to={`/quizzes/${quiz.id}`} className={styles.title}>
          {quiz.title}
        </Link>
        <p className={styles.question}>Questions: {quiz.Questions.length}</p>
      </div>
      <button onClick={handleDelete} className={styles.delete}>
        X
      </button>
    </div>
  );
};
