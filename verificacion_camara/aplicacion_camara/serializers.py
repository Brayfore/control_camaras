from rest_framework import serializers
from .models import Dvr, RegistroGrabacion, Camara  # Asegúrate de importar el modelo Camara
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
import pytz  # Para manejar zonas horarias

# Serializadores para manejar el registro y la autenticación de usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'token')
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)

# Serializador para manejar el modelo Dvr
class DvrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dvr
        fields = ('id', 'nombre', 'ip', 'capacidad', 'puertos', 'ubicacion')

# Serializador para manejar el modelo Camara
class CamaraSerializer(serializers.ModelSerializer):
    dvr_nombre =serializers.CharField(source='dvr.nombre', read_only=True)
    class Meta:
        model = Camara
        fields = ['id', 'nombre', 'dvr_nombre', 'puerto']

    # Sobrescribir la validación    
    def validate(self, data):
        dvr = data.get('dvr')
        puerto = data.get('puerto')

        # Verificar si el puerto ya está en uso para este DVR
        if Camara.objects.filter(dvr=dvr, puerto=puerto).exists():
            raise serializers.ValidationError(f"El puerto {puerto} ya está en uso para este DVR.")

        return data

# Serializador para manejar el modelo RegistroGrabacion
class RegistroGrabacionSerializer(serializers.ModelSerializer):
    dvr = serializers.PrimaryKeyRelatedField(queryset=Dvr.objects.all())

    class Meta:
        model = RegistroGrabacion
        fields = ('id', 'fecha', 'dias_grabacion', 'verificacion_am', 'verificacion_pm', 'observacion', 'dvr', 'fecha_inicio', 'fecha_final')

    def validate(self, data):
        dvr = data.get('dvr')
        fecha = timezone.localtime(timezone.now()).replace(second=0, microsecond=0)
        
        # Verificar si ya existe una verificación AM para esta fecha y DVR
        if data.get('verificacion_am'):
            if RegistroGrabacion.objects.filter(dvr=dvr, fecha__date=fecha.date(), verificacion_am=True).exists():
                raise serializers.ValidationError("Ya existe una verificación AM para esta fecha y DVR.")

        # Verificar si ya existe una verificación PM para esta fecha y DVR
        if data.get('verificacion_pm'):
            if RegistroGrabacion.objects.filter(dvr=dvr, fecha__date=fecha.date(), verificacion_pm=True).exists():
                raise serializers.ValidationError("Ya existe una verificación PM para esta fecha y DVR.")

        data['fecha'] = fecha
        return data
