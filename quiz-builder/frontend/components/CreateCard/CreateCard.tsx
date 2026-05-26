import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question, QuestionType } from "../../types/Quiz";
import styles from "./CreateCard.module.scss";

type QuestionDraft = Omit<Question, "id">;

export const CreateCard = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);
  const navigate = useNavigate();
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const [submitted, setSubmitted] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "boolean",
        text: "",
        options: null,
        correctAnswer: "true",
      },
    ]);
  };

  const updateQuestion = (index: number, updated: Partial<QuestionDraft>) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, ...updated } : q)),
    );
  };

  const handleTypeChange = (index: number, type: QuestionType) => {
    updateQuestion(index, {
      type,
      options: type === "checkbox" ? ["", ""] : null,
      correctAnswer:
        type === "boolean" ? "true" : type === "checkbox" ? [] : null,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!title.trim() || questions.length === 0) return;

    fetch(`${import.meta.env.VITE_API_URL}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions }),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/quizzes/${data.id}`));
  };

  return (
    <div className={styles.container}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name of quiz"
        className={`${styles.input} ${submitted && !title.trim() ? styles.inputError : ""}`}
      />

      {questions.map((q, i) => (
        <div key={i}>
          <input
            value={q.text}
            onChange={(e) => updateQuestion(i, { text: e.target.value })}
            placeholder="text"
            className={`${styles.questionName} ${submitted && !title.trim() ? styles.inputError : ""}`}
            required
          />

          <select
            className={styles.selectType}
            value={q.type}
            onChange={(e) =>
              handleTypeChange(i, e.target.value as QuestionType)
            }
          >
            <option value="boolean">Boolean</option>
            <option value="input">Input</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <button
            onClick={() => removeQuestion(i)}
            className={styles.removeQuestion}
          >
            ✕
          </button>

          {q.type === "boolean" && (
            <div>
              <label className={styles.booleantext}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  checked={q.correctAnswer === "true"}
                  onChange={() => updateQuestion(i, { correctAnswer: "true" })}
                />
                True
              </label>
              <label className={styles.booleantext}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  checked={q.correctAnswer === "false"}
                  onChange={() => updateQuestion(i, { correctAnswer: "false" })}
                />
                False
              </label>
            </div>
          )}

          {q.type === "input" && (
            <input
              className={styles.inputType}
              value={(q.correctAnswer as string) ?? ""}
              onChange={(e) =>
                updateQuestion(i, { correctAnswer: e.target.value })
              }
              placeholder="Right Answer"
            />
          )}

          {q.type === "checkbox" && (
            <div className={styles.checkboxContainer}>
              {q.options?.map((opt, oi) => (
                <div key={oi}>
                  <input
                    className={styles.checkboxInput}
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...(q.options ?? [])];
                      newOptions[oi] = e.target.value;
                      updateQuestion(i, { options: newOptions });
                    }}
                    placeholder={`Option ${oi + 1}`}
                  />
                  <input
                    className={styles.checkboxType}
                    type="checkbox"
                    checked={(q.correctAnswer as string[])?.includes(opt)}
                    onChange={(e) => {
                      const current = (q.correctAnswer as string[]) ?? [];
                      const newAnswer = e.target.checked
                        ? [...current, opt]
                        : current.filter((a) => a !== opt);
                      updateQuestion(i, { correctAnswer: newAnswer });
                    }}
                  />
                </div>
              ))}
              <button
                className={styles.addMore}
                onClick={() =>
                  updateQuestion(i, { options: [...(q.options ?? []), ""] })
                }
              >
                + Options
              </button>
            </div>
          )}
        </div>
      ))}

      <button onClick={addQuestion} className={styles.addQuestion}>
        + Add question
      </button>
      <button onClick={handleSubmit} className={styles.createQuiz}>
        Create Quiz
      </button>
    </div>
  );
};
