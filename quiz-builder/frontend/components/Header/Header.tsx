import { Link } from "react-router";
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <Link to={"/create"} className={styles.text}>
          Create Quiz
        </Link>
        <Link to={"/quizzes"} className={styles.text}>
          All Quizzes
        </Link>
      </div>
    </>
  );
};
