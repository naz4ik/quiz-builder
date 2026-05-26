import { Quiz } from "../../types/Quiz";
import styles from './FullQuiz.module.scss';

type Props = {
  quiz: Quiz;
};

export const FullQuiz = ({ quiz }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{quiz.title}</h1>
      {quiz.Questions.map((q, i) => (
        <div key={q.id}>
          <p className={styles.question}>{i + 1}. {q.text} <em>({q.type})</em></p>

          {q.type === 'boolean' && (
            <p className={styles.booleanAnswer}>Answer: {q.correctAnswer === 'true' ? 'True' : 'False'}</p>
          )}

          {q.type === 'input' && (
            <p className={styles.inputAnswer}>Answer: {q.correctAnswer as string}</p>
          )}

          {q.type === 'checkbox' && (
            <ul>
              {q.options?.map((opt, oi) => (
                <li key={oi} className={styles.checkboxAnswer}>
                  {opt} {(q.correctAnswer as string[])?.includes(opt) ? '✓' : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};