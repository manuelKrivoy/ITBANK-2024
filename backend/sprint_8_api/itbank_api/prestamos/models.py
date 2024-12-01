from django.db import models
from clientes.models import Cliente
from datetime import date
from clientes.models import Sucursal
class TipoPrestamo(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Prestamo(models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.ForeignKey(TipoPrestamo, on_delete=models.CASCADE)
    fecha = models.DateField(default=date.today)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    autorizado = models.BooleanField(default=False)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, default = 1)

    def __str__(self):
        return f"{self.valor} - {self.tipo} - {self.fecha} - {self.cliente}"
