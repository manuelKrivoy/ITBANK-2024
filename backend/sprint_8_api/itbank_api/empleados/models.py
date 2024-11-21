from django.db import models
from clientes.models import Sucursal

class Empleado(models.Model): ## Entidad Empleado.
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    fecha_contratacion = models.DateField()
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.nombre} - {self.dni} - {self.fecha_contratacion} - {self.sucursal}'
