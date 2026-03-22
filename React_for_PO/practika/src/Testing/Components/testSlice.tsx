import { createSlice } from "@reduxjs/toolkit";

type State = {
  answers: Record<string, any>;
  score: number;
};
const correctAnswers = {
  q1: "Anjali Li",
  q2: ["swimming", "football", "athletics"],
  q3: {
  Italy: "Ceccon",
  USA: "Phelps",
  Korea: "Kim",
},
  q4: [
    "Adam Peaty", 
    "Ryan Murphy", 
    "Kosuke Hagino", 
    "Kosuke Kitajima", 
    "Caeleb Dressel", 
    "Michael Phelps", 
    "Ian Thorpe",
    "Sun Yang", 
],
  q5: "Paris",
  q6: "1896",
};

const initialState: State = {
  answers: {},
  score: 0,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { id, value } = action.payload;
      state.answers[id] = value;
    },

    calculateScore: (state) => {
      let score = 0;

      Object.keys(correctAnswers).forEach((key) => {
        const correct = (correctAnswers as any)[key];
        const user = state.answers[key];

        if (typeof correct === "object" && !Array.isArray(correct)) {
  if (JSON.stringify(correct) === JSON.stringify(user)) {
    score++;
  }
}
if (Array.isArray(correct)) {
  if (
    Array.isArray(user) &&
    JSON.stringify(correct) === JSON.stringify(user)
  ) {
    score++;
  }
} else if (typeof correct === "object") {
  if (JSON.stringify(correct) === JSON.stringify(user)) {
    score++;
  }
} else {
  if (correct === user) score++;
}
        // if (Array.isArray(correct)) {
        //   if (
        //     Array.isArray(user) &&
        //     JSON.stringify(correct) === JSON.stringify(user)
        //   ) {
        //     score++;
        //   }
        // } else {
        //   if (correct === user) score++;
        // }
      });
      state.score = score;
    },
  },
});

export const { setAnswer, calculateScore } = testSlice.actions;
export default testSlice.reducer;
