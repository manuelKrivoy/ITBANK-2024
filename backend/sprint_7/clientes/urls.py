from django.urls import path


from . import views

app_name = "clientes" # nombre de la aplicación
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
]