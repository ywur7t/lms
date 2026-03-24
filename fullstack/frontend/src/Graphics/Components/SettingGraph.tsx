import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Divider, Radio, RadioGroup, Stack } from "@mui/material";


type tSeries = {
  "Max": boolean;
  "Avg": boolean;
  "Min": boolean;
};


type Props = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: Props) {
  // чекбоксы
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  // радио (тип диаграммы)
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === "bar");
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: "20px 0" }}
    >
      {/* Радио */}
      <FormControl >
        <FormLabel sx={{color:"#fff"}}>Тип диаграммы:</FormLabel>

        <RadioGroup
          value={isBar ? "bar" : "dot"}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
          <FormControlLabel value="dot" control={<Radio />} label="Линейная" />
        </RadioGroup>
      </FormControl>

      {/* Чекбоксы */}
      <FormControl >
        <FormLabel sx={{color:"#fff"}}>На диаграмме показать:</FormLabel>

        <FormControlLabel
          control={
            <Checkbox
              checked={series["Max"]}
              onChange={handleCheckboxChange}
              name="Max"
            />
          }
          label="макс."
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={series["Avg"]}
              onChange={handleCheckboxChange}
              name="Avg"
            />
          }
          label="Ср.знач."
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={series["Min"]}
              onChange={handleCheckboxChange}
              name="Min"
            />
          }
          label="Мин."
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;