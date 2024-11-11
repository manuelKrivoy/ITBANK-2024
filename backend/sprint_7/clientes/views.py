from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic
from .models import Cliente
from .forms import ClienteForm
class IndexView(generic.ListView):
    model = Cliente
    template_name = "clientes/index.html"
    context_object_name = "clientes"  # Esto le da el nombre "clientes" al contexto en la plantilla
    
def alta(request):
    if request.method == "POST":
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('clientes:index')  # Redirige a la vista de índice después de guardar
    else:
        form = ClienteForm()
    return render(request, 'clientes/alta.html', {'form': form})

