from django.urls import path
from .views import IndexView, alta

from . import views

app_name = "clientes" # nombre de la aplicación
urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("alta/", alta, name="alta"),
]