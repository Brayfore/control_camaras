import React from 'react';
import { Box, Typography, TextField, Button, Checkbox } from '@mui/material';

const CameraForm = ({ newCamera, handleInputChange, handleCheckboxChange, handleSubmit, editId }) => (
  <Box sx={{ flex: '1', bgcolor: '#f4f4f4', p: 2, borderRadius: 2, boxShadow: 2 }}>
    <Typography variant="h6" gutterBottom>Registrar Verificación</Typography>
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Días de Grabación"
        name="diasGrabacion"
        value={newCamera.diasGrabacion || ''}
        onChange={handleInputChange}
        type="number"
        fullWidth
        sx={{ bgcolor: 'white' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={newCamera.verificacionAM || false}
          onChange={() => handleCheckboxChange('verificacionAM')}
          sx={{ color: 'primary.main' }}
        />
        <Typography>Verificación AM</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={newCamera.verificacionPM || false}
          onChange={() => handleCheckboxChange('verificacionPM')}
          sx={{ color: 'primary.main' }}
        />
        <Typography>Verificación PM</Typography>
      </Box>
      <Button type="submit" variant="contained" color="primary">{editId ? 'Actualizar' : 'Registrar'}</Button>
    </Box>
  </Box>
);

export default CameraForm;
