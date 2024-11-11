from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from .models import Cliente

class IndexView(generic.ListView):
    model = Cliente
    template_name = "clientes/index.html"
    context_object_name = "clientes"  # Esto le da el nombre "clientes" al contexto en la plantilla
