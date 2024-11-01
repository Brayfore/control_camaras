import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import fondoLogin from '../assets/Logo_login.png'; // Si ya tienes la imagen

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      alert('Error de autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #003366, #0066cc)', // Gradiente azul
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      <CssBaseline /> {/* Normaliza el CSS */}
      <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 10, // Aumenta el padding para hacer el cuadro más grande
            borderRadius: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            bgcolor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semi-transparente
          }}
        >
          <Box
            component="img"
            src={fondoLogin} // Asegúrate de tener el archivo de la imagen en la ruta correcta
            alt="Fondo Login"
            sx={{
              width: '100%',
              borderRadius: '4px 4px 0 0',
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#003366' }}>
            BIENVENIDOS
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Usuario"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contraseña"
              type="password"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                backgroundColor: '#003366',
                '&:hover': {
                  backgroundAColor: '#001f3f',
                },
                display: 'block',
                margin: '0 auto',
              }}
            >
              Iniciar sesión
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
