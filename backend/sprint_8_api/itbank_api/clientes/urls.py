# FILE: clientes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, SucursalViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)  # Esto crea la ruta "clientes/"
router.register(r'sucursales', SucursalViewSet)  # Esto crea la ruta "sucursales/"

urlpatterns = [
    path('', include(router.urls)),  # La raíz del enrutador se incluirá en 'api/' más adelante
]
