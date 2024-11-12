from django.shortcuts import render
from .models import Cuenta  

def lista_cuentas(request):
    cuentas = Cuenta.objects.all()  
    return render(request, 'cuentas/lista_cuentas.html', {'cuentas': cuentas})
