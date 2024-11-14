from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Prestamo, TipoPrestamo
from clientes.models import Cliente

def lista_prestamos(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    prestamos = Prestamo.objects.filter(cliente=cliente)
    return render(request, 'prestamos/lista_prestamos.html', {'prestamos': prestamos, 'cliente': cliente})

def detalle_prestamo(request, prestamo_id):
    prestamo = get_object_or_404(Prestamo, pk=prestamo_id)
    return render(request, 'prestamos/detalle_prestamo.html', {'prestamo': prestamo})

def crear_prestamo(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    if request.method == 'POST':
        tipo_cliente_id = request.POST['tipo_cliente']
        tipo_cliente = TipoPrestamo.objects.get(id=tipo_cliente_id)
        valor_solicitado = float(request.POST['valor'])

        # Lógica para verificar el valor del préstamo según el tipo de cliente
        if tipo_cliente_id == '1' and valor_solicitado <= 100000:  # Classic
            valor = valor_solicitado
        elif tipo_cliente_id == '2' and valor_solicitado <= 300000:  # Gold
            valor = valor_solicitado
        elif tipo_cliente_id == '3' and valor_solicitado <= 500000:  # Black
            valor = valor_solicitado
        else:
            return HttpResponse("El monto solicitado excede el límite permitido para el tipo de cliente.")

        nuevo_prestamo = Prestamo(
            valor=valor,
            tipo=tipo_cliente,
            fecha=request.POST['fecha'],
            cliente=cliente
        )
        nuevo_prestamo.save()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente.id)

    tipos_prestamo = TipoPrestamo.objects.all()
    return render(request, 'prestamos/crear_prestamo.html', {'cliente': cliente, 'tipos_prestamo': tipos_prestamo})

def pagar_prestamo(request, prestamo_id):
    prestamo = get_object_or_404(Prestamo, pk=prestamo_id)
    if request.method == 'POST':
        cliente_id = prestamo.cliente.id
        prestamo.delete()
        return redirect('prestamos:lista_prestamos', cliente_id=cliente_id)
    return render(request, 'prestamos/pagar_prestamo.html', {'prestamo': prestamo})
