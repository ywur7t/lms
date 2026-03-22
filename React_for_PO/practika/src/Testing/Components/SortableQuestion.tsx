import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../Components/testSlice";

function SortableItem({ id }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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

function SortableQuestion() {
  const dispatch = useDispatch();const [items, setItems] = useState([
  "Michael Phelps", 
  "Caeleb Dressel", 
  "Ryan Murphy", 
  "Adam Peaty", 
  "Kosuke Hagino", 
  "Sun Yang", 
  "Kosuke Kitajima", 
  "Ian Thorpe"
]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      dispatch(setAnswer({ id: "q4", value: newItems }));
    }
  };

  return (
    <div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default SortableQuestion;