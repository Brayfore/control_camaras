from django.db import models
from django.contrib.auth.models import User  # Asegúrate de importar el modelo User

class Dvr(models.Model):
    nombre = models.CharField(max_length=100)
    ip = models.CharField(max_length=100)
    capacidad = models.CharField(max_length=100)
    puertos = models.IntegerField()
    ubicacion = models.CharField(max_length=250)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Añadimos el campo de usuario

    def __str__(self):
        return f"{self.nombre} - {self.ubicacion}"

class Camara(models.Model):
    nombre = models.CharField(max_length=100)
    dvr = models.ForeignKey(Dvr, related_name='camaras', on_delete=models.CASCADE)
    puerto = models.PositiveIntegerField()
    dvr_nombre = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Añadimos el campo de usuario

    class Meta:
        unique_together = ('dvr', 'puerto')
        
    def save(self, *args, **kwargs):
        self.dvr_nombre = self.dvr.nombre
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} - DVR: {self.dvr.nombre} - Puerto: {self.puerto}"



class RegistroGrabacion(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    dias_grabacion = models.PositiveIntegerField()
    dvr = models.ForeignKey(Dvr, related_name='registros', on_delete=models.CASCADE)
    verificacion_am = models.BooleanField(default=False)
    verificacion_pm = models.BooleanField(default=False)
    observacion = models.TextField(blank=True)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_final = models.DateField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Añadimos el campo de usuario

    def __str__(self):
        return f"{self.fecha} - {self.dvr.nombre} - {self.dias_grabacion} días"

