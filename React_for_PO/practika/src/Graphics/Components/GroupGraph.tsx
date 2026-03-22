import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Container from "@mui/material/Container";
import SettingChart from "./SettingGraph";
import { type BaseGroup } from "../../assets/groupdata";

type Props = {
  data: BaseGroup;
};

type tSeries = {
  "Max": boolean;
  "Avg": boolean;
  "Min": boolean;
};

function GroupChart({ data }: Props) {
  const [series, setSeries] = React.useState<tSeries>({
    "Max": true,
    "Avg": false,
    "Min": false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const chartSetting = {
    yAxis: [{ label: "Values" }],
    height: 400,
  };

  const seriesY = Object.entries(series)
    .filter(([_, value]) => value)
    .map(([key]) => ({
      dataKey: key,
      label: key,
    }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4}}>
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />

      {isBar ? (
        <BarChart sx={{'& .MuiChartsAxis-tickLabel': {fill: '#fff', },'& .MuiChartsAxis-label': {fill: '#fff',},}}
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
        //   barLabel={seriesY.length === 1 ? "value" : undefined}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart 
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      )}
    </Container >
  );
}

export default GroupChart;