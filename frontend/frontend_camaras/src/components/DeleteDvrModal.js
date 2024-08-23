import React, { useState } from 'react';
import { Box, Modal, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const DeleteDvrModal = ({ open, onClose, dvrs, handleDelete }) => {
  const [selectedDvr, setSelectedDvr] = useState('');

  const handleSelectChange = (event) => {
    setSelectedDvr(event.target.value);
  };

  const handleDeleteClick = () => {
    handleDelete(selectedDvr);
    setSelectedDvr('');  // Reiniciar el valor seleccionado después de la eliminación
    onClose(); // Cerrar el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>Eliminar DVR</Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-dvr-label">Seleccione un DVR</InputLabel>
          <Select
            labelId="select-dvr-label"
            value={selectedDvr}
            onChange={handleSelectChange}
            label="Seleccione un DVR"
          >
            {dvrs.map((dvr) => (
              <MenuItem key={dvr.id} value={dvr.id}>
                {dvr.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleDeleteClick}
          sx={{ mt: 2}}
          disabled={!selectedDvr}  // Desactivar botón si no hay DVR seleccionado
        >
          Eliminar DVR
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteDvrModal;

