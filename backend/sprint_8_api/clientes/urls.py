from django.urls import path
from .views import IndexView, alta, DetailView, eliminar_tarjeta

from . import views

app_name = "clientes" # nombre de la aplicación
urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("alta/", alta, name="alta"),
    path("<int:pk>/", DetailView.as_view(), name="detail"),
    path('eliminar_tarjeta/<int:tarjeta_id>/', eliminar_tarjeta, name='eliminar_tarjeta'),
    path('<int:pk>/alta_tarjeta/', views.alta_tarjeta, name='alta_tarjeta')
]