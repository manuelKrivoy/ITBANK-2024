from django.db import models

class Direccion (models.Model): ## Entidad Dirección.
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.calle} - {self.ciudad} - {self.provincia} - {self.codigo_postal}'
    
class TipoCliente(models.Model): ## Entidad Tipo de Cliente.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre}'

class Sucursal(models.Model): ## Entidad Sucursal.
    nombre = models.CharField(max_length=100)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.direccion}'

class Cliente(models.Model): ## Entidad Cliente.
    nombre = models.CharField(max_length=100)
    apellido= models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    fecha_nacimiento = models.DateField()
    direcciones = models.ManyToManyField(Direccion) ## Many to Many para permitir muchas direcciones al mismo cliente
    tipo = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)
    usd= models.FloatField(default=0)
    pesos= models.FloatField(default=0)

    def __str__(self):
        return f'{self.nombre} - {self.apellido} - {self.dni} - {self.fecha_nacimiento} - {self.tipo}'
    

class Transferencia(models.Model):  # Entidad transferencia.
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


    def __str__(self):
        return f'{self.fecha} - {self.monto} - Emisor: {self.clienteEmisor} - Receptor: {self.clienteReceptor} - Sucursal: {self.sucursal}'
