import Navbar from "../Navbar/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import GroupGrid from "./Components/GroupGrid";
import GroupChart from "./Components/GroupGraph";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import * as React from "react";

import { athletes } from "../assets/groupdataathletes";
import { medals  } from "../assets/groupdatamedals";
import { games } from "../assets/groupdatagames";

type tSelect = "Атлет" | "Медаль" | "Игра";


function Graphics() {
  const [group, setGroup] = React.useState<tSelect>("Атлет");
  const [groupData, setGroupData] = React.useState(athletes);
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);

    if (value === "Атлет") {
      setGroupData(athletes);
    } else if (value === "Медаль") {
      setGroupData(medals);
    } else if (value === "Игра") {
      setGroupData(games);
    }
  };
  const normalizeData = (data: any[], type: tSelect) => {
  return data.map((item, index) => ({
    id:index,
    ...item,
    Группа:
      type === "Атлет"
        ? item.name
        : type === "Медаль"
        ? item.medal
        : `${item.games_type} ${item.year}`,
    Max: item.max_result,
    Avg: item.avg_result,
    Min: item.min_result,
  }));
};

  return (
    <>
      <Navbar />

      <Container sx={{mt:"10vh"}}>
        <Box sx={{ width: "200px", m: "auto", mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel sx={{color:"#fff"}}>Группировать по</InputLabel>

            <Select sx={{border:"1px solid #fff", color:"#fff", '.MuiSvgIcon-root':{color:"#fff"}}}
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleChange}
            >
              <MenuItem value="Атлет">Атлету</MenuItem>
<MenuItem value="Медаль">Медале</MenuItem>
<MenuItem value="Игра">Игре</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Текущая группировка: {group}
        </Typography>

        <GroupChart data={normalizeData(groupData, group)} />
        <GroupGrid data={normalizeData(groupData, group)} />

      </Container>
    </>
  );
}
export default Graphics;
