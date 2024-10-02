import random
import time
import csv
import sys
from datetime import datetime
import os
import platform

# Datos de usuarios
usuarios = {
    "krivoymanuel@gmail.com": "1234",
    "tomasdeibi@gmail.com": "1234",
    "franciscoruslender@gmail.com": "1234",
    "gonzaloblondi@gmail.com": "1234",
    "diegogomez@gmail.com": "1234",
    "test": "test"  # Usuario de prueba
}

# Limpiar consola
def limpiar_consola():
    sistema = platform.system()
    if sistema == "Windows":
        os.system("cls")
    else:
        os.system("clear")

# Función para iniciar sesión
def iniciar_sesion():
    while True:  # Bucle indefinido hasta que las credenciales sean correctas
        limpiar_consola()
        print("Iniciar Sesión")
        email = input("Email: ")
        password = input("Password: ")

        if email in usuarios and usuarios[email] == password:
            print("Inicio de sesión exitoso.")
            time.sleep(1)
            return True
        else:
            limpiar_consola()
            print("Credenciales incorrectas. Intente nuevamente.")
            retry = input("¿Quieres intentar de nuevo? (s/n): ").lower()
            if retry != 's':
                print("Gracias por utilizar el sistema.")
                return False


def ingresar_datos_filtro():
    # Opción para filtrar cheques
    while True:
        dni_cliente = input("Ingrese el DNI del cliente: ")
        if dni_cliente.isdigit() and len(dni_cliente) == 8:
            break
        else:
            print("El DNI debe ser un número de 8 dígitos.")
    while True:
        tipo_cheque = input("Ingrese el tipo de cheque (EMITIDO o DEPOSITADO): ")
        if tipo_cheque.upper() in ['EMITIDO', 'DEPOSITADO']:
            break
        else:
            print("El tipo de cheque debe ser EMITIDO o DEPOSITADO.")
    while True:
        estado = input("Ingrese el estado del cheque (PENDIENTE, APROBADO, RECHAZADO) o presione Enter para omitir: ")
        if not estado or estado.lower() in ['pendiente', 'aprobado', 'rechazado']:
            break
        else:
            print("El estado del cheque debe ser PENDIENTE, APROBADO o RECHAZADO o vacío")
    return dni_cliente, tipo_cheque, estado

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

# Menú de opciones
def menu_opciones():
    print("\n--- Menú de Opciones ---")
    print("1. Filtrar cheques")
    print("2. Exportar cheques a CSV")
    print("3. Salir")
    return input("Elige una opción: ")

# Función principal
def main():
    if not iniciar_sesion():
        return
    
    while True:
        # Leer los cheques desde el archivo CSV proporcionado como argumento o solicitarlo al usuario
        if len(sys.argv) < 2:
            nombre_archivo = input("Por favor proporciona el nombre del archivo CSV: ")
        else:
            nombre_archivo = sys.argv[1]
        
        try:
            cheques = leer_cheques_csv(nombre_archivo)
            break  # Si el archivo se lee correctamente, salir del bucle
        except FileNotFoundError:
            print(f"El archivo '{nombre_archivo}' no se encontró.")
            retry = input("¿Quieres intentar de nuevo? (s/n): ").lower()
            if retry != 's':
                print("Gracias por utilizar el sistema.")
                return

    limpiar_consola()
    print("Cheques cargados exitosamente")
    
    # Bucle de opciones
    while True:
        opcion = menu_opciones()
        
        if opcion == '1':
            # Opción para filtrar cheques
            dni_cliente, tipo_cheque, estado = ingresar_datos_filtro()
            filtrados = filtrar_cheques(cheques, dni_cliente, tipo_cheque.upper(), estado.lower() if estado else None )

            if filtrados:
                for cheque in filtrados:
                    print(cheque)
                    input("Presiona Enter para continuar...")
            else:
                print("No se encontraron cheques que coincidan con los criterios.")
                input("Presiona Enter para continuar...")

        elif opcion == '2':
            # Opción para exportar cheques a CSV
            dni_cliente, tipo_cheque, estado = ingresar_datos_filtro()
            filtrados = filtrar_cheques(cheques, dni_cliente, tipo_cheque, estado if estado else None)

            if filtrados:
                exportar_cheques_csv(filtrados, dni_cliente)
            else:
                print("No se encontraron cheques que coincidan con los criterios.")
                input("Presiona Enter para continuar...")

        elif opcion == '3':
            # Opción para salir del programa
            print("Gracias por utilizar el sistema. Saliendo...")
            break

        else:
            print("Opción no válida. Por favor, elige una opción del menú.")

if __name__ == "__main__":
    main()
