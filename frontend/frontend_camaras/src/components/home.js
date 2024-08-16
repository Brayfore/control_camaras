/*import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { fetchDvrs, createDvr, deleteDvr, createRegistro } from '../services/apiService';
import ProfileSidebar from './ProfileSidebar';
import CameraTable from './CameraTable';

const CameraControlSystem = () => {
  const [dvrs, setDvrs] = useState([]);
  const [file, setFile] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dvrsData = await fetchDvrs(); 
        setDvrs(dvrsData.map(dvr => ({ ...dvr, diasGrabacion: '', verificacionAM: false, verificacionPM: false })));
      } catch (error) {
        console.error('Failed to load DVRs:', error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (id, field, value) => {
    setDvrs(prevDvrs => prevDvrs.map(dvr => 
      dvr.id === id ? { ...dvr, [field]: value } : dvr
    ));
  };

  const handleRegister = async (id) => {
    const dvr = dvrs.find(dvr => dvr.id === id);
    const registroData = {
      dvr: id,
      dias_grabacion: dvr.diasGrabacion,
      verificacion_am: dvr.verificacionAM,
      verificacion_pm: dvr.verificacionPM,
    };
    try {
      await createRegistro(registroData);
      alert('Registro creado correctamente.');
    } catch (error) {
      console.error('Error creating registro:', error);
      alert('Error al crear el registro.');
    }
  };

  const handleCreateDvr = async (newDvrData) => {
    try {
      const newDvr = await createDvr(newDvrData);
      setDvrs([...dvrs, { ...newDvr, diasGrabacion: '', verificacionAM: false, verificacionPM: false }]);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const username = localStorage.getItem('username');

  return (
    <Container>
      <ProfileSidebar
        file={file}
        username={username}
        handleFileChange={handleFileChange}
        handleLogout={handleLogout}
        dvrs={dvrs}
        onCreateDvr={handleCreateDvr}
        onDeleteDvr={handleDeleteDvr}
        toggleContentVisibility={toggleContentVisibility}
        isContentVisible={isContentVisible}
      />

      <Box sx={{ marginLeft: '300px', padding: 2 }}>
        <Box
          sx={{
            background: 'linear-gradient(to right, #003366, #0066cc)',
            color: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>CONTROL DE CÁMARAS</Typography>
        </Box>

        {isContentVisible && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <CameraTable
              dvrs={dvrs}
              handleEdit={handleEdit}
              handleRegister={handleRegister}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CameraControlSystem;*/

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { fetchDvrs, createDvr, deleteDvr, createRegistro } from '../services/apiService';
import ProfileSidebar from './ProfileSidebar';
import CameraTable from './CameraTable';

const CameraControlSystem = () => {
  const [dvrs, setDvrs] = useState([]);
  const [file, setFile] = useState(null);
  const [showCameraControl, setShowCameraControl] = useState(false); // Nuevo estado para mostrar el control de cámaras

  useEffect(() => {
    const loadData = async () => {
      try {
        const dvrsData = await fetchDvrs(); 
        setDvrs(dvrsData.map(dvr => ({ ...dvr, diasGrabacion: '', verificacionAM: false, verificacionPM: false })));
      } catch (error) {
        console.error('Failed to load DVRs:', error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (id, field, value) => {
    setDvrs(prevDvrs => prevDvrs.map(dvr => 
      dvr.id === id ? { ...dvr, [field]: value } : dvr
    ));
  };

  const handleRegister = async (id) => {
    const dvr = dvrs.find(dvr => dvr.id === id);
    const registroData = {
      dvr: id,
      dias_grabacion: dvr.diasGrabacion,
      verificacion_am: dvr.verificacionAM,
      verificacion_pm: dvr.verificacionPM,
    };
    try {
      await createRegistro(registroData);
      alert('Registro creado correctamente.');
    } catch (error) {
      console.error('Error creating registro:', error);
      alert('Error al crear el registro.');
    }
  };

  const handleCreateDvr = async (newDvrData) => {
    try {
      const newDvr = await createDvr(newDvrData);
      setDvrs([...dvrs, { ...newDvr, diasGrabacion: '', verificacionAM: false, verificacionPM: false }]);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const toggleContentVisibility = () => {
    setShowCameraControl(!showCameraControl); // Cambia el estado para mostrar u ocultar el control de cámaras
  };

  const username = localStorage.getItem('username');

  return (
    <Container>
      <ProfileSidebar
        file={file}
        username={username}
        handleFileChange={handleFileChange}
        handleLogout={handleLogout}
        dvrs={dvrs}
        onCreateDvr={handleCreateDvr}
        onDeleteDvr={handleDeleteDvr}
        onShowCameraControl={toggleContentVisibility} // Pasar la función para mostrar el control de cámaras
      />

      <Box sx={{ marginLeft: '300px', padding: 2 }}>
        <Box
          sx={{
            background: 'linear-gradient(to right, #003366, #0066cc)',
            color: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {showCameraControl ? "CONTROL DE CÁMARAS" : "BIENVENIDO"} {/* Mostrar mensaje o control de cámaras */}
          </Typography>
        </Box>

        {showCameraControl && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <CameraTable
              dvrs={dvrs}
              handleEdit={handleEdit}
              handleRegister={handleRegister}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CameraControlSystem;
