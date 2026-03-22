import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "./testSlice";

function SortableItem({ id }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: "10px",
        margin: "5px 0",
        background: "#ddd",
        cursor: "grab",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {id}
    </div>
  );
}

function MatchingDnD() {
  const dispatch = useDispatch();

  const [items, setItems] = useState([
    "Italy - Ceccon",
    "USA - Phelps",
    "Australia - Titmus",
    "South Korea - Kim Ye-ji",
  ]);

  const correct = [
    "Italy - Ceccon",
    "USA - Phelps",
    "Australia - Titmus",
    "South Korea - Kim Ye-ji",
  ];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      dispatch(setAnswer({ id: "q4", value: newItems }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default MatchingDnD;