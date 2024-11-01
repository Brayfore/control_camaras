import React, { useState } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const DvrCreateModal = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ip: '',
    capacidad: '',
    puertos: '',
    ubicacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate(formData);  // No necesitamos asignar newDvr si no la usamos
      setFormData({
        nombre: '',
        ip: '',
        capacidad: '',
        puertos: '',
        ubicacion: '',
      });
      onClose();

      // Mostrar alerta de éxito usando SweetAlert2
      Swal.fire({
        title: 'DVR Creado',
        text: 'El DVR ha sido creado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el DVR.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>Registrar DVR</Typography>

        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="IP"
          name="ip"
          value={formData.ip}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Almacenamiento"
          name="capacidad"
          value={formData.capacidad}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Puertos"
          name="puertos"
          value={formData.puertos}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Ubicación"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Registrar
        </Button>
      </Box>
    </Modal>
  );
};

export default DvrCreateModal;
