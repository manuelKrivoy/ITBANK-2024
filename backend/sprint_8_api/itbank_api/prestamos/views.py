from django.shortcuts import render
from .models import Prestamo
from .serializers import PrestamoSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from .permissions import IsEmpleado
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from clientes.models import Sucursal

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated, IsEmpleado]  # Solo autentificados como empleados
    authentication_classes = [BasicAuthentication]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsEmpleado], url_path='prestamos_por_sucursal/(?P<sucursal_id>[0-9]+)')
    def prestamos_por_sucursal(self, request, sucursal_id=None):
        sucursal = get_object_or_404(Sucursal, pk=sucursal_id)
        prestamos = Prestamo.objects.filter(sucursal=sucursal)
        monto = sum(prestamo.valor for prestamo in prestamos)
        serializer = self.get_serializer(prestamos, many=True)
        return Response({
            'sucursal': sucursal.nombre,
            'prestamos': serializer.data,
            'monto_total': monto
        })