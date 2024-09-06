# aplicacion_camara/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from aplicacion_camara.api import  DvrViewSet, RegistroGrabacionViewSet, CamaraViewSet, UserRegisterView, CustomTokenObtainPairView, CustomTokenRefreshView

# Crea un router para manejar automáticamente las rutas de los viewsets.
router = DefaultRouter()
router.register(r'dvrs', DvrViewSet)  # Registra el viewset para Dvr.
router.register(r'registros', RegistroGrabacionViewSet) # Registra el viewset para RegistroGrabacion.
router.register(r'camaras', CamaraViewSet)

# Define las rutas de la aplicación incluyendo las rutas generadas por el router.
urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/ref resh/', CustomTokenRefreshView.as_view(), name='token_refresh'),  # Incluye todas las rutas registradas en el router.
]



# Comentado: Ejemplo alternativo de cómo definir el router y las rutas.
""""
from rest_framework import routers
from .api import UbicacionViewSet

router = routers.DefaultRouter()

router.register('ubicaciones', UbicacionViewSet, 'ubicaciones')

urlpatterns = router.urls
"""
# aplicacion_camara/urls.py
