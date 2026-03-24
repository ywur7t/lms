// import participations from "../../assets/tabledata"; //
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

import { useEffect, useState } from "react";
import axios from "axios";

function ParticipationsGrid() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState(true);
    const columns: GridColDef[] = [
        {field: 'athlete_name', flex:1},
        {field: 'birth_date', flex:0.5},
        {field: 'coach_name', flex:0.5},
        {field: 'gender', flex:0.5},
        {field: 'year', flex:0.5},
        {field: 'host_city', flex:0.5},
        {field: 'medal', flex:0.5},
        {field: 'is_record_holder', flex:0.5},
        {field: 'result_unit', flex:0.5},
        {field: 'result_value', flex:0.5},
        {field: 'height', flex:0.5},
        {field: 'weight', flex:0.5},
        {field: 'notes', flex:0.5},
    ]
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/participations/")
            .then(res => {
                setRows(res.data.participations);
            })
            .catch(err => {
                console.error("Ошибка загрузки:", err);
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <Container maxWidth={false} sx={{height: '85vh', width: "90vw !important", mt: '10vh', }}>
     <DataGrid
       localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
       rows={rows}
       columns={columns}
       showToolbar={true}
    />
   </Container>
    )
} export default ParticipationsGrid;

