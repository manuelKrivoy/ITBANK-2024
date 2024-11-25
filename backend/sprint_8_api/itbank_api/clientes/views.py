from rest_framework import viewsets
from .models import Cliente
from .serializers import ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet): ## Model View Set sirve para hacer un CRUD de la entidad Cliente.
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer