/*import React from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Checkbox, TextField } from '@mui/material';

const CameraTable = ({ dvrs, handleEdit, handleRegister }) => (
  <Box sx={{ flex: '2', bgcolor: '#ffffff', p: 2, borderRadius: 2, boxShadow: 2 }}>
    <Typography variant="h6" gutterBottom>Tablas</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>DVR</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Días de Grabación</TableCell>
            <TableCell>Verificación AM</TableCell>
            <TableCell>Verificación PM</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dvrs.map((dvr) => (
            <TableRow key={dvr.id}>
              <TableCell>{new Date().toLocaleDateString()}</TableCell>
              <TableCell>{dvr.nombre}</TableCell>
              <TableCell>{dvr.ubicacion}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  name="diasGrabacion"
                  value={dvr.diasGrabacion || ''}
                  onChange={(e) => handleEdit(dvr.id, 'diasGrabacion', e.target.value)}
                  fullWidth
                  sx={{width: '80px' }}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={dvr.verificacionAM || false}
                  onChange={(e) => handleEdit(dvr.id, 'verificacionAM', e.target.checked)}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={dvr.verificacionPM || false}
                  onChange={(e) => handleEdit(dvr.id, 'verificacionPM', e.target.checked)}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleRegister(dvr.id)}>
                  Registrar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default CameraTable;*/
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";

const CameraTable = ({ dvrs, handleEdit, handleRegister }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 9; // Mostrar 5 DVRs por página

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedDvrs = dvrs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        backgroundColor: "#f0f4f7",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Título centrado */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
            color: "#ffffff",
            backgroundColor: "#003366",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Control de Cámaras
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#003366" }}>
            <TableRow>
              {[
                "Fecha",
                "DVR",
                "Ubicación",
                "Días de Grabación",
                "Verificación AM",
                "Verificación PM",
                "Acciones",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#ffffff",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "12px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDvrs.map((dvr) => (
              <TableRow
                key={dvr.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:nth-of-type(even)": { backgroundColor: "#ffffff" },
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  {new Date().toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  {dvr.nombre}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  {dvr.ubicacion}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  <TextField
                    type="number"
                    name="diasGrabacion"
                    value={dvr.diasGrabacion || ""}
                    onChange={(e) =>
                      handleEdit(dvr.id, "diasGrabacion", e.target.value)
                    }
                    sx={{
                      maxWidth: "80px",
                      padding: "3px",
                      margin: "auto",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#cccccc" },
                        "&:hover fieldset": { borderColor: "#003366" },
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  <Checkbox
                    checked={dvr.verificacionAM || false}
                    onChange={(e) =>
                      handleEdit(dvr.id, "verificacionAM", e.target.checked)
                    }
                    sx={{
                      color: "#003366",
                      "&.Mui-checked": { color: "#003366" },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  <Checkbox
                    checked={dvr.verificacionPM || false}
                    onChange={(e) =>
                      handleEdit(dvr.id, "verificacionPM", e.target.checked)
                    }
                    sx={{
                      color: "#003366",
                      "&.Mui-checked": { color: "#003366" },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegister(dvr.id)}
                    sx={{
                      backgroundColor: "#003366",
                      "&:hover": { backgroundColor: "#002244" },
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s ease",
                      display: "flex", // Asegura que el ícono y el texto se alineen correctamente
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px", // Añade un espacio entre el ícono y el texto
                    }}
                    startIcon={<SaveIcon />} // Añade el ícono de guardar al inicio del botón
                  >
                    Registrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            sx={{
              backgroundColor: "#f0f4f7",
              "&:hover": { backgroundColor: "#003366", color: "#ffffff" },
              transition: "background-color 0.3s ease",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Anterior
          </Button>
          <Button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(dvrs.length / rowsPerPage) - 1}
            sx={{
              backgroundColor: "#f0f4f7",
              "&:hover": { backgroundColor: "#003366", color: "#ffffff" },
              transition: "background-color 0.3s ease",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              marginLeft: "10px",
            }}
          >
            Siguiente
          </Button>
        </div>
      </TableContainer>
    </Box>
  );
};

export default CameraTable;
