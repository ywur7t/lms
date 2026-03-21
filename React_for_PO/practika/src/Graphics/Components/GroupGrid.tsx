import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import  {type BaseGroup } from "../../assets/groupdata";

type GroupProps = {
  data: BaseGroup;
};

function GroupGrid({ data }: GroupProps) {
  const columns: GridColDef[] = [
  { field: "Группа", headerName: "Группа", flex: 1 },
  { field: "Min", headerName: "Мин", flex: 1 },
  { field: "Max", headerName: "Макс", flex: 1 },
  { field: "Avg", headerName: "Средняя", flex: 1 },
];


    return (
    <Box  sx={{ height: 400, }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );




}

export default GroupGrid;