## Importo clases
from clases import Cliente, CuentaBancaria, Transaccion, ModuloCalculos, TarjetaDebito, TarjetaCredito

import json
from datetime import datetime
import random


def validar_json(file_path):
    try:
        with open(file_path) as f:
            json.load(f)
        return True
    except ValueError as e:
        print(f"Error en el archivo JSON: {e}")
        return False

def procesar_transacciones(json_file):
    if not validar_json(json_file):
        return
    
    with open(json_file) as f:
        data = json.load(f)

    clientes = {}
    
    for item in data:
        cliente_numero = item["numero"]
        
        if cliente_numero not in clientes:
            clientes[cliente_numero] = Cliente(cliente_numero, item["nombre"], item["apellido"], item["DNI"], item["tipo"])
        
        for trans in item["transacciones"]:
            fecha_transaccion = datetime.strptime(trans["fecha"], "%d/%m/%Y %H:%M:%S")
            nueva_transaccion = Transaccion(trans["estado"], trans["tipo"], trans["monto"], fecha_transaccion)
            clientes[cliente_numero].agregar_transaccion(nueva_transaccion)

    return clientes

def generar_reporte_html(clientes):
    with open("reporte.html", "w") as f:
        f.write("<html><body><h1>Reporte de Transacciones</h1><table border='1'>")
        f.write("<tr><th>Cliente</th><th>Transacción</th><th>Estado</th><th>Monto</th><th>Fecha</th></tr>")
        
        for cliente in clientes.values():
            for trans in cliente.transacciones:
                f.write(f"<tr><td>{cliente.nombre} {cliente.apellido}</td><td>{trans.tipo}</td><td>{trans.estado}</td><td>{trans.monto}</td><td>{trans.fecha}</td></tr>")
        
        f.write("</table></body></html>")

def crear_historial(clientes):
    tipos_transacciones = [
        "RETIRO_EFECTIVO_CAJERO_AUTOMATICO",
        "ALTA_TARJETA_CREDITO",
        "ALTA_CHEQUERA",
        "COMPRAR_DOLAR",
        "TRANSFERENCIA_ENVIADA",
        "TRANSFERENCIA_RECIBIDA"
    ]
    
    for cliente in clientes.values():
        for _ in range(random.randint(3, 7)):  # Historial aleatorio entre 3 y 7 transacciones
            tipo_transaccion = random.choice(tipos_transacciones)
            estado = random.choice(["ACEPTADA", "RECHAZADA"])
            monto = random.randint(1000, 20000)
            fecha = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
            
            nueva_transaccion = Transaccion(estado, tipo_transaccion, monto, fecha)
            cliente.agregar_transaccion(nueva_transaccion)

# Datos de ejemplo y creación de clientes
usuarios = {
    "krivoymanuel@gmail.com": "1234",
    "tomasdeibi@gmail.com": "1234",
    "franciscoruslender@gmail.com": "1234",
    "gonzaloblondi@gmail.com": "1234",
    "diegogomez@gmail.com": "1234",
    "test": "test"  # Usuario de prueba
}

# Crear algunos clientes de ejemplo
clientes_data = [
    {"numero": 100001, "nombre": "Manuel", "apellido": "Krivoy", "DNI": "29494777", "tipo": "Classic"},
    {"numero": 100002, "nombre": "Tomás", "apellido": "De Ibi", "DNI": "29494778", "tipo": "Gold"},
    {"numero": 100003, "nombre": "Francisco", "apellido": "Ruslender", "DNI": "29494779", "tipo": "Black"},
    {"numero": 100004, "nombre": "Gonzalo", "apellido": "Blondi", "DNI": "29494780", "tipo": "Classic"},
    {"numero": 100005, "nombre": "Diego", "apellido": "Gómez", "DNI": "29494781", "tipo": "Gold"},
]

clientes = {}
for data in clientes_data:
    cliente = Cliente(data["numero"], data["nombre"], data["apellido"], data["DNI"], data["tipo"])
    clientes[data["numero"]] = cliente

# Crear historial aleatorio para los clientes
crear_historial(clientes)

# Generar reporte HTML
generar_reporte_html(clientes)

print("Reporte generado exitosamente en 'reporte.html'.")