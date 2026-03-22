// import Navbar from "../Navbar/Navbar";
// import { useSelector, useDispatch } from "react-redux";
// import { setAnswer } from "./Components/testSlice";
// import { Box, Typography, Radio, RadioGroup, FormControlLabel, Checkbox } from "@mui/material";
// import React from "react";
// import SortableQuestion from "./Components/SortableQuestion";
// import { calculateScore } from "./Components/testSlice";
// import { type RootState } from "../store";
// import Button from "@mui/material/Button";
// import MatchQuestion from "./Components/Matching";
// import MatchingDnD from "./Components/MatchingDnd";

// function Testing() {
//   const dispatch = useDispatch();
//   const score = useSelector((state: RootState) => state.test.score);

//   // одиночный выбор
//   const handleSingle = (e: any) => {
//     dispatch(setAnswer({ id: "q1", value: e.target.value }));
//   };

//   // множественный
//   const handleMultiple = (value: string) => (e: any) => {
//     dispatch(setAnswer({ id: "q2", value }));
//   };
//   const answers = useSelector((state: RootState) => state.test.answers);

//   return (
//     <>
//       <Navbar />

//       <Box sx={{ p: 4 }}>
//         <Typography variant="h4">Тест</Typography>

//         <Box sx={{ mt: 3 }}>
//           <Typography>Who is the fastest swimmer?</Typography>
//           <RadioGroup onChange={handleSingle}>
//             <FormControlLabel value="Abebe Amiranashvili" control={<Radio />} label="Abebe Amiranashvili" />
//             <FormControlLabel value="Abebe Kovalenko" control={<Radio />} label="Abebe Kovalenko" />
//             <FormControlLabel value="Anjali Li" control={<Radio />} label="Anjali Li" />
//             <FormControlLabel value="Anjali Kravchenko" control={<Radio />} label="Anjali Kravchenko" />
//             <FormControlLabel value="Anna Grigoryan" control={<Radio />} label="Anna Grigoryan" />
//           </RadioGroup>
//         </Box>

// <Box sx={{ mt: 3 }}>
//   <Typography>Which of these sports are included in the Olympic Games??</Typography>

//   <FormControlLabel
//     control={<Checkbox onChange={handleMultiple("swimming")} />}
//     label="swimming"
//   />
//   <FormControlLabel
//     control={<Checkbox onChange={handleMultiple("football")} />}
//     label="football"
//   />
//   <FormControlLabel
//     control={<Checkbox onChange={handleMultiple("chess")} />}
//     label="chess"
//   />
//   <FormControlLabel
//     control={<Checkbox onChange={handleMultiple("athletics")} />}
//     label="athletics"
//   />
// </Box>

//         <Box sx={{ mt: 3 }}>
//   <Typography>Match the country and the athlete</Typography>
//   <MatchQuestion />
// </Box>

//         <Box sx={{ mt: 3 }}>
//           <Typography>Sort by popularity</Typography>

//           <Box sx={{ mt: 3 }}>
//   <Typography>Match country and athlete (drag to correct order)</Typography>
//   <MatchingDnD />
// </Box>
//         </Box>

//         <Box sx={{ mt: 3 }}>
//           <Typography>Where are the 2024 Olympics?</Typography>
//           <RadioGroup
//             onChange={(e) =>
//               dispatch(setAnswer({ id: "q5", value: e.target.value }))
//             }
//           >
//             <FormControlLabel value="Paris" control={<Radio />} label="Paris" />
//             <FormControlLabel value="Tokyo" control={<Radio />} label="Tokyo" />
//             <FormControlLabel value="Athens" control={<Radio />} label="Athens" />
//             <FormControlLabel value="London" control={<Radio />} label="London" />
//             <FormControlLabel value="Berlin" control={<Radio />} label="Berlin" />
//             <FormControlLabel value="Rome" control={<Radio />} label="Rome" />
//             <FormControlLabel value="Seoul" control={<Radio />} label="Seoul" />
//           </RadioGroup>
//         </Box>

//         <Box sx={{ mt: 3 }}>
//           <Typography>What year was the first Olympics held?</Typography>
//           <input
//             onBlur={(e) =>
//               dispatch(setAnswer({ id: "q6", value: e.target.value }))
//             }
//           />
//         </Box>
//       </Box>
//       <Box>
//         <Button
//   variant="contained"
//   sx={{ mt: 3 }}
//   onClick={() => dispatch(calculateScore())}
// >
//   Проверить
// </Button>

// <Typography variant="h5" sx={{ mt: 2 }}>
//   Результат: {score} / 6
// </Typography>
//       </Box>
//     </>
//   );
// }

// export default Testing;


import Navbar from "../Navbar/Navbar";
import Quiz from "./Features/Quiz";

function Testing() {
  return (
    <>
      <Navbar />
      <Quiz />
    </>
  );
}

export default Testing;