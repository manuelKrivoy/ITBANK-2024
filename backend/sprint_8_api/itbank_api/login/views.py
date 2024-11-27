import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from clientes.models import Cliente
from tarjetas.models import Tarjeta, TipoTarjeta, MarcaTarjeta
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from datetime import date, timedelta
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

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

        if not all([username, email, password, nombre, apellido, dni, fecha_nacimiento]):
            return Response({'error': 'Todos los campos son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'El nombre de usuario ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        if Cliente.objects.filter(dni=dni).exists():
            return Response({'error': 'El DNI ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        cliente = Cliente.objects.create(
            user=user,
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            fecha_nacimiento=fecha_nacimiento,
            cvu=random.randint(100000000000000000, 999999999999999999),  # CVU aleatorio de 18 dígitos
        )

        # Crear una tarjeta principal automáticamente
        tarjeta = Tarjeta.objects.create(
            numero=random.randint(1000000000000000, 9999999999999999),  # Número aleatorio de 16 dígitos
            fecha_expiracion=date.today() + timedelta(days=365 * 5),  # Válida por 5 años
            fecha_otorgamiento=date.today(),
            cvv="123",
            tipo=TipoTarjeta.objects.get_or_create(nombre="Débito")[0],  # Tipo "Débito" predeterminado
            cliente=cliente,
            marca=MarcaTarjeta.objects.get_or_create(nombre="Visa")[0],  # Marca "Visa" predeterminada
            background=random.choice(['1', '2', '3']),  # Fondo aleatorio
            tarjeta_principal=True
        )

        return Response({'message': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # Usuario autenticado automáticamente por BasicAuth
        try:
            cliente = Cliente.objects.get(user=user)
            tarjeta_principal = cliente.tarjetas.filter(tarjeta_principal=True).first()
            foto = f'https://thispersondoesnotexist.com'
            if not tarjeta_principal:
                return Response({'error': 'No se encontró una tarjeta principal'}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'cliente': {
                    'nombre': cliente.nombre,
                    'apellido': cliente.apellido,
                    'cvu': cliente.cvu,
                    'dni': cliente.dni,
                    'pesos': cliente.pesos,
                    'usd': cliente.usd,
                    'foto': foto,
                    'tipo': cliente.tipo.nombre,
                },
                'tarjeta_principal': {
                    'numero': tarjeta_principal.numero,
                    'marca': tarjeta_principal.marca.nombre,
                    'fecha_expiracion': tarjeta_principal.fecha_expiracion,
                    'cvv': tarjeta_principal.cvv,
                    'background': tarjeta_principal.background,
                }
            }, status=status.HTTP_200_OK)
        except Cliente.DoesNotExist:
            return Response({'error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)