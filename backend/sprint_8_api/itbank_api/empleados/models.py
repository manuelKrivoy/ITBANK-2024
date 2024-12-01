from django.db import models
from clientes.models import Sucursal
from datetime import date
class Empleado(models.Model): ## Entidad Empleado.
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    fecha_contratacion = models.DateField(default=date.today, null=True, blank=True)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, default=1, null=True, blank=True)

    def __str__(self):
        return f'{self.nombre} - {self.nombre} - {self.dni} - {self.fecha_contratacion} - {self.sucursal}'
