import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Features/quizSlice";
import { type RootState } from "../../store";

function MultiChoice({ index, options }: any) {
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.lists.lists[index] || []);

  const handleChange = (value: string) => {
    let newArr = [...answers];

    if (newArr.includes(value)) {
      newArr = newArr.filter((v) => v !== value);
    } else {
      newArr.push(value);
    }

    dispatch(setAnswer({ index, value: newArr }));
  };

  return (
    <>
      {options.map((opt: string) => (
        <FormControlLabel
          key={opt}
          control={
            <Checkbox
              checked={answers.includes(opt)}
              onChange={() => handleChange(opt)}
            />
          }
          label={opt}
        />
      ))}
    </>
  );
}

export default MultiChoice;