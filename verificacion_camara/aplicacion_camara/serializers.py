from rest_framework import serializers
from .models import Dvr, RegistroGrabacion, Camara  # Asegúrate de importar el modelo Camara
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

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
    created_by = serializers.ReadOnlyField(source='created_by.username')  # Mostrar el nombre del creador

    class Meta:
        model = Dvr
        fields = ('id', 'nombre', 'ip', 'capacidad', 'puertos', 'ubicacion', 'created_by')

    def create(self, validated_data):
        request = self.context.get('request')  # Obtener la solicitud actual del contexto
        validated_data['created_by'] = request.user  # Asignar el usuario que creó el registro
        return super().create(validated_data)

# Serializador para manejar el modelo Camara
class CamaraSerializer(serializers.ModelSerializer):
    dvr_nombre = serializers.CharField(source='dvr.nombre', read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.username')  # Mostrar el nombre del creador
    
    class Meta:
        model = Camara
        fields = ['id', 'nombre', 'dvr', 'dvr_nombre', 'puerto', 'created_by']  # Asegúrate de incluir 'created_by'

    # Validación general del DVR y el puerto
    def validate(self, data):
        dvr = data.get('dvr')
        puerto = data.get('puerto')

        # Verificar que el DVR sea válido y exista en la base de datos
        if not Dvr.objects.filter(id=dvr.id).exists():
            raise serializers.ValidationError("El DVR seleccionado no es válido.")

        # Verifica si el puerto ya está en uso para el DVR seleccionado
        if Camara.objects.filter(dvr=dvr, puerto=puerto).exists():
            raise serializers.ValidationError(f"El puerto {puerto} ya está en uso para este DVR.")

        return data

    def create(self, validated_data):
        request = self.context.get('request')  # Obtener la solicitud actual del contexto
        validated_data['created_by'] = request.user  # Asignar el usuario que creó el registro
        return super().create(validated_data)

# Serializador para manejar el modelo RegistroGrabacion
class RegistroGrabacionSerializer(serializers.ModelSerializer):
    dvr = serializers.PrimaryKeyRelatedField(queryset=Dvr.objects.all())
    created_by = serializers.ReadOnlyField(source='created_by.username')  # Mostrar el nombre del creador

    class Meta:
        model = RegistroGrabacion
        fields = ('id', 'fecha', 'dias_grabacion', 'verificacion_am', 'verificacion_pm', 'observacion', 'dvr', 'fecha_inicio', 'fecha_final', 'created_by')

    def validate(self, data):
        dvr = data.get('dvr')
        fecha = datetime.now().replace(second=0, microsecond=0)  # Usamos datetime.now() para obtener la hora local

        # Verificación PM: No se puede hacer una verificación PM antes de las 12 p.m.
        if data.get('verificacion_pm') and fecha.hour < 12:
            raise serializers.ValidationError("No se puede hacer una verificación PM antes de las 12 p.m.")

        # Verificar si ya existe una verificación AM para esta fecha y DVR
        if data.get('verificacion_am'):
            if RegistroGrabacion.objects.filter(dvr=dvr, fecha__date=fecha.date(), verificacion_am=True).exists():
                raise serializers.ValidationError("Ya existe una verificación AM para esta fecha y DVR.")

        # Verificar si ya existe una verificación PM para esta fecha y DVR
        if data.get('verificacion_pm'):
            if RegistroGrabacion.objects.filter(dvr=dvr, fecha__date=fecha.date(), verificacion_pm=True).exists():
                raise serializers.ValidationError("Ya existe una verificación PM para esta fecha y DVR.")

        # Asegurarse de que al menos una verificación (AM o PM) esté presente
        if not data.get('verificacion_am') and not data.get('verificacion_pm'):
            raise serializers.ValidationError("Debe marcar al menos una verificación, ya sea AM o PM.")

        data['fecha'] = fecha  # Registrar la fecha actual
        return data

    def create(self, validated_data):
        request = self.context.get('request')  # Obtener la solicitud actual del contexto
        validated_data['created_by'] = request.user  # Asignar el usuario que creó el registro
        return super().create(validated_data)
    

