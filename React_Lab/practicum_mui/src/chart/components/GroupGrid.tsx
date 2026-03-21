import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import  {type tGroup } from "../groupdata";

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const columns: GridColDef[] = [
    { field: "Страна", headerName: "Страна", flex: 1 },
    { field: "Минимальная высота", headerName: "Мин", flex: 1 },
    { field: "Максимальная высота", headerName: "Макс", flex: 1 },
    { field: "Средняя высота", headerName: "Средняя", flex: 1 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
}

export default GroupGrid;