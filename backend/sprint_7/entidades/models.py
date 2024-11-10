from django.db import models

class Direccion (models.Model): ## Entidad Dirección.
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.calle} - {self.ciudad} - {self.provincia} - {self.codigo_postal}'
    
class Sucursal(models.Model): ## Entidad Sucursal.
    nombre = models.CharField(max_length=100)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.direccion}'
    
class TipoCliente(models.Model): ## Entidad Tipo de Cliente.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre}'

class Cliente(models.Model): ## Entidad Cliente.
    nombre = models.CharField(max_length=100)
    apellido= models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    fecha_nacimiento = models.DateField()
    direcciones = models.ManyToManyField(Direccion) ## Many to Many para permitir muchas direcciones al mismo cliente
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoCliente, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.nombre} '

class TipoCuenta(models.Model): ## Entidad Tipo de Cuenta.
    nombre = models.CharField(max_length=100)
    ##Recordar solo 2 tipos, 1 crédito y 2 débito.
    def __str__(self):
        return f'{self.nombre} ' 

class Cuenta(models.Model): ## Entidad Cuenta.
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE) 
    sueldo = models.DecimalField(max_digits=10, decimal_places=2) 
    tipo = models.ForeignKey(TipoCuenta, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.cliente} - {self.sueldo} - {self.tipo}'
    
class SucursalTarjeta(models.Model): ## Entidad Sucursal de Tarjeta.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre} '

class Empleado(models.Model): ## Entidad Empleado.
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    fecha_contratacion = models.DateField()
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombre} - {self.nombre} - {self.dni} - {self.fecha_contratacion} - {self.sucursal}'
    
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

class TipoPrestamo(models.Model): ## Entidad Tipo de Préstamo.
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.nombre} '

class Prestamo(models.Model): ## Entidad Préstamo.
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.ForeignKey(TipoPrestamo, on_delete=models.CASCADE)
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.valor} - {self.tipo} - {self.fecha}  - {self.cliente}'