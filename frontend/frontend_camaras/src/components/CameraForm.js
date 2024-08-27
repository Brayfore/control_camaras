import React from 'react';
import { Box, Typography, TextField, Button, Checkbox } from '@mui/material';
import '../styles/CameraForm.css';  // Importamos el archivo CSS

const CameraForm = ({ newCamera, handleInputChange, handleCheckboxChange, handleSubmit, editId }) => (
  <Box className="camera-form">
    <Typography variant="h6" gutterBottom>Registrar Verificación</Typography>
    <Box component="form" onSubmit={handleSubmit} className="form-grid">
      <TextField
        label="Días de Grabación"
        name="diasGrabacion"
        value={newCamera.diasGrabacion || ''}
        onChange={handleInputChange}
        type="number"
        fullWidth
      />
      <Box className="checkbox-container">
        <Checkbox
          checked={newCamera.verificacionAM || false}
          onChange={() => handleCheckboxChange('verificacionAM')}
        />
        <Typography>Verificación AM</Typography>
      </Box>
      <Box className="checkbox-container">
        <Checkbox
          checked={newCamera.verificacionPM || false}
          onChange={() => handleCheckboxChange('verificacionPM')}
        />
        <Typography>Verificación PM</Typography>
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {editId ? 'Actualizar' : 'Registrar'}
      </Button>
    </Box>
  </Box>
);

export default CameraForm;
