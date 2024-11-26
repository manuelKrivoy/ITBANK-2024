from django.contrib.auth.models import User
from django.db import models

class Direccion(models.Model):
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.calle} - {self.numero} - {self.ciudad} - {self.provincia} - {self.codigo_postal}'
    
class TipoCliente(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre}'

class Sucursal(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.direccion}'

class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='')  # Relación 1 a 1 con User
    nombre = models.CharField(max_length=100, default='')
    apellido = models.CharField(max_length=100, default='')
    dni = models.CharField(max_length=10, unique=True, default='')
    fecha_nacimiento = models.DateField(default='1900-01-01')
    direcciones = models.ManyToManyField(Direccion)
    tipo = models.ForeignKey(TipoCliente, on_delete=models.CASCADE, default=1)
    cvu= models.CharField(max_length=22, default='')
    usd = models.FloatField(default=0)
    pesos = models.FloatField(default=0)

    def __str__(self):
        return f'{self.nombre} - {self.apellido} - {self.dni} - {self.fecha_nacimiento} - {self.tipo}'

class Transferencia(models.Model):
    fecha = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    clienteEmisor = models.ForeignKey(
        Cliente, 
        on_delete=models.CASCADE, 
        related_name='transferencias_enviadas'
    )
    clienteReceptor = models.ForeignKey(
        Cliente, 
        on_delete=models.CASCADE, 
        related_name='transferencias_recibidas'
    )
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.fecha} - {self.monto} - Emisor: {self.clienteEmisor} - Receptor: {self.clienteReceptor} - Sucursal: {self.sucursal}'
