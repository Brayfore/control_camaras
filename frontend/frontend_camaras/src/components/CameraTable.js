/*import React, { useState } from "react";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import "../styles/CameraTable.css";

const CameraTable = ({ dvrs, handleEdit, handleRegister }) => {
  const [page, setPage] = useState(0); // Estado para la página actual
  const rowsPerPage = 9; // Número de filas a mostrar por página

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedDvrs = dvrs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  "Fecha de Inicio",
                  "Fecha Final",
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
                  <TableCell className="table-cell">{dvr.nombre}</TableCell>
                  <TableCell className="table-cell">{dvr.ubicacion}</TableCell>
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
                    <DatePicker
                      label=""
                      value={dvr.fechaInicio || null}
                      onChange={(date) =>
                        handleEdit(dvr.id, "fechaInicio", date)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "small",
                          fullWidth: true,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell className="table-cell">
                    <DatePicker
                      label=""
                      value={dvr.fechaFinal || null}
                      onChange={(date) =>
                        handleEdit(dvr.id, "fechaFinal", date)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "small",
                          fullWidth: true,
                        },
                      }}
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
    </LocalizationProvider>
  );
};

export default CameraTable;*/
//Aquí el código esta perfecto ESTE CÓDIGO ES EL BUENO POR SI PASA CUALQUIER COSA, UTILICE ESTE CÓDIGO
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
  Popover,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import "../styles/CameraTable.css";

const CameraTable = ({ dvrs, handleEdit, handleRegister }) => {
  const [page, setPage] = useState(0); // Estado para la página actual
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el Popover
  const [currentDvrId, setCurrentDvrId] = useState(null); // Para identificar el DVR al que le estamos agregando la observación
  const rowsPerPage = 9; // Número de filas a mostrar por página

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedDvrs = dvrs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Abre el Popover (menú) para la observación
  const handleOpenObservation = (event, dvrId) => {
    setAnchorEl(event.currentTarget);
    setCurrentDvrId(dvrId); // Guardamos el id del DVR actual
  };

  // Cierra el Popover
  const handleCloseObservation = () => {
    setAnchorEl(null);
    setCurrentDvrId(null); // Limpiamos el id del DVR actual
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  "Fecha de Inicio",
                  "Fecha Final",
                  "Verificación AM",
                  "Verificación PM",
                  "Obs.", // Encabezado más corto para observación
                  "Acciones", // Manteniendo las acciones originales
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
                  <TableCell className="table-cell">{dvr.nombre}</TableCell>
                  <TableCell className="table-cell">{dvr.ubicacion}</TableCell>
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
                    <DatePicker
                      label=""
                      value={dvr.fechaInicio || null}
                      onChange={(date) =>
                        handleEdit(dvr.id, "fechaInicio", date)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "small",
                          fullWidth: true,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell className="table-cell">
                    <DatePicker
                      label=""
                      value={dvr.fechaFinal || null}
                      onChange={(date) =>
                        handleEdit(dvr.id, "fechaFinal", date)
                      }
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          size: "small",
                          fullWidth: true,
                        },
                      }}
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

                  {/* Nueva celda para el botón de Observación */}
                  <TableCell className="table-cell">
                    <Button
                      variant="outlined"
                      onClick={(event) => handleOpenObservation(event, dvr.id)}
                    >
                      Obs.
                    </Button>
                  </TableCell>

                  {/* Celda para el botón de Registrar en Acciones */}
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

      {/* Popover para agregar observación */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseObservation}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Observación
          </Typography>
          <TextField
            label="Escriba su observación"
            value={
              paginatedDvrs.find((dvr) => dvr.id === currentDvrId)
                ?.observacion || ""
            }
            onChange={(e) =>
              handleEdit(currentDvrId, "observacion", e.target.value)
            }
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <Button
            onClick={handleCloseObservation}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
};

export default CameraTable;
