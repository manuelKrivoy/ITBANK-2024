from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Tarjeta, Cliente
from .serializers import TarjetaSerializer
from rest_framework import viewsets
from clientes.serializers import ClienteSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer
    authentication_classes = [BasicAuthentication]  # Autenticación básica
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    # Endpoint para traer tarjetas de clientes específicos
    @action(detail=False, methods=['get'], url_path='mis-tarjetas')
    def mis_tarjetas(self, request):
        usuario= request.user
        cliente = get_object_or_404(Cliente, user=usuario)
        tarjetas = Tarjeta.objects.filter(cliente=cliente)
        if not tarjetas.exists():
            raise NotFound(detail="No se encontraron tarjetas para el cliente especificado.")
        
        # Serializar los datos del cliente
        cliente_serializer = ClienteSerializer(cliente)
        
        # Serializar las tarjetas
        tarjetas_serializer = self.get_serializer(tarjetas, many=True)

        # Combinar ambos resultados (cliente + tarjetas)
        data = {
            'cliente': cliente_serializer.data,
            'tarjetas': tarjetas_serializer.data
        }

        return Response(data)
