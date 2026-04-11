import buildings from "../Table";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';


import { useEffect, useState } from "react";
import axios from "axios";

function BuildingsGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(true);
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1},
    { field: 'Тип', flex: 0.5},
    { field: 'Город', flex: 0.5},
    { field: 'Год' },
    { field: 'Высота'},
  ]
  useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/buildings/", {
        auth: {
            username: 'student',
            password: 'dvfu'
        }
    })
            .then(res => {
                const formatted = res.data.buildings.map((b: any) => ({
        id: b.id,
        Название: b.title,
        Тип: b.type_building?.type,
        Город: b.city?.name,
        Год: b.year,
        Высота: b.height
    }));

    setRows(formatted);
            })
            .catch(err => {
                console.error("Ошибка загрузки:", err);
            })
            .finally(() => setLoading(false));
    }, []);

  return (
   <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
     <DataGrid
       localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
       rows={rows}
       columns={columns}
       showToolbar={true}
    />
   </Container>
 )
}
export default BuildingsGrid;