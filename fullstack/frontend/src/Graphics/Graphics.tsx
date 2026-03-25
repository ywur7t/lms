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
  CircularProgress,
} from "@mui/material";
import * as React from "react";

import { athletes } from "../assets/groupdataathletes";
import { medals } from "../assets/groupdatamedals";
import { games } from "../assets/groupdatagames";

import { useEffect, useState } from "react";
import axios from "axios";

type tSelect = "Атлет" | "Медаль" | "Игра";

interface AthleteStats {
  name: string;
  avg_result: number;
  max_result: number;
  min_result: number;
}

interface MedalStats {
  medal: string;
  avg_result: number;
  max_result: number;
  min_result: number;
}
interface GameStats {
  games_type: string;
  year: number;
  avg_result: number;
  max_result: number;
  min_result: number;
}

type GroupData = AthleteStats[] | MedalStats[] | GameStats[];

function Graphics() {
  const [group, setGroup] = React.useState<tSelect>("Атлет");
  const [groupData, setGroupData] = React.useState<GroupData>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let url = "";
      if (group === "Атлет") {
        url = "http://127.0.0.1:5000/api/v1/participations/stats/athletes";
      } else if (group === "Медаль") {
        url = "http://127.0.0.1:5000/api/v1/participations/stats/medals";
      } else if (group === "Игра") {
        url = "http://127.0.0.1:5000/api/v1/participations/stats/games";
      }
      try {
        const response = await axios.get(url);
        setGroupData(response.data.slice(0, 100));
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить данные. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [group]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   const value = event.target.value as tSelect;
  //   setGroup(value);

  //   if (value === "Атлет") {
  //     setGroupData(athletes);
  //   } else if (value === "Медаль") {
  //     setGroupData(medals);
  //   } else if (value === "Игра") {
  //     setGroupData(games);
  //   }
  // };
  const normalizeData = (data: any[], type: tSelect) => {
    return data.map((item, index) => ({
      id: index,
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
  const normalizedData = normalizeData(groupData, group);



    return (
    <>
      <Navbar />

      <Container sx={{ mt: "10vh" }}>
        <Box sx={{ width: "200px", m: "auto", mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#fff" }}>Группировать по</InputLabel>
            <Select
              sx={{
                border: "1px solid #fff",
                color: "#fff",
                ".MuiSvgIcon-root": { color: "#fff" },
              }}
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

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ textAlign: "center", my: 4 }}>
            {error}
          </Typography>
        )}
                {!loading && !error && (
          <>
            <GroupChart data={normalizedData} />
            <GroupGrid data={normalizedData} />
          </>
        )}
      </Container>
    </>
  );

  // return (
  //   <>
  //     <Navbar />

  //     <Container sx={{ mt: "10vh" }}>
  //       <Box sx={{ width: "200px", m: "auto", mb: 3 }}>
  //         <FormControl fullWidth>
  //           <InputLabel sx={{ color: "#fff" }}>Группировать по</InputLabel>

  //           <Select
  //             sx={{
  //               border: "1px solid #fff",
  //               color: "#fff",
  //               ".MuiSvgIcon-root": { color: "#fff" },
  //             }}
  //             id="select-group"
  //             value={group}
  //             label="Группировать по"
  //             onChange={handleChange}
  //           >
  //             <MenuItem value="Атлет">Атлету</MenuItem>
  //             <MenuItem value="Медаль">Медале</MenuItem>
  //             <MenuItem value="Игра">Игре</MenuItem>
  //           </Select>
  //         </FormControl>
  //       </Box>

  //       <Typography variant="h6" sx={{ mb: 2 }}>
  //         Текущая группировка: {group}
  //       </Typography>

  //       <GroupChart data={normalizeData(groupData, group)} />
  //       <GroupGrid data={normalizeData(groupData, group)} />
  //     </Container>
  //   </>
  // );
}
export default Graphics;
