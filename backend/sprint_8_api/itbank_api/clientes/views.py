from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import MethodNotAllowed
from .models import Cliente, Sucursal, Transferencia
from tarjetas.models import Tarjeta
from .serializers import ClienteSerializer, SucursalSerializer, DeudaSerializer, TransferenciaSerializer
from tarjetas.serializers import TarjetaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import transaction
from prestamos.models import Prestamo
from prestamos.serializers import PrestamoSerializer

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
        usuario = request.user
        cliente = get_object_or_404(Cliente, user=usuario)

        # Obtener la deuda correspondiente
        deuda = get_object_or_404(cliente.deuda_set, pk=deuda_id)

        # Verificar si el cliente tiene saldo suficiente para pagar la deuda
        if cliente.pesos >= deuda.monto:
            # Usar una transacción para asegurar la consistencia
            with transaction.atomic():
                # Actualizar el saldo del cliente
                cliente.pesos -= float(deuda.monto)
                cliente.save()

                # Eliminar la deuda
                deuda.delete()

            # Responder con éxito
            return Response(
                {
                    "mensaje": f"Deuda con ID {deuda_id} ({deuda.descripcion}) eliminada correctamente.",
                    
                },
                status=status.HTTP_200_OK
            )
        else:
            # Si el saldo no es suficiente
            return Response(
                {
                    "mensaje": (
                        f"El cliente no tiene suficiente saldo para pagar la deuda con ID {deuda_id}. "
                        f"Saldo actual: {cliente.pesos}. "
                        f"Monto de la deuda: {deuda.monto}."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
    @action(detail=False, methods=['POST'], url_path='transferir-pesos')
    def transferir_pesos(self, request):
        """
        Endpoint para realizar una transferencia de pesos entre dos clientes.
        """
        # Obtener los datos de la transferencia
        monto = request.data.get('monto')
        cliente_emisor = request.user
        cliente_receptor_id = request.data.get('cliente_receptor_id')

        # Obtener los clientes
        cliente_emisor = get_object_or_404(Cliente, user=cliente_emisor)
        cliente_receptor = get_object_or_404(Cliente, pk=cliente_receptor_id)

        # Verificar si el cliente emisor tiene saldo suficiente
        if cliente_emisor.pesos >= monto:
            with transaction.atomic():
                cliente_emisor.pesos -= float(monto)
                cliente_receptor.pesos += float(monto)

                cliente_emisor.save()
                cliente_receptor.save()
                transferencia = Transferencia(
                    monto=monto,
                    clienteEmisor=cliente_emisor,
                    clienteReceptor=cliente_receptor,
                    tipo = 'pesos'
                )
                transferencia.save()

            # Responder con éxito
            return Response(
                {
                    "id": transferencia.id,
                    "mensaje": f"Transferencia de ${monto} realizada correctamente de {cliente_emisor.nombre} a {cliente_receptor.nombre}.",
                    "monto":  monto, 
                    "cliente_emisor": cliente_emisor.nombre  + " " + cliente_emisor.apellido,
                    "cliente_receptor": cliente_receptor.nombre + " " + cliente_receptor.apellido,
                    "tipo": 'pesos'
                },
                status=status.HTTP_200_OK
            )
        else:
            # Si el saldo no es suficiente
            return Response(
                {
                    "mensaje": (
                        f"SALDO INSUFICIENTE EN PESOS "
                        f"Saldo actual: {cliente_emisor.pesos}. "
                        f"Monto de la transferencia: {monto}."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    @action(detail=False, methods=['POST'], url_path='transferir-usd')
    def transferir_usd(self, request):
        """
        Endpoint para realizar una transferencia de usd entre dos clientes.
        """
        # Obtener los datos de la transferencia
        monto = request.data.get('monto')
        cliente_emisor = request.user
        cliente_receptor_id = request.data.get('cliente_receptor_id')

        # Obtener los clientes
        cliente_emisor = get_object_or_404(Cliente, user=cliente_emisor)
        cliente_receptor = get_object_or_404(Cliente, pk=cliente_receptor_id)

        # Verificar si el cliente emisor tiene saldo suficiente
        if cliente_emisor.usd >= monto:
            with transaction.atomic():
                cliente_emisor.usd -= float(monto)
                cliente_receptor.usd += float(monto)

                cliente_emisor.save()
                cliente_receptor.save()
                transferencia = Transferencia(
                    monto=monto,
                    clienteEmisor=cliente_emisor,
                    clienteReceptor=cliente_receptor,
                    tipo = 'usd'
                )

                transferencia.save()

            # Responder con éxito
            return Response(
                {
                    "mensaje": f"Transferencia de ${monto} realizada correctamente de {cliente_emisor.nombre} a {cliente_receptor.nombre}.",
                    "id": transferencia.id,
                    "monto":  monto, 
                    "cliente_emisor": cliente_emisor.nombre+ " " + cliente_emisor.apellido,
                    "cliente_receptor": cliente_receptor.nombre + " " + cliente_receptor.apellido,
                    "tipo": 'usd'
                },
                status=status.HTTP_200_OK
            )
        else:
            # Si el saldo no es suficiente
            return Response(
                {
                    "mensaje": (
                        f"SALDO INSUFICIENTE EN USD "
                        f"Saldo actual: {cliente_emisor.usd}. "
                        f"Monto de la transferencia: {monto}."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'], url_path='mis-transferencias')
    def mis_transferencias(self, request):
        """
        Endpoint para traer las transferencias del cliente autenticado.
        """
        # Obtener al usuario autenticado
        usuario = request.user
        
        # Buscar al cliente asociado al usuario autenticado
        cliente = get_object_or_404(Cliente, user=usuario)

        # Obtener las transferencias asociadas al cliente
        transferencias = Transferencia.objects.filter(clienteEmisor=cliente)
        transferencias_recibidas = Transferencia.objects.filter(clienteReceptor=cliente)
        transferencias = transferencias.union(transferencias_recibidas)
        # Serializar las transferencias
        transferencias_serializer = TransferenciaSerializer(transferencias, many=True)

        # Construir la respuesta
        return Response(
            {
                "transferencias": transferencias_serializer.data,
            },
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'], url_path='mis-prestamos')
    def mis_prestamos(self, request):
        """
        Endpoint para traer los prestamos del cliente autenticado.
        """
        # Obtener al usuario autenticado
        usuario = request.user
        
        # Buscar al cliente asociado al usuario autenticado
        cliente = get_object_or_404(Cliente, user=usuario)

        # Obtener los prestamos asociados al cliente
        prestamos = Prestamo.objects.filter(cliente=cliente)
        montoTotal = 0

        # Calcular el monto total de prestamos
        for prestamo in prestamos:
            montoTotal = montoTotal + prestamo.valor

        # Serializar los prestamos
        prestamos_serializer = PrestamoSerializer(prestamos, many=True)

        # Construir la respuesta
        return Response(
            {
                "prestamos": prestamos_serializer.data,
                "montoTotal": montoTotal
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
