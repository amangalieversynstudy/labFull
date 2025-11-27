import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const API_URL = "http://localhost:8081/api/students";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const load = () => {
    axios.get(API_URL).then((res) => setStudents(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ name: "", email: "" });
    setOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditId(student.id);
    setForm({ name: student.name, email: student.email });
    setOpen(true);
  };

  const handleSave = () => {
    if (editId === null) {
      axios.post(API_URL, form).then(() => load());
    } else {
      axios.put(`${API_URL}/${editId}`, form).then(() => load());
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => load());
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>

      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ mb: 2 }}>
        Add Student
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>

                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenEdit(s)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleDelete(s.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId === null ? "Add Student" : "Edit Student"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1} sx={{ minWidth: 300 }}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}