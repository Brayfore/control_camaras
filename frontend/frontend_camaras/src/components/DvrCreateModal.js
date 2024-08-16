import React, { useState } from 'react';
import { Box, Modal, TextField, Button, Typography } from '@mui/material';

const DvrCreateModal = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ip: '',
    capacidad: '',
    puertos: '',
    ubicacion: '',
  });

  const [error, setError] = useState(null);

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
      const newDvr = await onCreate(formData);
      setFormData({
        nombre: '',
        ip: '',
        capacidad: '',
        puertos: '',
        ubicacion: '',
      });
      onClose();
    } catch (error) {
      setError('DVR CREADO CORRECTAMENTE.');
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
        {error && <Typography color="green" gutterBottom>{error}</Typography>}
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
          label="Capacidad"
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
