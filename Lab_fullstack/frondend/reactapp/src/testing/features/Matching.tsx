import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { type tTasks } from "../quizData";
import SortableList from "./SortableList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addList } from "./quizSlice";

interface Props {
  index: number;
  tasks: tTasks;
}

function Matching({ index, tasks }: Props) {
  const dispatch = useDispatch();

  const answers = [...tasks.map((t) => t.answer)].sort(
    () => Math.random() - 0.5
  );

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, i) => (
            <ListItem key={i}>
              <ListItemButton
                sx={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  textAlign: "right",
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid size={6}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;