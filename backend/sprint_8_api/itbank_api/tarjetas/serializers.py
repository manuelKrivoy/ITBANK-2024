# FILE: clientes/serializers.py
from rest_framework import serializers
from .models import Tarjeta, TipoTarjeta, MarcaTarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    marca = serializers.StringRelatedField()

    class Meta:
        model = Tarjeta
        fields = ['id', 'numero', 'fecha_expiracion', 'fecha_otorgamiento', 'cvv', 'tipo', 'cliente', 'marca', 'tarjeta_principal', 'background']
