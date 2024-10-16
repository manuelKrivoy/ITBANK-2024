import json
from datetime import datetime
from clases import ClienteClassic, ClienteBlack, ClienteGold, Transaccion, CajaAhorroPesos, CajaAhorroDolares

## Funcion para ver si el json es valido.
def validar_json(file_path):
    try:
        with open(file_path) as f:
            return json.load(f)
    except ValueError as e:
        print(f"Error en el archivo JSON: {e}")
        return None

# Proceso transacciones del json y las guardo en los clientes.
def procesar_transacciones(json_file):
    data = validar_json(json_file)
    if not data:
        return None

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
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", CajaAhorroPesos(10000), "Mitre 1234"
                )
            elif tipo_cliente == "GOLD":
                clientes[cliente_numero] = ClienteGold(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", CajaAhorroPesos(20000), 
                    "San Martin 456", CajaAhorroDolares(5000)
                )
            elif tipo_cliente == "BLACK":
                clientes[cliente_numero] = ClienteBlack(
                    cliente_numero, item["nombre"], item["apellido"], item["DNI"], "Debito", CajaAhorroPesos(100000),
                    "Italia 789", CajaAhorroDolares(10000)
                )
        
        # Procesar transacciones
        for trans in item["transacciones"]:
            fecha_transaccion = datetime.strptime(trans["fecha"], "%d/%m/%Y %H:%M:%S")
            nueva_transaccion = Transaccion( trans["tipo"], trans["monto"], fecha_transaccion, trans["estado"])
            # Mediante esa funcion se le asigna estado : aprobado / rechazado
            validar_transaccion(clientes[cliente_numero], nueva_transaccion, trans)
    
    return clientes

# Funcion que le asigna estado a la transaccion
def validar_transaccion(cliente, transaccion, data_transaccion):
    tipo = transaccion.tipo
    monto = transaccion.monto
    
    # Ejemplo de procesamiento de retiros en cajero
    if tipo == "RETIRO_EFECTIVO_CAJERO_AUTOMATICO":
        cuenta = cliente.cajaDeAhorroPesos 
        if cliente.retirar_dinero(cuenta, monto):
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            transaccion.razon = "Saldo insuficiente o límite diario excedido"
    
    # Procesar transferencias
    elif tipo == "TRANSFERENCIA_ENVIADA":
        cliente_destino = buscar_cliente_destino(data_transaccion["cuentaDestino"], cliente)  
        if cliente.realizar_transferencia(cliente_destino, monto, cliente.autorizacion):
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            transaccion.razon = "Transferencia no autorizada o saldo insuficiente"
    
    ## Procesar altas de tarjetas
    elif tipo == "ALTA_TARJETA_CREDITO":
        if cliente.alta_tarjeta_credito(data_transaccion["numeroTarjeta"]):
            transaccion.estado = "ACEPTADA"
        else:
            transaccion.estado = "RECHAZADA"
            transaccion.razon = "No se pudo dar de alta la tarjeta"
    
    cliente.agregar_transaccion(transaccion)

# Ejemplo de función para buscar el cliente destino en las transferencias
def buscar_cliente_destino(numero_cuenta, cliente):
    # falta implementar logica para que esto funcione.. por ahora se devuelve el mismo cliente
    return cliente

# Generar el reporte HTML
def generar_reporte_html(clientes):
    with open("reporte.html", "w") as f:
        f.write("<html><body><h1>Reporte de Transacciones</h1><table border='1'>")
        f.write("<tr><th>Cliente</th><th>Transacción</th><th>Estado</th><th>Monto</th><th>Fecha</th><th>Razón (si rechazada)</th></tr>")
        
        for cliente in clientes.values():
            for trans in cliente.transacciones:
                razon = trans.razon if trans.estado == "RECHAZADA" else ""
                f.write(f"<tr><td>{cliente.nombre} {cliente.apellido}</td><td>{trans.tipo}</td><td>{trans.estado}</td><td>{trans.monto}</td><td>{trans.fecha}</td><td>{razon}</td></tr>")
        
        f.write("</table></body></html>")




json_file = "transacciones.json"

clientes = procesar_transacciones(json_file)

if clientes:
    generar_reporte_html(clientes)
    print("Reporte generado exitosamente en 'reporte.html'.")
else:
    print("No se pudo procesar el archivo JSON.")