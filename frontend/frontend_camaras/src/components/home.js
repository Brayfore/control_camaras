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

export default CameraControlSystem;

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { fetchDvrs, createDvr, deleteDvr, createRegistro } from '../services/apiService';
import ProfileSidebar from './ProfileSidebar';
import CameraTable from './CameraTable';

const CameraControlSystem = () => {
  const [dvrs, setDvrs] = useState([]);
  const [file, setFile] = useState(null);
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

    console.log("Datos a enviar:", registroData);  // Verifica el contenido de los datos

    try {
        const response = await createRegistro(registroData);
        if (response.status === 201) {
            alert('Registro creado correctamente.');
        } else {
            alert('Registro creado correctamente.');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error creating registro:', error.response.data);
            alert(`Error al crear el registro: ${error.response.data}`);
        } else {
            console.error('Error creating registro:', error.message);
            alert('Error al crear el registro.');
        }
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
    setShowCameraControl(!showCameraControl);
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
        onShowCameraControl={toggleContentVisibility}
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
            {showCameraControl ? "CONTROL DE CÁMARAS" : "BIENVENIDO"}
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

export default CameraControlSystem;*/

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchDvrs, createDvr, deleteDvr, createRegistro } from '../services/apiService';
import ProfileSidebar from './ProfileSidebar';
import CameraTable from './CameraTable';

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

      if (dvr.verificacionAM) {
        handleEdit(id, 'amDisabled', true);
        handleEdit(id, 'verificacionAM', false);  // Resetear para el siguiente día
      }

      if (dvr.verificacionPM) {
        handleEdit(id, 'pmDisabled', true);
        handleEdit(id, 'verificacionPM', false);  // Resetear para el siguiente día
      }
    } catch (error) {
      console.error('Error creating registro:', error);
      alert('Error al crear el registro.');
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
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

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {showCameraControl ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#003366', textAlign: 'center' }}>
            
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
          sx={{
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontFamily: 'Arial, sans-serif',
            color: '#ffffff', // Cambia el color del texto a blanco
            backgroundColor: '#003366', // Fondo azul oscuro
            padding: '10px 20px', // Añade espaciado interno para darle más tamaño al fondo
            borderRadius: '8px', // Bordes redondeados
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Añade una sombra para darle profundidad
            textAlign: 'center', // Centra el texto
            display: 'inline-block', // Ajusta el tamaño del fondo al tamaño del texto
            transform: 'translateY(-20%)',
            transform: 'translateX(20%)', // Mueve el texto un poco hacia arriba
          }}
        >
          Bienvenido al Control de Cámaras
        </Typography>

        )}
      </Box>
    </Box>
  );
};

export default CameraControlSystem;
// CameraControlSystem.js
