import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAnswer } from "../Features/quizSlice";

function SingleChoice({ index, options }: any) {
  const dispatch = useDispatch();

  return (
    <RadioGroup
      onChange={(e) =>
        dispatch(setAnswer({ index, value: e.target.value }))
      }
    >
      {options.map((opt: string) => (
        <FormControlLabel
          key={opt}
          value={opt}
          control={<Radio />}
          label={opt}
        />
      ))}
    </RadioGroup>
  );
}

export default SingleChoice;