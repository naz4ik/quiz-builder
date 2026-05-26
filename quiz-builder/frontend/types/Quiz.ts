export type QuestionType = 'boolean' | 'input' | 'checkbox';

export type Question = {
  id: number;
  type: QuestionType;
  text: string;
  options: string[] | null;
  correctAnswer: string | string[] | null;
};

export type Quiz = {
  id: number;
  title: string;
  Questions: Question[]; 
};