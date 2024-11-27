# FILE: clientes/serializers.py
from rest_framework import serializers
from .models import Cliente, Sucursal, Deuda, Transferencia

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class DeudaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deuda
        fields = '__all__'

class TransferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transferencia
        fields = '__all__'
