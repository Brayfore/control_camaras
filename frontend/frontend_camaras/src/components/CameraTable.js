import React, { useState } from "react";
import {
  Box,
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
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import '../styles/CameraTable.css';

const CameraTable = ({ dvrs, handleEdit, handleRegister }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 9;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedDvrs = dvrs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="camera-table-container">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead className="table-head">
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
                <TableCell key={header} className="table-cell-header">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDvrs.map((dvr) => (
              <TableRow key={dvr.id} className="table-row">
                <TableCell className="table-cell">
                  {new Date().toLocaleDateString()}
                </TableCell>
                <TableCell className="table-cell">
                  {dvr.nombre}
                </TableCell>
                <TableCell className="table-cell">
                  {dvr.ubicacion}
                </TableCell>
                <TableCell className="table-cell">
                  <TextField
                    type="number"
                    name="diasGrabacion"
                    value={dvr.diasGrabacion || ""}
                    onChange={(e) =>
                      handleEdit(dvr.id, "diasGrabacion", e.target.value)
                    }
                    className="text-field"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Checkbox
                    checked={dvr.verificacionAM || false}
                    onChange={(e) =>
                      handleEdit(dvr.id, "verificacionAM", e.target.checked)
                    }
                    className="checkbox"
                    disabled={dvr.amDisabled}
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Checkbox
                    checked={dvr.verificacionPM || false}
                    onChange={(e) =>
                      handleEdit(dvr.id, "verificacionPM", e.target.checked)
                    }
                    className="checkbox"
                    disabled={dvr.pmDisabled}
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Button
                    variant="contained"
                    onClick={() => handleRegister(dvr.id)}
                    className="register-button"
                    startIcon={<AssignmentTurnedInIcon />}
                  >
                    Registrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="pagination">
          <Button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="pagination-button"
          >
            Anterior
          </Button>
          <Button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(dvrs.length / rowsPerPage) - 1}
            className="pagination-button"
          >
            Siguiente
          </Button>
        </div>
      </TableContainer>
    </Box>
  );
};

export default CameraTable;
