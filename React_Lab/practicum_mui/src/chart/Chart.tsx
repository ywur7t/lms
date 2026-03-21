import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { years, countries, types } from "./groupdata";
type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Страна");
  const [groupData, setGroupData] = React.useState(countries);
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);

    if (value === "Страна") {
      setGroupData(countries);
    } else if (value === "Год") {
      setGroupData(years);
    } else if (value === "Тип") {
      setGroupData(types);
    }
  };

  return (
    <>
      <Navbar active="3" />

      <Container sx={{ mt: 4 }}>
        <Box sx={{ width: "200px", m: "auto", mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Группировать по</InputLabel>

            <Select
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleChange}
            >
              <MenuItem value="Страна">Стране</MenuItem>
              <MenuItem value="Год">Году</MenuItem>
              <MenuItem value="Тип">Типу</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Текущая группировка: {group}
        </Typography>

        <GroupChart data={groupData} />
        <GroupGrid data={groupData} />

        {/* <GroupGrid data={countries} /> */}
      </Container>
    </>
  );
}

export default Chart;
