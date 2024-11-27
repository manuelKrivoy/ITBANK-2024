from django.contrib import admin
from .models import Cliente, Direccion, Sucursal, TipoCliente, Deuda
# Register your models here.
admin.site.register(Cliente)
admin.site.register(Direccion)
admin.site.register(Sucursal)
admin.site.register(TipoCliente)
admin.site.register(Deuda)
