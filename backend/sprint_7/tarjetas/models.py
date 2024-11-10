from django.db import models
from clientes.models import Cliente, Sucursal

class TipoTarjeta(models.Model): ## Entidad Tipo de Tarjeta.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre} '

class Tarjeta(models.Model): ## Entidad Tarjeta.
    numero = models.CharField(max_length=16)
    fecha_expiracion = models.DateField()
    fecha_otorgamiento = models.DateField()
    cvv = models.CharField(max_length=3)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoTarjeta, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.numero} - {self.fecha_expiracion} - {self.sucursal} - {self.tipo} - {self.cliente}'
