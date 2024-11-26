from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from clientes.models import Cliente
from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')
        dni = request.data.get('dni')
        fecha_nacimiento = request.data.get('fecha_nacimiento')

        # Validar que todos los campos están presentes
        if not all([username, email, password, nombre, apellido, dni, fecha_nacimiento]):
            return Response({'error': 'Todos los campos son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el nombre de usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({'error': 'El nombre de usuario ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el correo ya existe
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar si el DNI ya existe
        if Cliente.objects.filter(dni=dni).exists():
            return Response({'error': 'El DNI ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el usuario
        user = User.objects.create_user(username=username, email=email, password=password)

        # Crear el cliente
        cliente = Cliente.objects.create(
            user=user,
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            fecha_nacimiento=fecha_nacimiento,
        )

        return Response({'message': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)
