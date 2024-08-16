import React from 'react';
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

export default CameraTable;
