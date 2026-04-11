import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Container,
  Dialog,
  TextField,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000/api/v1/buildings/";

function Crud() {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    id: null,
    title: "",
    height: "",
    year: "",
    city_id: "",
    type_building_id: ""
  });

  const fetchData = async () => {
  const res = await axios.get(API, {
    auth: {
      username: "student",
      password: "dvfu"
    }
  });
  setRows(res.data.buildings);
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const payload = {
      title: form.title,
      height: Number(form.height),
      year: Number(form.year),
      city_id: Number(form.city_id),
      type_building_id: Number(form.type_building_id)
    };

    if (form.id) {
      await axios.put(API + form.id, payload);
    } else {
      await axios.post(API, payload);
    }

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(API + id);
    fetchData();
  };

  const handleEdit = (row: any) => {
    setForm({
      id: row.id,
      title: row.title,
      height: row.height,
      year: row.year,
      city_id: row.city_id,
      type_building_id: row.type_building_id
    });
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", width: 70 },
    { field: "title", headerName: "Название", flex: 1 },
    { field: "height", headerName: "Высота", flex: 1 },
    { field: "year", headerName: "Год", flex: 1 },

{
  field: "city",
  headerName: "Город",
  flex: 1,
  valueGetter: (_, row) => row?.city?.name || ""
},
{
  field: "type_building",
  headerName: "Тип",
  flex: 1,
  valueGetter: (_, row) => row?.type_building?.type || ""
},

    {
      field: "actions",
      headerName: "Действия",
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button color="error" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <Navbar />

      <Box sx={{ mt: 10 }}>
        <Container>
          <Button
            variant="contained"
            onClick={() => {
              setForm({
                id: null,
                title: "",
                height: "",
                year: "",
                city_id: "",
                type_building_id: ""
              });
              setOpen(true);
            }}
          >
            Add
          </Button>

          <DataGrid rows={rows} columns={columns} autoHeight />

          <Dialog open={open} onClose={() => setOpen(false)}>
            <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              
              <TextField
                label="Название"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <TextField
                label="Высота"
                value={form.height}
                onChange={(e) =>
                  setForm({ ...form, height: e.target.value })
                }
              />

              <TextField
                label="Год"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value })
                }
              />

              <TextField
                label="City ID"
                value={form.city_id}
                onChange={(e) =>
                  setForm({ ...form, city_id: e.target.value })
                }
              />

              <TextField
                label="Type Building ID"
                value={form.type_building_id}
                onChange={(e) =>
                  setForm({ ...form, type_building_id: e.target.value })
                }
              />

              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}

export default Crud;