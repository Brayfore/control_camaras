import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Importa el contexto de autenticación
import fondoLogin from '../assets/Logo_login.png'; // Importa la imagen de fondo

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función de login del contexto

  const handleLogin = async () => {
    if (username && password) {
      try {
        await login(username, password); // Llama a la función de login del contexto
        navigate('/home'); // Redirige a la página de inicio después del login
      } catch (error) {
        
        alert('Error de autenticación. Por favor, intente nuevamente.');
      }
    } else {
      alert('Por favor, ingrese usuario y contraseña.');
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
        position: 'relative', // Posición relativa para el contenedor
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
            src={fondoLogin}
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
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              mt: 2,
              backgroundColor: '#003366',
              '&:hover': {
                backgroundColor: '#001f3f',
              },
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
