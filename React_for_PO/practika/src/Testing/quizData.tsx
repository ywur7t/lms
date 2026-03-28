export type tTasks = {
  question: string;
  answer: string;
}[];

export type tQuizzes = {
  id: number;
  type: "M" | "S" | "ONE" | "MULTI";
  title: string;
  tasks?: tTasks;
  options?: string[];
  correct?: any;
}[];

export const quiz: tQuizzes = [

  {
    id: 1,
    type: "M",
    title: "Сопоставьте спортсмена и страну",
    tasks: [
      { question: "Thomas Ceccon", answer: "Italy" },
      { question: "Yusuf Dikec", answer: "Turkey" },
      { question: "Kim Ye-ji", answer: "South Korea" },
      { question: "Stephen Nedoroscik", answer: "USA" },
    ],
  },

  {
    id: 2,
    type: "M",
    title: "Сопоставьте спортсменов и их виды спорта",
    tasks: [
      { question: "Mary Yamamoto", answer: "Плавание" },
      { question: "Natalya Grigoryan", answer: "Легкая атлетика" },
      { question: "Monika Ito", answer: "Гимнастика" },
      { question: "Natalya Mammadov", answer: "Бег" },
    ],
  },

  {
    id: 3,
    type: "S",
    title: "Отсортируйте спортсменов по количеству олимпийских медалей (по убыванию)",
    options: [
      "Michael Phelps",
      "Usain Bolt",
    "Katie Ledecky",
    "Simone Biles",
    ],
    correct: [
      "Michael Phelps",
      "Usain Bolt",
    "Katie Ledecky",
    "Simone Biles",
    ],
  },

  {
    id: 4,
    type: "ONE",
    title: "Где проходили летние Олимпийские игры 2024?",
    options: ["Paris", "Tokyo", "London", "Berlin"],
    correct: "Paris",
  },

  {
    id: 5,
    type: "MULTI",
    title: "Какие виды спорта входят в Олимпиаду?",
    options: ["Swimming", "Football", "Chess", "Athletics"],
    correct: ["Swimming", "Football", "Athletics"],
  },

  {
    id: 6,
    type: "ONE",
    title: "В каком году состоялись первые современные Олимпийские игры?",
    options: ["1896", "1900", "1924", "2000"],
    correct: "1896",
  },
];