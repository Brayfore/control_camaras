import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchDvrs, createDvr, deleteDvr, createRegistro } from '../services/apiService';
import ProfileSidebar from './ProfileSidebar';
import CameraTable from './CameraTable';
import Swal from 'sweetalert2'
import '../styles/CameraControlSystem.css';  // Importamos el archivo CSS

const CameraControlSystem = () => {
  const [dvrs, setDvrs] = useState([]);
  const [showCameraControl, setShowCameraControl] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dvrsData = await fetchDvrs();
        setDvrs(dvrsData.map(dvr => ({
          ...dvr,
          diasGrabacion: '',
          verificacionAM: false,
          verificacionPM: false,
          amDisabled: false,
          pmDisabled: false,
        })));
      } catch (error) {
        console.error('Failed to load DVRs:', error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (id, field, value) => {
    const currentHour = new Date().getHours();
  
    // Restringir la selección de la verificación PM antes de las 12 PM (mediodía)
    if (field === 'verificacionPM' && currentHour < 12) {
      Swal.fire({
        icon: 'info',
        title: 'Verificación Restringida',
        text: 'La verificación PM solo puede seleccionarse después de las 12:00 PM.',
      });
      return;
    }
  
    setDvrs(prevDvrs => prevDvrs.map(dvr => 
      dvr.id === id ? { ...dvr, [field]: value } : dvr
    ));
  };
  

  const handleRegister = async (id) => {
    const dvr = dvrs.find(dvr => dvr.id === id);
  
    // Verificar que al menos una verificación esté seleccionada
    if (!dvr.verificacionAM && !dvr.verificacionPM) {
      Swal.fire({
        icon: 'warning',
        title: 'Registro Incompleto',
        text: 'Debe seleccionar al menos una verificación (AM o PM) para registrar.',
      });
      return;
    }
  
    const registroData = {
      dvr: id,
      dias_grabacion: dvr.diasGrabacion,
      verificacion_am: dvr.verificacionAM,
      verificacion_pm: dvr.verificacionPM,
    };
  
    try {
      await createRegistro(registroData);
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El registro se ha creado correctamente.',
      });
  
      if (dvr.verificacionAM) {
        handleEdit(id, 'amDisabled', true);
        handleEdit(id, 'verificacionAM', false);
      }
  
      if (dvr.verificacionPM) {
        handleEdit(id, 'pmDisabled', true);
        handleEdit(id, 'verificacionPM', false);
      }
    } catch (error) {
      console.error('Error creating registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el registro.',
      });
    }
  };
  

  const handleCreateDvr = async (newDvrData) => {
    try {
      const newDvr = await createDvr(newDvrData);
      setDvrs([...dvrs, {
        ...newDvr,
        diasGrabacion: '',
        verificacionAM: false,
        verificacionPM: false,
        amDisabled: false,
        pmDisabled: false,
      }]);
    } catch (error) {
      console.error('Error creating DVR:', error);
    }
  };

  const handleDeleteDvr = async (id) => {
    try {
      await deleteDvr(id);
      setDvrs(dvrs.filter(dvr => dvr.id !== id));
    } catch (error) {
      console.error('Error deleting DVR:', error);
    }
  };

  const toggleContentVisibility = () => {
    setShowCameraControl(true);
  };

  const username = localStorage.getItem('username');

  return (
    <Box className="camera-control-system">
      <ProfileSidebar
        username={username}
        handleLogout={() => {
          localStorage.removeItem('uid');
          localStorage.removeItem('username');
          window.location.href = '/';
        }}
        dvrs={dvrs}
        onCreateDvr={handleCreateDvr}
        onDeleteDvr={handleDeleteDvr}
        onShowCameraControl={toggleContentVisibility}
      />

      <Box className="camera-control-content">
        {showCameraControl ? (
          <Box className="camera-table-wrapper">
            <Typography variant="h4" gutterBottom sx={{ color: '#003366', textAlign: 'center' }}>
              Control de Cámaras
            </Typography>
            <CameraTable
              dvrs={dvrs}
              handleEdit={handleEdit}
              handleRegister={handleRegister}
            />
          </Box>
        ) : (
          <Typography
            variant="h4"
            gutterBottom
            className="welcome-message"
          >
            Bienvenido al Control de Cámaras
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CameraControlSystem;