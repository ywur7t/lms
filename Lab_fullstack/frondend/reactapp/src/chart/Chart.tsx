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
import axios from "axios";
type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Страна");

  const [groupData, setGroupData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (type: tSelect) => {
    setLoading(true);
    try {
      let url = "";

      if (type === "Страна") {
        url = "/api/v1/aggregate/country/";
      } else if (type === "Год") {
        url = "/api/v1/aggregate/year/";
      } else if (type === "Тип") {
        url = "/api/v1/aggregate/type-building/";
      }

      const res = await axios.get(url, {
        auth: {
          username: "student",
          password: "dvfu",
        },
      });

      console.log(res.data);


      const formatted = res.data.stats.map((item: any, index: number) => {
  let groupLabel = "";

  if (group === "Страна") {
    groupLabel = item.name;
  } else if (group === "Год") {
    groupLabel = String(item.year);
  } else if (group === "Тип") {
    groupLabel = item.name ?? `Тип ${item.id}`; 
  }

  return {
    id: item.id ?? index,

    "Группа": groupLabel,
    "Минимальная высота": item.min_height,
    "Максимальная высота": item.max_height,
    "Средняя высота": item.avg_height,
    "Количество": item.buildings_count,

    label: groupLabel,
    value: item.buildings_count,
  };
});
      setGroupData(formatted);
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData(group);
  }, [group]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
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

      </Container>
    </>
  );
}

export default Chart;
