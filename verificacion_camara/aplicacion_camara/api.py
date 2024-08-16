from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import  Dvr, RegistroGrabacion
from .serializers import ( DvrSerializer, RegistroGrabacionSerializer,   UserSerializerWithToken)

# ViewSets existentes
class DvrViewSet(viewsets.ModelViewSet):
    queryset = Dvr.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DvrSerializer

class RegistroGrabacionViewSet(viewsets.ModelViewSet):
    queryset = RegistroGrabacion.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegistroGrabacionSerializer

# Nuevas vistas para manejo de autenticación
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]