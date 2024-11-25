# FILE: empleados/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarjetaViewSet

router = DefaultRouter()
router.register(r'tarjetas', TarjetaViewSet)  # Esto crea las rutas para empleados

urlpatterns = [
    path('', include(router.urls)),  # Esto permitirá que las rutas se incluyan bajo "/api/"
]
