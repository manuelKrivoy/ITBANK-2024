from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from clientes.models import Cliente, TipoCliente

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')
        dni = request.data.get('dni')
        fecha_nacimiento = request.data.get('fecha_nacimiento')
        tipo_id = request.data.get('tipo_id')

        if not all([username, email, password, nombre, apellido, dni, fecha_nacimiento, tipo_id]):
            return Response({'error': 'Todos los campos son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el usuario
        user = User.objects.create_user(username=username, email=email, password=password)

        # Crear el cliente asociado
        tipo = TipoCliente.objects.get(id=tipo_id)
        cliente = Cliente.objects.create(
            user=user,
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            fecha_nacimiento=fecha_nacimiento,
            tipo=tipo
        )

        return Response({'message': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)
