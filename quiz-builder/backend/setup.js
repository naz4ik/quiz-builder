import { Quiz } from "./src/models/Quiz.model.js";
import { Question } from "./src/models/Question.model.js";

async function setup() {
  try {
    await Quiz.sync({ force: true });
    await Question.sync({ force: true });

    // eslint-disable-next-line no-console
    console.log('Tables synced!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error syncing:', err);
  }
}

setup();