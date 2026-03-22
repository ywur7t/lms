import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "./testSlice";

const countries = ["Italy", "USA", "Korea"];

const athletes = [
  { id: "Ceccon", name: "Thomas Ceccon" },
  { id: "Phelps", name: "Michael Phelps" },
  { id: "Kim", name: "Kim Ye-ji" },
];

// 🔹 draggable элемент
function Draggable({ id, name }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        p: 1,
        mb: 1,
        background: "#ddd",
        cursor: "grab",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {name}
    </Box>
  );
}

// 🔹 зона для страны
function Droppable({ id, children }: any) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minHeight: 50,
        p: 1,
        border: "2px dashed gray",
        background: isOver ? "#e0f7fa" : "#fafafa",
      }}
    >
      {children}
    </Box>
  );
}

function Matching() {
  const dispatch = useDispatch();

  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const country = over.id;
    const athlete = active.id;

    const newMatches = {
      ...matches,
      [country]: athlete,
    };

    setMatches(newMatches);

    dispatch(setAnswer({ id: "q3", value: newMatches }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box sx={{ display: "flex", gap: 5, mt: 2 }}>
        
        {/* Левая колонка (страны) */}
        <Box>
          <Typography variant="h6">Countries</Typography>

          {countries.map((c) => (
            <Box key={c} sx={{ mb: 2 }}>
              <Typography>{c}</Typography>

              <Droppable id={c}>
                {matches[c] && (
                  <Typography>
                    {
                      athletes.find((a) => a.id === matches[c])?.name
                    }
                  </Typography>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>

        {/* Правая колонка (спортсмены) */}
        <Box>
          <Typography variant="h6">Athletes</Typography>

          {athletes.map((a) => (
            <Draggable key={a.id} id={a.id} name={a.name} />
          ))}
        </Box>
      </Box>
    </DndContext>
  );
}

export default Matching;