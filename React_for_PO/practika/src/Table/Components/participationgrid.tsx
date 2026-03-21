import participations from "../../assets/tabledata";
import { DataGrid, type GridRowsProp, type GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function ParticipationsGrid() {
    const rows: GridRowsProp = participations;
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

