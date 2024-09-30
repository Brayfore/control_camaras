import React, { useState } from 'react';
import { Box, Drawer, Typography, Button, IconButton } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import DvrCreateModal from './DvrCreateModal';
import DeleteDvrModal from './DeleteDvrModal';
import CreateCamaraModal from './CreateCamaraModal'; // Importamos el modal para crear cámaras
import '../styles/ProfileSidebar.css';  // Importamos el archivo CSS

const ProfileSidebar = ({ username, handleLogout, dvrs, onCreateDvr, onDeleteDvr, onShowCameraControl }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateCamaraModalOpen, setIsCreateCamaraModalOpen] = useState(false); // Estado para el modal de crear cámara

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenCreateCamaraModal = () => setIsCreateCamaraModalOpen(true); // Abrir modal de crear cámara
  const handleCloseCreateCamaraModal = () => setIsCreateCamaraModalOpen(false); // Cerrar modal de crear cámara

  const handleControlCamarasClick = () => {
    onShowCameraControl();
    setIsDrawerOpen(false);  // Cierra el menú después de hacer clic en "Control de Cámaras"
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: '300px' } } }}
      >
        <Box className="profile-sidebar">
          <Typography variant="h6" gutterBottom>Perfil</Typography>
          <Typography variant="body1" gutterBottom>Usuario: {username || 'No disponible'}</Typography>

          <Button variant="contained" color="error" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ mt: 2, px: 7}}>
            Cerrar sesión
          </Button>

          <Button variant="contained" color="primary" onClick={handleOpenCreateModal} sx={{ mt: 2, px: 11}}>
            Crear DVR
          </Button>

          <Button variant="contained" color="primary" onClick={handleControlCamarasClick} sx={{ mt: 2, px: 6 }}>
            Control de Cámaras
          </Button>

          {/* Nuevo botón para crear cámara */}
          <Button variant="contained" color="primary" onClick={handleOpenCreateCamaraModal} sx={{ mt: 2, px: 9 }}>
            Crear Cámara
          </Button>

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

          {/* Modal de crear cámara */}
          <CreateCamaraModal
            open={isCreateCamaraModalOpen}
            onClose={handleCloseCreateCamaraModal}
          />
        </Box>
      </Drawer>

      <IconButton onClick={toggleDrawer} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1200 }}>
        <MenuIcon sx={{ color: 'orange' }} />
      </IconButton>
    </>
  );
};

export default ProfileSidebar;
