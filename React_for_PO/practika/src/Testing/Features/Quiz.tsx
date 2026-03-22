import { Box, Button, Container, Typography } from "@mui/material";
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

function Quiz() {
  const [results, setResults] = React.useState<number[] | null>(null);

  const lists = useSelector((state: RootState) => state.lists.lists);
  const dispatch = useDispatch();
  const handleReset = () => {
    quiz.forEach((q, index) => {
      const shuffled = [...q.tasks.map((t) => t.answer)].sort(
        () => Math.random() - 0.5,
      );

      dispatch(addList({ index, items: shuffled }));
    });

    setResults(null);
  };
  const handleCheck = () => {
    const res = quiz.map((q, index) => {
      const userAnswers = lists[index] || [];
      const correctAnswers = q.tasks.map((t) => t.answer);

      let correct = 0;

      for (let i = 0; i < correctAnswers.length; i++) {
        if (q.type === "ONE") {
  if (userAnswers === q.correct) correct++;
}

if (q.type === "MULTI") {
  if (
    Array.isArray(userAnswers) &&
    JSON.stringify(userAnswers.sort()) === JSON.stringify(q.correct.sort())
  ) {
    correct++;
  }
}

if (q.type === "S") {
  if (JSON.stringify(userAnswers) === JSON.stringify(q.correct)) {
    correct++;
  }
}
      }

      return correct;
    });

    setResults(res);
  };

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
  <Box key={item.id} sx={{ m: 2, p: 2 }}>
    <Typography variant="h5">
      {index + 1}. {item.title}
    </Typography>

    {item.type === "M" && (
      <Matching index={index} tasks={item.tasks!} />
    )}

    {item.type === "S" && (
      <SortableList index={index} answers={item.options!} />
    )}

    {item.type === "ONE" && (
      <SingleChoice index={index} options={item.options!} />
    )}

    {item.type === "MULTI" && (
      <MultiChoice index={index} options={item.options!} />
    )}
  </Box>
))}

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
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
