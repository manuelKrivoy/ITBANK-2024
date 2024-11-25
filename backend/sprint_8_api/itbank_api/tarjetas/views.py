# FILE: views.py
from django.http import Http404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cliente, Tarjeta
from .serializers import TarjetaSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer

    # Endpoint para traer tarjetas de clientes específicos.
    @action(detail=False, methods=['get'], url_path='filtrar-por-cliente/(?P<cliente_id>[^/.]+)')
    def filtrar_por_cliente(self, request, cliente_id=None):
        try:
            cliente = get_object_or_404(Cliente, id=cliente_id)
        except Http404:
            raise NotFound(detail=f"No se encontró un cliente con el ID {cliente_id}.")
        
        tarjetas = Tarjeta.objects.filter(cliente=cliente)
        if not tarjetas.exists():
            raise NotFound(detail="No se encontraron tarjetas para el cliente especificado.")
        
        serializer = self.get_serializer(tarjetas, many=True)
        return Response(serializer.data)