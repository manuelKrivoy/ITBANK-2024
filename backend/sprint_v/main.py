# import json
# from datetime import datetime
# from clases import ClienteClassic, ClienteBlack, ClienteGold, Transaccion, CajaAhorroPesos, CajaAhorroDolares
# import os

# def limpiarpantalla():
#     os.system('cls' if os.name == 'nt' else 'clear')
    
# ## Funcion para ver si el json es valido.
# def validar_json(file_path):
#     try:
#         with open(file_path) as f:
#             return json.load(f)
#     except ValueError as e:
#         print(f"Error en el archivo JSON: {e}")
#         return None

# # Proceso transacciones del json y las guardo en los clientes.
# def procesar_transacciones(json_file):
#     data = validar_json(json_file)
#     if not data:
#         return None

#     clientes = {}
    
#     # Crear los clientes y asignarles transacciones
#     for item in data:
#         cliente_numero = item["numero"]
#         tipo_cliente = item["tipo"]
        
#         # Primero me fijo si el cliente ya existe para no crear uno nuevo
#         if cliente_numero not in clientes:
#             ## Si no existe creo al cliente.
#             if tipo_cliente == "CLASSIC":
#                 clientes[cliente_numero] = ClienteClassic(
#                     cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", "Mitre 1234", CajaAhorroPesos(1000000)
#                 )
#             elif tipo_cliente == "GOLD":
#                 clientes[cliente_numero] = ClienteGold(
#                     cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", "San Martin 456", CajaAhorroPesos(20000), 
#                     CajaAhorroDolares(5000) 
#                 )
#             elif tipo_cliente == "BLACK":
#                 clientes[cliente_numero] = ClienteBlack(
#                     cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito","Italia 789", CajaAhorroPesos(100000),
#                      CajaAhorroDolares(10000)
#                 )
        
#         # Procesar transacciones
#         for trans in item["transacciones"]:
#             fecha_transaccion = datetime.strptime(trans["fecha"], "%d/%m/%Y %H:%M:%S")
#             nueva_transaccion = Transaccion(trans["tipo"], trans["monto"], fecha_transaccion, trans["estado"])
#             # Mediante esa funcion se le asigna estado : aprobado / rechazado
#             validar_transaccion(clientes[cliente_numero], nueva_transaccion, trans)
    
#     return clientes

# # Funcion que le asigna estado a la transaccion
# def validar_transaccion(cliente, transaccion, data_transaccion):
#     tipo = transaccion.tipo
#     monto = transaccion.monto
    
#     # Ejemplo de procesamiento de retiros en cajero
#     if tipo == "RETIRO_EFECTIVO_CAJERO_AUTOMATICO":
#         cuenta = cliente.cajaDeAhorroPesos 
#         if cliente.retirar_dinero(cuenta, monto) == 1:
#             transaccion.estado = "ACEPTADA"
#         else:
#             transaccion.estado = "RECHAZADA"
#             transaccion.razon = cliente.retirar_dinero(cuenta, monto)
    
#     # Procesar transferencias
#     elif tipo == "TRANSFERENCIA_ENVIADA":
#         cliente_destino = buscar_cliente_destino(data_transaccion["cuentaDestino"], cliente)  
#         if cliente.realizar_transferencia(cliente_destino, monto) == 1:
#             transaccion.estado = "ACEPTADA"
#         else:
#             transaccion.estado = "RECHAZADA"
#             transaccion.razon = cliente.realizar_transferencia(cliente_destino, monto)
    
#     ## Procesar altas de tarjetas
#     elif tipo == "ALTA_TARJETA_CREDITO":
#         if cliente.alta_tarjeta_credito(data_transaccion["numeroTarjeta"]) == 1:
#             transaccion.estado = "ACEPTADA"
#         else:
#             transaccion.estado = "RECHAZADA"
#             transaccion.razon = cliente.alta_tarjeta_credito(data_transaccion["numeroTarjeta"])
    
#     cliente.agregar_transaccion(transaccion)

# # Ejemplo de función para buscar el cliente destino en las transferencias
# def buscar_cliente_destino(numero_cuenta, cliente):
#     # falta implementar logica para que esto funcione.. por ahora se devuelve el mismo cliente
#     return cliente

# # Generar el reporte HTML
# def generar_reporte_html(clientes):
#     with open("reporte.html", "w") as f:
#         f.write("<html><body><h1>Reporte de Transacciones</h1><table border='1'>")
#         f.write("<tr><th>Cliente</th><th>Transaccion</th><th>Estado</th><th>Monto</th><th>Fecha</th><th>Razon</th></tr>")
        
#         for cliente in clientes.values():
#             for trans in cliente.transacciones:
#                 razon = trans.razon if trans.estado == "RECHAZADA" else ""
#                 f.write(f"<tr><td>{cliente.nombre} {cliente.apellido}</td><td>{trans.tipo}</td><td>{trans.estado}</td><td>{trans.monto}</td><td>{trans.fecha}</td><td>{razon}</td></tr>")
        
#         f.write("</table></body></html>")

# json_file = "transacciones.json"

# clientes = procesar_transacciones(json_file)

# if clientes:
#     generar_reporte_html(clientes)
#     limpiarpantalla()
#     print("Reporte generado exitosamente en 'reporte.html'.")
#     print()
#     for cliente in clientes.values():
#         print(cliente)
#         print("Transacciones:")
#         for transaccion in cliente.transacciones:
#             print(transaccion)
#         print("\n")
    
