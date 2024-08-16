/*import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Button } from '@mui/material';
import { Logout as LogoutIcon, Upload as UploadIcon } from '@mui/icons-material';
import DvrCreateModal from './DvrCreateModal';
import DeleteDvrModal from './DeleteDvrModal';

const ProfileSidebar = ({ file, username, handleFileChange, handleLogout, dvrs, onCreateDvr, onDeleteDvr }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '300px',
        bgcolor: '#282c34',
        p: 2,
        borderRadius: '0 15px 15px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        color: 'white',
        zIndex: 1200,
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Typography variant="h6" gutterBottom>Perfil</Typography>
      <Typography variant="h6" gutterBottom>Nombre de Usuario: {username || 'No disponible'}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {file ? (
          <Avatar src={file} alt="User" sx={{ width: 100, height: 100 }} />
        ) : (
          <Avatar sx={{ width: 100, height: 100, bgcolor: 'grey' }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="upload-photo"
        />
        <label htmlFor="upload-photo">
          <IconButton component="span" color="primary">
            <UploadIcon />
          </IconButton>
        </label>
        
        <Button variant="contained" color="error" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Cerrar sesión
        </Button>
        
        <Button variant="contained" color="primary" onClick={handleOpenCreateModal} sx={{ mt: 2, px: 7 }}>
          Crear DVR
        </Button>

        <Button variant="contained" color="error" onClick={handleOpenDeleteModal} sx={{ mt: 2, px: 6 }}>
          Eliminar DVR
        </Button>
      </Box>

      <DvrCreateModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={onCreateDvr}
      />

      <DeleteDvrModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        dvrs={dvrs}
        handleDelete={onDeleteDvr}
      />
    </Box>
  );
};

export default ProfileSidebar;*/

import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Button } from '@mui/material';
import { Logout as LogoutIcon, Upload as UploadIcon } from '@mui/icons-material';
import DvrCreateModal from './DvrCreateModal';
import DeleteDvrModal from './DeleteDvrModal';

const ProfileSidebar = ({ file, username, handleFileChange, handleLogout, dvrs, onCreateDvr, onDeleteDvr, onShowCameraControl }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '300px',
        bgcolor: '#282c34',
        p: 2,
        borderRadius: '0 15px 15px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        color: 'white',
        zIndex: 1200,
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Typography variant="h6" gutterBottom>Perfil</Typography>
      <Typography variant="h6" gutterBottom>Nombre de Usuario: {username || 'No disponible'}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {file ? (
          <Avatar src={file} alt="User" sx={{ width: 100, height: 100 }} />
        ) : (
          <Avatar sx={{ width: 100, height: 100, bgcolor: 'grey' }} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="upload-photo"
        />
        <label htmlFor="upload-photo">
          <IconButton component="span" color="primary">
            <UploadIcon />
          </IconButton>
        </label>
        
        <Button variant="contained" color="error" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Cerrar sesión
        </Button>
        
        <Button variant="contained" color="primary" onClick={handleOpenCreateModal} sx={{ mt: 2, px: 7 }}>
          Crear DVR
        </Button>

        <Button variant="contained" color="error" onClick={handleOpenDeleteModal} sx={{ mt: 2, px: 6 }}>
          Eliminar DVR
        </Button>

        {/* Nuevo Botón para Mostrar Control de Cámaras */}
        <Button variant="contained" color="primary" onClick={onShowCameraControl} sx={{ mt: 2, px: 4 }}>
          Control de Cámaras
        </Button>
      </Box>

      <DvrCreateModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={onCreateDvr}
      />

      <DeleteDvrModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        dvrs={dvrs}
        handleDelete={onDeleteDvr}
      />
    </Box>
  );
};

export default ProfileSidebar;
