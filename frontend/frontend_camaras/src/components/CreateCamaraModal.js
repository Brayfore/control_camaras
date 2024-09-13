import React, { useState, useEffect } from "react";
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
  fetchCamarasByDvr,
  createCamara,
  fetchDvrs,
} from "../services/apiService"; // Asegúrate de importar fetchDvrs

const CreateCamaraModal = ({ open, onClose }) => {
  const [dvrs, setDvrs] = useState([]);
  const [selectedDvr, setSelectedDvr] = useState("");
  const [camaraName, setCamaraName] = useState("");
  const [puertosDisponibles, setPuertosDisponibles] = useState([]);
  const [selectedPuerto, setSelectedPuerto] = useState("");

  // Función para cargar las cámaras y obtener los puertos ocupados
  const loadCamaras = async () => {
    if (selectedDvr) {
      try {
        const camaras = await fetchCamarasByDvr(selectedDvr);

        // Obtener los puertos ocupados de las cámaras asociadas al DVR seleccionado
        const puertosOcupados = camaras.map((camara) => camara.puerto);

        // Buscar el DVR seleccionado en la lista de DVRs y obtener su cantidad total de puertos
        const dvrSeleccionado = dvrs.find((dvr) => dvr.id === selectedDvr);
        const totalPuertos = dvrSeleccionado ? dvrSeleccionado.puertos : 0;

        // Generar una lista de puertos disponibles excluyendo los ocupados
        const puertosDisponibles = Array.from(
          { length: totalPuertos },
          (_, i) => i + 1
        ).filter((puerto) => !puertosOcupados.includes(puerto));

        setPuertosDisponibles(puertosDisponibles);
      } catch (error) {
        console.error("Error al cargar las cámaras del DVR:", error);
        setPuertosDisponibles([]);
      }
    } else {
      setPuertosDisponibles([]);
    }
  };

  // Cargar todos los DVRs al cargar el componente
  useEffect(() => {
    const loadDvrs = async () => {
      try {
        const dvrData = await fetchDvrs(); // Asegúrate de que fetchDvrs esté bien implementado
        setDvrs(dvrData);
      } catch (error) {
        console.error("Error al cargar DVRs:", error);
      }
    };

    loadDvrs();
  }, []);

  // Cargar las cámaras de un DVR específico para verificar los puertos ocupados
  useEffect(() => {
    loadCamaras();
  }, [selectedDvr, dvrs]);

  // Función para manejar la creación de la cámara
  const handleCreateCamara = async () => {
    try {
      await createCamara({
        nombre: camaraName,
        dvr: selectedDvr,  // ID del DVR seleccionado
        puerto: selectedPuerto  // Puerto seleccionado
      });

      alert('Cámara creada exitosamente');

      // Reiniciar los campos del formulario
      setCamaraName('');
      setSelectedPuerto('');

      // Cerrar el modal
      onClose();

      // Volver a cargar las cámaras y puertos ocupados después de la creación
      await loadCamaras();
    } catch (error) {
      console.error('Error al crear la cámara:', error.response || error);
      alert('Error al crear la cámara. Puede que el puerto ya esté en uso.');
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