#     input("Presione Enter para salir...")
# else:
#     print("No se pudo procesar el archivo JSON.")

import json
from datetime import datetime
from clases import ClienteClassic, ClienteBlack, ClienteGold, Transaccion, CajaAhorroPesos, CajaAhorroDolares
import os

class JsonValidationError(Exception):
    pass

class TransactionError(Exception):
    pass

def limpiarpantalla():
    os.system('cls' if os.name == 'nt' else 'clear')
    
## Funcion para ver si el json es valido.
def validar_json(file_path):
    try:
        with open(file_path) as f:
            return json.load(f)
    except ValueError as e:
        raise JsonValidationError(f"Error en el archivo JSON: {e}")

# Proceso transacciones del json y las guardo en los clientes.
def procesar_transacciones(json_file):
    data = validar_json(json_file)
    
    clientes = {}
    
    # Crear los clientes y asignarles transacciones
    for item in data:
        cliente_numero = item["numero"]
        tipo_cliente = item["tipo"]
        
        # Primero me fijo si el cliente ya existe para no crear uno nuevo
        if cliente_numero not in clientes:
            ## Si no existe creo al cliente.
            if tipo_cliente == "CLASSIC":
                clientes[cliente_numero] = ClienteClassic(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", "Mitre 1234", CajaAhorroPesos(1000000)
                )
            elif tipo_cliente == "GOLD":
                clientes[cliente_numero] = ClienteGold(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", "San Martin 456", CajaAhorroPesos(20000), 
                    CajaAhorroDolares(5000) 
                )
            elif tipo_cliente == "BLACK":
                clientes[cliente_numero] = ClienteBlack(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito","Italia 789", CajaAhorroPesos(100000),
                     CajaAhorroDolares(10000)
                )
        
        # Procesar transacciones
        for trans in item["transacciones"]:
            fecha_transaccion = datetime.strptime(trans["fecha"], "%d/%m/%Y %H:%M:%S")
            nueva_transaccion = Transaccion(trans["tipo"], trans["monto"], fecha_transaccion, trans["estado"])
            # Mediante esa funcion se le asigna estado : aprobado / rechazado
            try:
                validar_transaccion(clientes[cliente_numero], nueva_transaccion, trans)
            except TransactionError as e:
                print(f"Error al procesar la transacción: {e}")
    
    return clientes

# Funcion que le asigna estado a la transaccion
def validar_transaccion(cliente, transaccion, data_transaccion):
    tipo = transaccion.tipo
    monto = transaccion.monto

    # Asegúrate de que el monto sea positivo
    if monto < 0:
        raise TransactionError("No se puede procesar una transacción con un monto negativo.")

    # Procesamiento de retiros en cajero
    if tipo == "RETIRO_EFECTIVO_CAJERO_AUTOMATICO":
        cuenta = cliente.cajaDeAhorroPesos 
        resultado = cliente.retirar_dinero(cuenta, monto)
        if resultado == 1:
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            raise TransactionError(resultado)

    # Procesar transferencias
    elif tipo == "TRANSFERENCIA_ENVIADA":
        if isinstance(cliente, ClienteClassic):
            raise TransactionError("Los clientes Classic no pueden realizar transferencias.")
        
        cliente_destino = buscar_cliente_destino(data_transaccion["cuentaDestino"], cliente)  
        resultado = cliente.realizar_transferencia(cliente_destino, monto)
        if resultado == 1:
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            raise TransactionError(resultado)

    # Procesar altas de tarjetas
    elif tipo == "ALTA_TARJETA_CREDITO":
        if isinstance(cliente, ClienteClassic):
            raise TransactionError("No puede tener tarjeta de crédito siendo cliente Classic.")
        
        resultado = cliente.alta_tarjeta_credito(data_transaccion["numeroTarjeta"])
        if resultado == 1:
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            raise TransactionError(resultado)

    cliente.agregar_transaccion(transaccion)

# Ejemplo de función para buscar el cliente destino en las transferencias
def buscar_cliente_destino(numero_cuenta, cliente):
    # falta implementar logica para que esto funcione.. por ahora se devuelve el mismo cliente
    return cliente

# Generar el reporte HTML
def generar_reporte_html(clientes):
    with open("reporte.html", "w") as f:
        f.write("<html><body><h1>Reporte de Transacciones</h1><table border='1'>")
        f.write("<tr><th>Cliente</th><th>Transacción</th><th>Estado</th><th>Monto</th><th>Fecha</th><th>Razón</th></tr>")
        
        for cliente in clientes.values():
            for trans in cliente.transacciones:
                razon = trans.razon if hasattr(trans, 'razon') and trans.estado == "RECHAZADA" else ""
                f.write(f"<tr><td>{cliente.nombre} {cliente.apellido}</td><td>{trans.tipo}</td><td>{trans.estado}</td><td>{trans.monto}</td><td>{trans.fecha}</td><td>{razon}</td></tr>")
        
        f.write("</table></body></html>")

json_file = "transacciones.json"

try:
    clientes = procesar_transacciones(json_file)

    if clientes:
        generar_reporte_html(clientes)
        limpiarpantalla()
        print("Reporte generado exitosamente en 'reporte.html'.")
        print()
        for cliente in clientes.values():
            print(cliente)
            print("Transacciones:")
            for transaccion in cliente.transacciones:
                print(transaccion)
            print("\n")
        
        input("Presione Enter para salir...")
    else:
        print("No se pudo procesar el archivo JSON.")
except JsonValidationError as e:
    print(e)