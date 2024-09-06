from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Dvr, RegistroGrabacion, Camara  # Importa el modelo Camara
from .serializers import DvrSerializer, RegistroGrabacionSerializer, CamaraSerializer, UserSerializerWithToken

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

# Nuevas vistas para manejo de autenticación
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]
