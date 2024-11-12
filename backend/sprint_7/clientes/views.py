from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.views import generic
from .models import Cliente
from tarjetas.models import Tarjeta
from .forms import ClienteForm, TarjetaForm
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

class DetailView(generic.DetailView):
    model = Cliente
    template_name = "clientes/detail.html"
    context_object_name = "cliente"  

def eliminar_tarjeta(request, tarjeta_id):
    tarjeta = get_object_or_404(Tarjeta, id=tarjeta_id)
    cliente_id = tarjeta.cliente.id
    tarjeta.delete()
    return redirect('clientes:detail', pk=cliente_id)

def alta_tarjeta(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == "POST":
        form = TarjetaForm(request.POST)
        if form.is_valid():
            tarjeta = form.save(commit=False)
            tarjeta.cliente = cliente 
            tarjeta.save()
            return redirect('clientes:detail', pk=cliente.id)
    else:
        form = TarjetaForm()
    return render(request, 'clientes/alta_tarjeta.html', {'form': form, 'cliente': cliente})
