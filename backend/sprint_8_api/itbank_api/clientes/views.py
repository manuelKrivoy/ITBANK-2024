from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import MethodNotAllowed
from .models import Cliente, Sucursal
from tarjetas.models import Tarjeta
from .serializers import ClienteSerializer, SucursalSerializer
from tarjetas.serializers import TarjetaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class ClienteViewSet(viewsets.ModelViewSet):
    """
    Model View Set para CRUD de la entidad Cliente.
    Requiere autenticación básica para acceder.
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    authentication_classes = [BasicAuthentication]  # Autenticación básica
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def create(self, request, *args, **kwargs):
        """
        Bloquea la creación directa de clientes.
        """
        raise MethodNotAllowed("POST", detail="No se permite la creación directa de clientes. Cree un usuario asociado.")

    @action(detail=False, methods=['get'], url_path='mis-datos')
    def traer_datos_cliente(self, request):
        """
        Endpoint para traer los datos del cliente autenticado junto con sus tarjetas asociadas.
        """
        # Obtener el usuario autenticado
        usuario = request.user
        
        # Buscar al cliente asociado al usuario
        cliente = get_object_or_404(Cliente, user=usuario)

        # Obtener las tarjetas asociadas al cliente
        tarjetas = Tarjeta.objects.filter(cliente=cliente)

        # Serializar los datos del cliente y sus tarjetas
        cliente_serializer = ClienteSerializer(cliente)
        tarjeta_serializer = TarjetaSerializer(tarjetas, many=True)

        # Construir la respuesta
        return Response(
            {
                "cliente": cliente_serializer.data,
                "tarjetas": tarjeta_serializer.data,
            },
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], url_path='mi-saldo')
    def traer_saldo_cliente(self, request):
        """
        Endpoint para traer el saldo del cliente autenticado.
        """
        # Obtener el usuario autenticado
        usuario = request.user
        
        # Buscar al cliente asociado al usuario
        cliente = get_object_or_404(Cliente, user=usuario)

        # Construir la respuesta
        return Response(
            {
                "tipo_cliente": cliente.tipo.nombre,
                "saldo_usd": cliente.usd,
                "saldo_pesos": cliente.pesos,
            },
            status=status.HTTP_200_OK
        )
    

class SucursalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Model View Set para listar sucursales públicamente.
    Solo permite GET.
    """
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
    permission_classes = [AllowAny]  # Acceso público (sin autenticación)
