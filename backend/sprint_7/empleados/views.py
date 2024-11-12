from django.shortcuts import render

def lista_empleados(request):
    return render(request, 'empleados/lista_empleados.html', context)
