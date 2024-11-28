from django.shortcuts import render
from .models import Prestamo
from .serializers import PrestamoSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
# Create your views here.

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]