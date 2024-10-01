import random
import time
import csv
import sys
from datetime import datetime

# Datos de usuarios
usuarios = {
    "krivoymanuel@gmail.com": "1234",
    "tomasdeibi@gmail.com": "1234",
    "franciscoruslender@gmail.com": "1234",
    "gonzaloblondi@gmail.com": "1234",
    "diegogomez@gmail.com": "1234"
}

# Función para iniciar sesión
def iniciar_sesion():
    while True:  # Bucle indefinido hasta que las credenciales sean correctas
        print("Iniciar Sesión")
        email = input("Email: ")
        password = input("Password: ")
        
        if email in usuarios and usuarios[email] == password:
            print("Inicio de sesión exitoso.")
            return True
        else:
            print("Credenciales incorrectas. Intente nuevamente.")

# Función para leer cheques desde un archivo CSV
def leer_cheques_csv(nombre_archivo):
    cheques = []
    with open(nombre_archivo, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Convertir los timestamps a formato legible
            row['FechaOrigen'] = datetime.fromtimestamp(int(row['FechaOrigen'])).strftime('%Y-%m-%d %H:%M:%S')
            row['FechaPago'] = datetime.fromtimestamp(int(row['FechaPago'])).strftime('%Y-%m-%d %H:%M:%S')
            cheques.append(row)
    return cheques

# Función para filtrar cheques
def filtrar_cheques(cheques, dni_cliente, tipo_cheque, estado=None):
    filtrados = []
    
    for cheque in cheques:
        if cheque['DNI'] == dni_cliente and cheque['TipoCheque'] == tipo_cheque:
            if estado is None or cheque['Estado'] == estado:
                filtrados.append(cheque)
    
    return filtrados

# Función para exportar cheques a CSV
def exportar_cheques_csv(cheques, dni_cliente):
    timestamp_actual = int(time.time())
    nombre_archivo = f"{dni_cliente}_{timestamp_actual}.csv"
    
    with open(nombre_archivo, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=cheques[0].keys())
        writer.writeheader()
        writer.writerows(cheques)
    
    print(f"Cheques exportados a '{nombre_archivo}'.")

# Función principal
def main():
    if not iniciar_sesion():
        return
    
    # Leer los cheques desde el archivo CSV proporcionado como argumento o solicitarlo al usuario
    if len(sys.argv) < 2:
        nombre_archivo = input("Por favor proporciona el nombre del archivo CSV: ")
    else:
        nombre_archivo = sys.argv[1]
    
    try:
        cheques = leer_cheques_csv(nombre_archivo)
    except FileNotFoundError:
        print(f"El archivo '{nombre_archivo}' no se encontró.")
        return

    dni_cliente = input("Ingrese el DNI del cliente: ")
    tipo_cheque = input("Ingrese el tipo de cheque (EMITIDO o DEPOSITADO): ")
    
    # Filtrar cheques según el DNI y tipo de cheque
    estado = input("Ingrese el estado del cheque (PENDIENTE, APROBADO, RECHAZADO) o presione Enter para omitir: ")
    
    filtrados = filtrar_cheques(cheques, dni_cliente, tipo_cheque, estado if estado else None)

    salida = input("¿Desea ver los resultados en pantalla o exportarlos a un archivo CSV? (PANTALLA/CSV): ").strip().upper()
    
    if salida == 'PANTALLA':
        for cheque in filtrados:
            print(cheque)
    
    elif salida == 'CSV' and filtrados:
        exportar_cheques_csv(filtrados, dni_cliente)
    
    else:
        print("No se encontraron cheques que coincidan con los criterios.")

if __name__ == "__main__":
    main()