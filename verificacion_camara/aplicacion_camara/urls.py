# aplicacion_camara/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from aplicacion_camara.api import DvrViewSet, RegistroGrabacionViewSet, CamaraViewSet, UserRegisterView, CustomTokenObtainPairView, CustomTokenRefreshView

# Crea un router para manejar automáticamente las rutas de los viewsets.
router = DefaultRouter()
router.register(r'dvrs', DvrViewSet)  # Registra el viewset para Dvr.
router.register(r'registros', RegistroGrabacionViewSet)  # Registra el viewset para RegistroGrabacion.
router.register(r'camaras', CamaraViewSet)  # Registra el viewset para Camaras.

# Define las rutas de la aplicación incluyendo las rutas generadas por el router.
urlpatterns = [
    path('api/', include(router.urls)),  # Incluye todas las rutas del router.
    path('api/register/', UserRegisterView.as_view(), name='register'),  # Ruta para registro de usuarios.
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Ruta para obtener tokens.
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),  # Ruta para refrescar tokens.
]
