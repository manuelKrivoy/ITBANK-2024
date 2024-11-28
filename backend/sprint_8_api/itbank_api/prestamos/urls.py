# FILE: clientes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PrestamoViewSet

router = DefaultRouter()
router.register(r'prestamos', PrestamoViewSet)
urlpatterns = [
    path('', include(router.urls)),  # La raíz del enrutador se incluirá en 'api/' más adelante
]