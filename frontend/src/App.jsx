import React from "react";
import StudentList from "./components/StudentList";
import { Container, Typography } from "@mui/material";


function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: "Times New Roman", fontWeight: "bold" }}>
        React + Spring Boot Integration (CRUD)
      </Typography>
      <StudentList />
    </Container>
  );
}

export default App;
