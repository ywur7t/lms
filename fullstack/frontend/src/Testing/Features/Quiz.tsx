import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { quiz } from "../quizData";
import Matching from "./Matching";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { addList } from "./quizSlice";
import SingleChoice from "../Components/SingleChoice";
import MultiChoice from "../Components/MultyChoice";
import SortableList from "./SortableList";

import { useEffect, useState } from "react";
import axios from "axios";

// import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../store";
// import { addList } from "./quizSlice";

// import Matching from "./Matching";
// import SingleChoice from "../Components/SingleChoice";
// import MultiChoice from "../Components/MultyChoice";
// import SortableList from "./SortableList";

function Quiz() {
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<number[] | null>(null);

  const lists = useSelector((state: RootState) => state.lists.lists);
  const dispatch = useDispatch();

  // 🔥 Загрузка теста с backend
  useEffect(() => {
    // axios.get("/api/v1/quizzes")
    axios.get("http://localhost:5000/api/v1/quizzes")
    
      .then(res => {
        setQuiz(res.data.quiz);
        console.log("API RESPONSE:", res.data);
      })
      .catch(err => console.error("Ошибка загрузки теста:", err))
      .finally(() => setLoading(false));
  }, []);

  // 🔁 Ресет (перемешивание)
  const handleReset = () => {
    quiz.forEach((q, index) => {
      if (q.type === "M" && q.tasks) {
        const shuffled = [...q.tasks.map((t: any) => t.answer)]
          .sort(() => Math.random() - 0.5);

        dispatch(addList({ index, items: shuffled }));
      }

      if (q.type === "S" && q.options) {
        const shuffled = [...q.options]
          .sort(() => Math.random() - 0.5);

        dispatch(addList({ index, items: shuffled }));
      }

      if (q.type === "ONE") {
        dispatch(addList({ index, items: null }));
      }

      if (q.type === "MULTI") {
        dispatch(addList({ index, items: [] }));
      }
    });

    setResults(null);
  };

  // ✅ Проверка ответов
  const handleCheck = () => {
    const res = quiz.map((q, index) => {
      const userAnswers = lists[index];
      let correct = 0;

      // MATCHING
      if (q.type === "M") {
        const correctAnswers = q.tasks.map((t: any) => t.answer);

        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
          correct = correctAnswers.length;
        }
      }

      // SINGLE
      if (q.type === "ONE") {
        if (userAnswers === q.correct) correct = 1;
      }

      // MULTI
      if (q.type === "MULTI") {
        if (
          Array.isArray(userAnswers) &&
          JSON.stringify([...userAnswers].sort()) ===
          JSON.stringify([...q.correct].sort())
        ) {
          correct = 1;
        }
      }

      // SORTING
      if (q.type === "S") {
        if (JSON.stringify(userAnswers) === JSON.stringify(q.correct)) {
          correct = 1;
        }
      }

      return correct;
    });

    setResults(res);
  };

  // ⏳ Лоадер
  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} sx={{ m: 2, p: 2 }}>
          <Typography variant="h5">
            {index + 1}. {item.title}
          </Typography>

          {item.type === "M" && (
            <Matching index={index} tasks={item.tasks} />
          )}

          {item.type === "S" && (
            <SortableList index={index} answers={item.options} />
          )}

          {item.type === "ONE" && (
            <SingleChoice index={index} options={item.options} />
          )}

          {item.type === "MULTI" && (
            <MultiChoice index={index} options={item.options} />
          )}
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Результаты тестирования:</Typography>

          {results.map((r, i) => (
            <Typography key={i}>
              Задание {i + 1}: {r} правильных ответов
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;






// function Quiz() {
  
//   const [results, setResults] = React.useState<number[] | null>(null);

//   const lists = useSelector((state: RootState) => state.lists.lists);
//   const dispatch = useDispatch();
//   const handleReset = () => {
//     quiz.forEach((q, index) => {
//       const shuffled = [...q.tasks.map((t) => t.answer)].sort(
//         () => Math.random() - 0.5,
//       );

//       dispatch(addList({ index, items: shuffled }));
//     });

//     setResults(null);
//   };
//   const handleCheck = () => {
//   const res = quiz.map((q, index) => {
//     const userAnswers = lists[index];

//     let correct = 0;

//     // 🔹 MATCHING
//     if (q.type === "M") {
//       const correctAnswers = q.tasks!.map((t) => t.answer);

//       if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
//         correct = correctAnswers.length;
//       }
//     }

//     // 🔹 SINGLE
//     if (q.type === "ONE") {
//       if (userAnswers === q.correct) correct = 1;
//     }

//     // 🔹 MULTI
//     if (q.type === "MULTI") {
//       if (
//         Array.isArray(userAnswers) &&
//         JSON.stringify([...userAnswers].sort()) ===
//           JSON.stringify([...q.correct].sort())
//       ) {
//         correct = 1;
//       }
//     }

//     // 🔹 SORTING
//     if (q.type === "S") {
//       if (JSON.stringify(userAnswers) === JSON.stringify(q.correct)) {
//         correct = 1;
//       }
//     }

//     return correct;
//   });

//   setResults(res);
// };

//   return (
//     <Container maxWidth="md">
//       {quiz.map((item, index) => (
//   <Box key={item.id} sx={{ m: 2, p: 2 }}>
//     <Typography variant="h5">
//       {index + 1}. {item.title}
//     </Typography>

//     {item.type === "M" && (
//       <Matching index={index} tasks={item.tasks!} />
//     )}

//     {item.type === "S" && (
//       <SortableList index={index} answers={item.options!} />
//     )}

//     {item.type === "ONE" && (
//       <SingleChoice index={index} options={item.options!} />
//     )}

//     {item.type === "MULTI" && (
//       <MultiChoice index={index} options={item.options!} />
//     )}
//   </Box>
// ))}

//       <Box sx={{ display: "flex", justifyContent: "space-around" }}>
//         <Button variant="contained" onClick={handleCheck}>
//           Проверить
//         </Button>
//         <Button variant="contained" onClick={handleReset}>
//           Начать снова
//         </Button>
//       </Box>

//       {results && (
//   <Box sx={{ mt: 4 }}>
//     <Typography variant="h5">Результаты тестирования:</Typography>

//     {results.map((r, i) => (
//       <Typography key={i}>
//         Задание {i + 1}: {r} правильных ответов
//       </Typography>
//     ))}
//   </Box>
// )}
//     </Container>
//   );
// }

// export default Quiz;
