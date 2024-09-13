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
    permission_classes = [permissions.AllowAny]
    serializer_class = DvrSerializer

class RegistroGrabacionViewSet(viewsets.ModelViewSet):
    queryset = RegistroGrabacion.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistroGrabacionSerializer

# Vista para manejar cámaras
class CamaraViewSet(viewsets.ModelViewSet):
    queryset = Camara.objects.all()
    serializer_class = CamaraSerializer

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

            # Asigna automáticamente el nombre del DVR al crear una nueva cámara
            serializer.save(dvr_nombre=dvr.nombre)

        except ValidationError as e:
            # Los errores de validación deben ser manejados por DRF
            raise e
        except Exception as e:
            # Si ocurre cualquier otro error, se registra y se devuelve un mensaje genérico
            print(f"Error inesperado al crear la cámara: {e}")
            raise ValidationError({"detail": "Error interno al crear la cámara."})

    def perform_update(self, serializer):
        try:
            # Asigna automáticamente el nombre del DVR al actualizar una cámara existente
            serializer.save(dvr_nombre=serializer.validated_data['dvr'].nombre)
        except Exception as e:
            print(f"Error inesperado al actualizar la cámara: {e}")
            raise ValidationError({"detail": "Error interno al actualizar la cámara."})

# Nuevas vistas para manejo de autenticación
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]
