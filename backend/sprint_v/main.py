from clases import ClienteClassic, ClienteBlack, ClienteGold,  Transaccion,  TarjetaDebito, CajaAhorroPesos, CajaAhorroDolares

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
        tipo_cliente = item["tipo"]
        
        if cliente_numero not in clientes:
            if tipo_cliente == "CLASSIC":
                clientes[cliente_numero] = ClienteClassic(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Mitre 1234", CajaAhorroPesos(0)
                )
            elif tipo_cliente == "GOLD":
                clientes[cliente_numero] = ClienteGold(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "San Martin 456", 
                    CajaAhorroPesos(0), CajaAhorroDolares(0)
                )
            elif tipo_cliente == "BLACK":
                clientes[cliente_numero] = ClienteBlack(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Italia 789", 
                    CajaAhorroPesos(0), CajaAhorroDolares(0)
                )
        
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


clientes = {
    1: ClienteClassic(1, "Juan", "Perez", "12345678",TarjetaDebito("1234-5678-9012"), "Mitre 924", CajaAhorroPesos(50000)),
    2: ClienteGold(2, "Maria", "Lopez", "87654321",TarjetaDebito("9876-5432-1098"), "San Martin 898", CajaAhorroPesos(50000), CajaAhorroDolares(10000)),
    3: ClienteBlack(3, "Pedro", "Gomez", "11223344",TarjetaDebito("6543-2109-8765"), "Italia 1023", CajaAhorroPesos(50000), CajaAhorroDolares(10000))
}

# Crear historial aleatorio para los clientes
crear_historial(clientes)

# Generar reporte HTML
generar_reporte_html(clientes)

print("Reporte generado exitosamente en 'reporte.html'.")
