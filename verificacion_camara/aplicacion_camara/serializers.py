from rest_framework import serializers
from .models import Dvr, RegistroGrabacion
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

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

# Serializadores para manejar los modelos Dvr y RegistroGrabacion
class DvrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dvr
        fields = ('id', 'nombre', 'ip', 'capacidad', 'puertos', 'ubicacion')

class RegistroGrabacionSerializer(serializers.ModelSerializer):
    dvr = serializers.PrimaryKeyRelatedField(queryset=Dvr.objects.all())

    class Meta:
        model = RegistroGrabacion
        fields = ('id', 'fecha', 'dias_grabacion', 'verificacion_am', 'verificacion_pm', 'observacion', 'dvr')

    def validate(self, data):
        # Validaciones personalizadas
        if data['dias_grabacion'] <= 0:
            raise serializers.ValidationError("Los días de grabación deben ser mayores a 0.")
        return data
