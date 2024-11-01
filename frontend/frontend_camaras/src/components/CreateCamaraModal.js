import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  fetchCamarasByDvr, // Esta función debería obtener solo las cámaras del DVR seleccionado
  createCamara,
  fetchDvrs,
} from "../services/apiService"; // Asegúrate de importar fetchDvrs

const CreateCamaraModal = ({ open, onClose }) => {
  const [dvrs, setDvrs] = useState([]); // Todos los DVRs disponibles
  const [selectedDvr, setSelectedDvr] = useState(""); // DVR seleccionado
  const [camaraName, setCamaraName] = useState(""); // Nombre de la cámara
  const [puertosDisponibles, setPuertosDisponibles] = useState([]); // Puertos disponibles para el DVR seleccionado
  const [selectedPuerto, setSelectedPuerto] = useState(""); // Puerto seleccionado

  // Función para cargar las cámaras y obtener los puertos ocupados solo del DVR seleccionado
  const loadCamaras = useCallback(async () => {
    if (selectedDvr) {
      try {
        const camaras = await fetchCamarasByDvr(selectedDvr); // Solo obtener cámaras del DVR seleccionado

        // Obtener los puertos ocupados de las cámaras asociadas al DVR seleccionado
        const puertosOcupados = camaras.map((camara) => camara.puerto);

        // Buscar el DVR seleccionado en la lista de DVRs y obtener su cantidad total de puertos
        const dvrSeleccionado = dvrs.find((dvr) => dvr.id === selectedDvr);
        const totalPuertos = dvrSeleccionado ? dvrSeleccionado.puertos : 0;

        // Generar una lista de puertos disponibles excluyendo los ocupados solo para el DVR seleccionado
        const puertosDisponibles = Array.from(
          { length: totalPuertos },
          (_, i) => i + 1
        ).filter((puerto) => !puertosOcupados.includes(puerto));

        setPuertosDisponibles(puertosDisponibles); // Actualiza la lista de puertos disponibles
      } catch (error) {
        console.error("Error al cargar las cámaras del DVR:", error);
        setPuertosDisponibles([]); // Manejo de errores: No hay puertos disponibles
      }
    } else {
      setPuertosDisponibles([]); // Si no hay DVR seleccionado, no mostrar puertos
    }
  }, [selectedDvr, dvrs]); // Se asegura que useCallback dependa de selectedDvr y dvrs

  // Cargar todos los DVRs al cargar el componente
  useEffect(() => {
    const loadDvrs = async () => {
      try {
        const dvrData = await fetchDvrs(); // Asegúrate de que fetchDvrs esté bien implementado
        setDvrs(dvrData); // Carga los DVRs disponibles
      } catch (error) {
        console.error("Error al cargar DVRs:", error);
      }
    };

    loadDvrs(); // Cargar DVRs al montar el componente
  }, []);

  // Cargar las cámaras del DVR seleccionado para verificar los puertos ocupados solo para ese DVR
  useEffect(() => {
    loadCamaras(); // Llama a loadCamaras cada vez que cambie el DVR seleccionado o la lista de DVRs
  }, [loadCamaras]); // Se asegura de que el hook se ejecute cuando loadCamaras cambie

  // Función para manejar la creación de la cámara
  const handleCreateCamara = async () => {
    try {
      await createCamara({
        nombre: camaraName,
        dvr: selectedDvr,  // ID del DVR seleccionado
        puerto: selectedPuerto  // Puerto seleccionado
      });

      // Usamos SweetAlert2 para mostrar el mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Cámara creada correctamente',
        showConfirmButton: true,
        timer: 1500
      });

      // Reiniciar los campos del formulario
      setCamaraName('');
      setSelectedPuerto('');

      // Cerrar el modal
      onClose();

      // Volver a cargar las cámaras y puertos ocupados después de la creación
      await loadCamaras();
    } catch (error) {
      console.error('Error al crear la cámara:', error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear la cámara. Puede que el puerto ya esté en uso.',
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Crear Cámara
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Seleccione un DVR</InputLabel>
          <Select
            value={selectedDvr}
            onChange={(e) => setSelectedDvr(e.target.value)}
            label="Seleccione un DVR"
          >
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
          onClick={handleCreateCamara}  // Ahora la función handleCreateCamara está definida
          disabled={!selectedDvr || !camaraName || !selectedPuerto}
        >
          CREAR CÁMARA
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateCamaraModal;
