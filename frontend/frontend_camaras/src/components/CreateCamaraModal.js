import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchDvrs, fetchCamarasByDvr, createCamara } from '../services/apiService'; // Asegúrate de que los paths sean correctos

const CreateCamaraModal = ({ open, onClose }) => {
  const [dvrs, setDvrs] = useState([]);
  const [selectedDvr, setSelectedDvr] = useState('');
  const [camaraName, setCamaraName] = useState('');
  const [puertosDisponibles, setPuertosDisponibles] = useState([]);
  const [selectedPuerto, setSelectedPuerto] = useState('');

  // Cargar todos los DVRs al cargar el componente
// Cargar todos los DVRs al cargar el componente
useEffect(() => {
    const loadDvrs = async () => {
      try {
        const dvrData = await fetchDvrs();  // Esta llamada debería traer todos los DVRs
        setDvrs(dvrData);  // Asegúrate de actualizar correctamente el estado con los DVRs
      } catch (error) {
        console.error('Error al cargar DVRs:', error);
      }
    };
  
    loadDvrs();
  }, []);
  
  // Cargar las cámaras de un DVR específico para verificar los puertos ocupados
  useEffect(() => {
    if (selectedDvr) {
      const loadCamaras = async () => {
        const camaras = await fetchCamarasByDvr(selectedDvr);
  
        // Obtener los puertos ocupados de las cámaras asociadas a este DVR
        const puertosOcupados = camaras.map(camara => camara.puerto);
  
        // Generar la lista de puertos disponibles en base al número total de puertos del DVR y los ocupados
        const dvrSeleccionado = dvrs.find(dvr => dvr.id === selectedDvr);
        const totalPuertos = dvrSeleccionado ? dvrSeleccionado.puertos : 0;
  
        // Asegurarse de que solo se muestren puertos no ocupados
        const puertosDisponibles = Array.from({ length: totalPuertos }, (_, i) => i + 1).filter(puerto => !puertosOcupados.includes(puerto));
  
        setPuertosDisponibles(puertosDisponibles);
      };
      loadCamaras();
    }
  }, [selectedDvr, dvrs]);
  

  const handleCreateCamara = async () => {
    try {
      await createCamara({ nombre: camaraName, dvr: selectedDvr, puerto: selectedPuerto });
      alert('Cámara creada exitosamente');
      setCamaraName('');
      setSelectedPuerto('');
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear la cámara:', error);
      alert('Error al crear la cámara. Puede que el puerto ya esté en uso.');
    }
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
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
        <Typography variant="h6" gutterBottom>Crear Cámara</Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Seleccione un DVR</InputLabel>
          <Select value={selectedDvr} onChange={(e) => setSelectedDvr(e.target.value)} label="Seleccione un DVR">
            {dvrs.length > 0 ? (
              dvrs.map((dvr) => (
                <MenuItem key={dvr.id} value={dvr.id}>
                  {dvr.nombre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No hay DVRs disponibles</MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          label="Nombre de la Cámara *"
          value={camaraName}
          onChange={(e) => setCamaraName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Seleccione un Puerto</InputLabel>
          <Select
            value={selectedPuerto}
            onChange={(e) => setSelectedPuerto(e.target.value)}
            label="Seleccione un Puerto"
          >
            {puertosDisponibles.length > 0 ? (
              puertosDisponibles.map((puerto) => (
                <MenuItem key={puerto} value={puerto}>
                  {puerto}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No hay puertos disponibles</MenuItem>
            )}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateCamara}
          disabled={!selectedDvr || !camaraName || !selectedPuerto} // Deshabilita el botón si falta algún campo
        >
          CREAR CÁMARA
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateCamaraModal;
