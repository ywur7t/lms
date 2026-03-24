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
  // 🔹 1 MATCHING
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

  // 🔹 2 MATCHING
  {
    id: 2,
    type: "M",
    title: "Титл",
    tasks: [
      { question: "Вар1", answer: "Отв1" },
      { question: "Вар2", answer: "Отв2" },
      { question: "Вар3", answer: "Отв3" },
      { question: "Вар4", answer: "Отв4" },
    ],
  },

  // 🔹 3 SORTING
  {
    id: 3,
    type: "S",
    title: "Отсортируйте спортсменов по популярности",
    options: [
      "Michael Phelps",
      "Snoop Dogg",
      "Thomas Ceccon",
      "Kim Ye-ji",
    ],
    correct: [
      "Michael Phelps",
      "Snoop Dogg",
      "Kim Ye-ji",
      "Thomas Ceccon",
    ],
  },

  // 🔹 4 SINGLE CHOICE
  {
    id: 4,
    type: "ONE",
    title: "Где проходили Олимпийские игры 2024?",
    options: ["Paris", "Tokyo", "London", "Berlin"],
    correct: "Paris",
  },

  // 🔹 5 MULTIPLE CHOICE
  {
    id: 5,
    type: "MULTI",
    title: "Какие виды спорта входят в Олимпиаду?",
    options: ["Swimming", "Football", "Chess", "Athletics"],
    correct: ["Swimming", "Football", "Athletics"],
  },

  // 🔹 6 SINGLE
  {
    id: 6,
    type: "ONE",
    title: "В каком году прошли первые Олимпийские игры?",
    options: ["1896", "1900", "1924", "2000"],
    correct: "1896",
  },
];