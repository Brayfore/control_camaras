from rest_framework import viewsets, permissions, generics, serializers  # Asegúrate de importar serializers
from rest_framework.exceptions import ValidationError  # Importar ValidationError correctamente
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Dvr, RegistroGrabacion, Camara  # Importa el modelo Camara
from .serializers import DvrSerializer, RegistroGrabacionSerializer, CamaraSerializer, UserSerializerWithToken
from rest_framework.response import Response
from rest_framework import status


# ViewSets existentes
class DvrViewSet(viewsets.ModelViewSet):
    queryset = Dvr.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados pueden acceder
    serializer_class = DvrSerializer

    def perform_create(self, serializer):
        # Asignamos el usuario autenticado al campo created_by
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        # Asignamos el usuario autenticado al campo created_by al actualizar
        serializer.save(created_by=self.request.user)


class RegistroGrabacionViewSet(viewsets.ModelViewSet):
    queryset = RegistroGrabacion.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados pueden acceder
    serializer_class = RegistroGrabacionSerializer

    def perform_create(self, serializer):
        # Asignamos el usuario autenticado al campo created_by
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        # Asignamos el usuario autenticado al campo created_by al actualizar
        serializer.save(created_by=self.request.user)


# Vista para manejar cámaras
class CamaraViewSet(viewsets.ModelViewSet):
    queryset = Camara.objects.all()
    serializer_class = CamaraSerializer
    permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def get_queryset(self):
        dvr_id = self.request.query_params.get('dvr')
        if dvr_id:
            return Camara.objects.filter(dvr_id=dvr_id)
        return super().get_queryset()

    def perform_create(self, serializer):
        try:
            # Verifica si el DVR existe
            dvr = serializer.validated_data.get('dvr')
            puerto = serializer.validated_data.get('puerto')

            if not dvr:
                raise ValidationError({"detail": "El DVR seleccionado no es válido."})

            # Verifica si el puerto ya está en uso en el DVR seleccionado
            if Camara.objects.filter(dvr=dvr, puerto=puerto).exists():
                raise ValidationError({"detail": f"El puerto {puerto} ya está en uso en este DVR."})

            # Asigna automáticamente el nombre del DVR y el usuario autenticado
            serializer.save(dvr_nombre=dvr.nombre, created_by=self.request.user)

        except ValidationError as e:
            raise e
        except Exception as e:
            print(f"Error inesperado al crear la cámara: {e}")
            raise ValidationError({"detail": "Error interno al crear la cámara."})

    def perform_update(self, serializer):
        try:
            # Asigna automáticamente el nombre del DVR y el usuario autenticado al actualizar
            serializer.save(dvr_nombre=serializer.validated_data['dvr'].nombre, created_by=self.request.user)
        except Exception as e:
            print(f"Error inesperado al actualizar la cámara: {e}")
            raise ValidationError({"detail": "Error interno al actualizar la cámara."})


# Nuevas vistas para manejo de autenticaciónclass UserRegisterView(generics.CreateAPIView):
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.AllowAny]  # Permitir que cualquiera pueda registrarse (esto es adecuado para registro de usuarios)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]  # Permitir que cualquier usuario con credenciales correctas obtenga un token

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]  # Cualquiera con un token de actualización válido puede obtener un nuevo token de acceso




