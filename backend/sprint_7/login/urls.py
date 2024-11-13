# FILE: login/urls.py
from django.urls import path
from .views import login_view, register_view, logout_view

app_name = 'login'

urlpatterns = [
    path('', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout')
]