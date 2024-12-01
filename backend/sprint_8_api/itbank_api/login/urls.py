from django.urls import path
from .views import RegisterView, LoginView, RegisterEmployeeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('register/empleado/', RegisterEmployeeView.as_view(), name='register_employee'),
    path('login/', LoginView.as_view(), name='login'),
]
