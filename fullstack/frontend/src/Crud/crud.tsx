// import { DataGrid, type GridColDef } from "@mui/x-data-grid";
// import { Button, Container, Dialog, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Crud() {
//   const [rows, setRows] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState<any>({});

//   const fetchData = () => {
//     axios.get("http://localhost:5000/api/v1/participations/")
//       .then(res => setRows(res.data.participations.slice(0,100)));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🟢 CREATE / UPDATE
//   const handleSave = () => {
//     if (form.id) {
//       axios.put(`http://localhost:5000/api/v1/participations/${form.id}`, form)
//     } else {
//       axios.post("http://localhost:5000/api/v1/participations/", form)
//     }

//     setOpen(false);
//     fetchData();
//   };

//   // 🔴 DELETE
//   const handleDelete = (id: number) => {
//     axios.delete(`http://localhost:5000/api/v1/participations/${id}`)
//       .then(fetchData);
//   };

//   const columns: GridColDef[] = [
//     { field: "id", width: 90 },
//     { field: "athlete_name", flex: 1 },
//     { field: "year", flex: 1 },

//     {
//       field: "actions",
//       renderCell: (params) => (
//         <>
//           <Button onClick={() => {
//             setForm(params.row);
//             setOpen(true);
//           }}>Edit</Button>

//           <Button color="error" onClick={() => handleDelete(params.row.id)}>
//             Delete
//           </Button>
//         </>
//       )
//     }
//   ];

//   return (
//     <Container>
//       <Button onClick={() => {
//         setForm({});
//         setOpen(true);
//       }}>
//         Add
//       </Button>

//       <DataGrid rows={rows} columns={columns} autoHeight />

//       {/* 🔥 Модалка */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <div style={{ padding: 20 }}>
//           <TextField
//             label="Result Value"
//             value={form.result_value || ""}
//             onChange={(e) => setForm({
//               ...form,
//               result_value: e.target.value
//             })}
//           />

//           <Button onClick={handleSave}>
//             Save
//           </Button>
//         </div>
//       </Dialog>
//     </Container>
//   );
// }

// export default Crud;






































// import { DataGrid, type GridColDef } from "@mui/x-data-grid";
// import {
//   Button,
//   Container,
//   Dialog,
//   TextField,
//   Box,
//   Typography
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/v1/participations/raw";

// function Crud() {
//   const [rows, setRows] = useState<any[]>([]);
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState<any>({
//     id: null,
//     athlete_id: "",
//     games_id: "",
//     event_id: "",
//     coach_id: "",
//     medal_id: "",
//     result_value: "",
//     result_unit: "",
//     is_record_holder: "",
//     notes: ""
//   });

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(API);
//       setRows(res.data.participations);
//     } catch (err) {
//       console.error("Ошибка загрузки:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 🟢 CREATE / UPDATE
//   const handleSave = async () => {
//     try {
//       if (form.id) {
//         await axios.put(`${API}${form.id}`, form);
//       } else {
//         await axios.post(API, form);
//       }

//       setOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error("Ошибка сохранения:", err);
//     }
//   };

//   // 🔴 DELETE
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${API}${id}`);
//       fetchData();
//     } catch (err) {
//       console.error("Ошибка удаления:", err);
//     }
//   };

//   const handleEdit = (row: any) => {
//     setForm({
//       id: row.id,
//       athlete_id: row.athlete_id || "",
//       games_id: row.games_id || "",
//       event_id: row.event_id || "",
//       coach_id: row.coach_id || "",
//       medal_id: row.medal_id || "",
//       result_value: row.result_value || "",
//       result_unit: row.result_unit || "",
//       is_record_holder: row.is_record_holder || "",
//       notes: row.notes || ""
//     });

//     setOpen(true);
//   };

//   const columns: GridColDef[] = [
//     { field: "id", width: 70 },
//     { field: "athlete_id", flex: 1 },
//     { field: "games_id", flex: 1 },
//     { field: "event_id", flex: 1 },
//     { field: "result_value", flex: 1 },

//     {
//       field: "actions",
//       headerName: "Actions",
//       renderCell: (params) => (
//         <>
//           <Button onClick={() => handleEdit(params.row)}>
//             Edit
//           </Button>

//           <Button
//             color="error"
//             onClick={() => handleDelete(params.row.id)}
//           >
//             Delete
//           </Button>
//         </>
//       )
//     }
//   ];

//   return (
//     <Container>
//       <Box sx={{ mb: 2 }}>
//         <Button
//           variant="contained"
//           onClick={() => {
//             setForm({
//               id: null,
//               athlete_id: "",
//               games_id: "",
//               event_id: "",
//               coach_id: "",
//               medal_id: "",
//               result_value: "",
//               result_unit: "",
//               is_record_holder: "",
//               notes: ""
//             });
//             setOpen(true);
//           }}
//         >
//           Add
//         </Button>
//       </Box>

//       <DataGrid rows={rows} columns={columns} autoHeight />

//       {/* 🔥 МОДАЛКА */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, minWidth: 400 }}>
//           <Typography variant="h6">
//             {form.id ? "Edit" : "Create"}
//           </Typography>

//           {[
//             "athlete_id",
//             "games_id",
//             "event_id",
//             "coach_id",
//             "medal_id",
//             "result_value",
//             "result_unit",
//             "is_record_holder",
//             "notes"
//           ].map((field) => (
//             <TextField
//               key={field}
//               label={field}
//               value={form[field] || ""}
//               onChange={(e) =>
//                 setForm({ ...form, [field]: e.target.value })
//               }
//               fullWidth
//             />
//           ))}

//           <Button variant="contained" onClick={handleSave}>
//             Save
//           </Button>
//         </Box>
//       </Dialog>
//     </Container>
//   );
// }

// export default Crud;





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
import Navbar from "../Navbar/Navbar";

const API = "http://localhost:5000/api/v1/participations/";

function Crud() {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    id: null,
    athlete_id: "",
    games_id: "",
    event_id: "",
    coach_id: "",
    medal_id: "",
    result_value: "",
    result_unit: "",
    is_record_holder: "",
    notes: ""
  });

  const fetchData = async () => {
    const res = await axios.get(API + "raw");
    setRows(res.data.participations);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const payload = {
      athlete_id: form.athlete_id,
      games_id: Number(form.games_id),
      event_id: form.event_id,
      coach_id: form.coach_id,
      medal_id: Number(form.medal_id),
      result_value: Number(form.result_value),
      result_unit: form.result_unit,
      is_record_holder: form.is_record_holder,
      notes: form.notes
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
    setForm(row);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", width: 70 },
    { field: "athlete_id", flex: 1 },
    { field: "games_id", flex: 1 },
    { field: "event_id", flex: 1 },
    { field: "result_value", flex: 1 },

    {
      field: "actions",
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
    <Box sx={{mt:10}}>
        
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          setForm({
            id: null,
            athlete_id: "",
            games_id: "",
            event_id: "",
            coach_id: "",
            medal_id: "",
            result_value: "",
            result_unit: "",
            is_record_holder: "",
            notes: ""
          });
          setOpen(true);
        }}
      >
        Add
      </Button>

      <DataGrid rows={rows} columns={columns} autoHeight />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.keys(form)
            .filter((f) => f !== "id")
            .map((field) => (
              <TextField
                key={field}
                label={field}
                value={form[field] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
            ))}

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