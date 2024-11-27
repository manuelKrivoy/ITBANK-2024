from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import MethodNotAllowed
from .models import Cliente, Sucursal
from tarjetas.models import Tarjeta
from .serializers import ClienteSerializer, SucursalSerializer, DeudaSerializer
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
    
    @action(detail=False, methods=['get'], url_path='cantidad-clientes')
    def cantidad_clientes(self, request):
        """
        Endpoint para traer la cantidad de clientes registrados.
        """
        cantidad = Cliente.objects.count()

        # Construir la respuesta
        return Response(
            {
                "cantidad_clientes": cantidad,
            },
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], url_path='ids-clientes-activos')
    def ids_clientes_activos(self, request):
        """
        Endpoint para traer los IDs de los clientes activos.
        """
        clientes_activos = Cliente.objects.values_list('id', flat=True)

        # Construir la respuesta
        return Response(
            {
                "ids_clientes_activos": list(clientes_activos),
            },
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'], url_path='deudas')
    def traer_deudas(self, request):
        """
        Endpoint para traer las deudas del cliente autenticado.
        """
        # Obtener al usuario autenticado a través de Basic Authentication
        user = request.user

        # Obtener el cliente asociado al usuario autenticado
        cliente = get_object_or_404(Cliente, user=user)

        # Obtener las deudas asociadas al cliente
        deudas = cliente.deuda_set.all()  # Asegúrate de que "deuda_set" sea el related_name correcto.

        # Serializar las deudas
        deudas_serializer = DeudaSerializer(deudas, many=True)

        # Construir la respuesta
        return Response(
            {
                "deudas": deudas_serializer.data,
            },
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['DELETE'], url_path='pagar-deuda/(?P<deuda_id>[0-9]+)')
    def pagar_deuda(self, request, deuda_id=None):
        """
        Endpoint para pagar una deuda de un cliente específico.
        """
        # Obtener al cliente autenticado
        user = request.user
        cliente = get_object_or_404(Cliente, user=user)

        # Obtener y eliminar la deuda asociada al cliente

        deuda = get_object_or_404(cliente.deuda_set, pk=deuda_id)
        deuda_info = deuda
        if cliente.pesos > deuda.monto:
            cliente.pesos -= deuda.monto
            cliente.save()
            deuda.delete()
                    # Responder con éxito
            return Response(
                {
                    "mensaje": f"Deuda con ID {deuda_id} ({deuda_info.descripcion}) eliminada correctamente.",
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "mensaje": (
                        f"El cliente no tiene suficiente saldo para pagar la deuda con ID {deuda_id}. "
                        f"Saldo actual: {cliente.pesos}. "
                        f"Monto de la deuda: {deuda.monto}."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST  # Cambia el código de estado según sea necesario
            )



        


class SucursalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Model View Set para listar sucursales públicamente.
    Solo permite GET.
    """
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
    permission_classes = [AllowAny]  # Acceso público (sin autenticación)
