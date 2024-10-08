from django.db import models

class Dvr(models.Model):
    nombre = models.CharField(max_length=100)
    ip = models.CharField(max_length=100)
    capacidad = models.CharField(max_length=100)
    puertos = models.IntegerField()
    ubicacion = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nombre} - {self.ubicacion}"

class RegistroGrabacion(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    dias_grabacion = models.PositiveIntegerField()
    dvr = models.ForeignKey(Dvr, related_name='registros', on_delete=models.CASCADE)
    verificacion_am = models.BooleanField(default=False)
    verificacion_pm = models.BooleanField(default=False)
    observacion = models.TextField(blank=True)

    def __str__(self):
        return f"{self.fecha} - {self.dvr.nombre} - {self.dias_grabacion} días"