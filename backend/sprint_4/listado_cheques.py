import time
import csv
import sys
from datetime import datetime
import os
import platform

# Definición de códigos de color
RED = "\033[91m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
CYAN = "\033[96m"
BLUE = "\033[94m"
RESET = "\033[0m"

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
            print(GREEN + "Inicio de sesión exitoso." + RESET)
            time.sleep(1)
            return True
        else:
            limpiar_consola()
            print(RED + "Credenciales incorrectas. Intente nuevamente." + RESET)
            retry = input("¿Quieres intentar de nuevo? (s/n): ").lower()
            if retry != 's':
                print(YELLOW + "Gracias por utilizar el sistema." + RESET)
                return False

def ingresar_datos_filtro():
    # Opción para filtrar cheques
    while True:
        dni_cliente = input("Ingrese el DNI del cliente: ")
        if dni_cliente.isdigit() and len(dni_cliente) == 8:
            break
        else:
            print(RED + "El DNI debe ser un número de 8 dígitos." + RESET)
    while True:
        tipo_cheque = input("Ingrese el tipo de cheque (EMITIDO o DEPOSITADO): ")
        if tipo_cheque.upper() in ['EMITIDO', 'DEPOSITADO']:
            break
        else:
            print(RED + "El tipo de cheque debe ser EMITIDO o DEPOSITADO." + RESET)
    while True:
        estado = input("Ingrese el estado del cheque (PENDIENTE, APROBADO, RECHAZADO) o presione Enter para omitir: ")
        if not estado or estado.upper() in ['PENDIENTE', 'APROBADO', 'RECHAZADO']:
            break
        else:
            print(RED + "El estado del cheque debe ser PENDIENTE, APROBADO o RECHAZADO o vacío" + RESET)
    return dni_cliente, tipo_cheque.upper(), estado.upper() if estado else None

# Función para leer cheques desde un archivo CSV
def leer_cheques_csv(nombre_archivo):
    cheques = []
    with open(nombre_archivo, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            cheques.append(row)
    return cheques

# Función para filtrar cheques
def filtrar_cheques(cheques, dni_cliente, tipo_cheque, estado=None):
    filtrados = []

    for cheque in cheques:
        if cheque['DNI'] == dni_cliente and cheque['TipoCheque'].upper() == tipo_cheque:
            if estado is None or cheque['Estado'].upper() == estado:
                filtrados.append(cheque)
    
    # Preguntar al usuario si desea filtrar por fecha
    opcion_fecha = input("¿Desea filtrar por un rango de fechas? (s/n): ").lower()
    if opcion_fecha == 's':
        fecha_inicio, fecha_fin = ingresar_rango_fechas()
        filtrados = filtrar_por_fecha(filtrados, fecha_inicio, fecha_fin)

    return filtrados

# Función para filtrar cheques por fecha
def filtrar_por_fecha(cheques, fecha_inicio, fecha_fin):
    # Convertir las fechas de entrada en objetos datetime
    fecha_inicio_dt = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fecha_fin_dt = datetime.strptime(fecha_fin, "%Y-%m-%d")

    # Filtrar cheques que estén dentro del rango de fechas
    filtrados = [
        cheque for cheque in cheques
        if fecha_inicio_dt <= datetime.strptime(cheque['FechaOrigen'].split()[0], "%Y-%m-%d") <= fecha_fin_dt
    ]

    if not filtrados:
        print(RED + "No se encontraron cheques en el rango de fechas." + RESET)

    return filtrados

#retorna la cantidad de repeticiones que tiene un numero de cheque para un DNI dado
def nro_cheque_repetido(cheques, dni_cliente):
    cont=0
    posicion=-1
    for i, cheque in enumerate(cheques):
        if cheque['DNI'] == dni_cliente:
            posicion = i
            break
    nro_cheque = cheques[posicion]['NroCheque']

    for cheque in cheques:
        if cheque['NroCheque'] == nro_cheque:
            cont+=1
            
    return cont

# Función para ingresar rango de fechas
def ingresar_rango_fechas():
    while True:
        try:
            fecha_inicio = input("Ingrese la fecha de inicio (YYYY-MM-DD): ")
            fecha_fin = input("Ingrese la fecha de fin (YYYY-MM-DD): ")
            # Validar formato de fechas
            fecha_inicio_dt = datetime.strptime(fecha_inicio, "%Y-%m-%d")
            fecha_fin_dt = datetime.strptime(fecha_fin, "%Y-%m-%d")
            # Asegurarse de que fecha_inicio no sea posterior a fecha_fin
            if fecha_inicio_dt > fecha_fin_dt:
                print(RED + "La fecha de inicio no puede ser posterior a la fecha de fin." + RESET)
                continue
            return fecha_inicio, fecha_fin
        except ValueError:
            print(RED + "Formato de fecha incorrecto. Use YYYY-MM-DD." + RESET)

# Función para exportar cheques a CSV
def exportar_cheques_csv(cheques, dni_cliente):
    timestamp_actual = int(time.time())
    nombre_archivo = f"{dni_cliente}_{timestamp_actual}.csv"

    with open(nombre_archivo, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=cheques[0].keys())
        writer.writeheader()
        writer.writerows(cheques)

    print(GREEN + f"Cheques exportados a '{nombre_archivo}'." + RESET)

# Menú de opciones actualizado
def menu_opciones():
    print(BLUE + "\n--- Menú de Opciones ---")
    print("1. Filtrar cheques")
    print("2. Exportar cheques a CSV")
    print("3. Salir")
    return input("Elige una opción: " + RESET)

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
            print(RED + f"El archivo '{nombre_archivo}' no se encontró." + RESET)
            retry = input("¿Quieres intentar de nuevo? (s/n): ").lower()
            if retry != 's':
                print(YELLOW + "Gracias por utilizar el sistema." + RESET)
                return
        except Exception as e:
            print(RED + f"Ocurrió un error al leer el archivo: {e}" + RESET)
            retry = input("¿Quieres intentar de nuevo? (s/n): ").lower()
            if retry != 's':
                print(YELLOW + "Gracias por utilizar el sistema." + RESET)
                return

    limpiar_consola()
    print(GREEN + "Cheques cargados exitosamente." + RESET)
    
    # Bucle de opciones
    while True:
        opcion = menu_opciones()
        if opcion== '1' or opcion== '2':
            dni_cliente, tipo_cheque, estado = ingresar_datos_filtro()
            filtrados = filtrar_cheques(
                cheques, 
                dni_cliente, 
                tipo_cheque, 
                estado
                )
            cont=nro_cheque_repetido(cheques, dni_cliente)   
            if cont==1:
                if filtrados:
                    if opcion == '1':
                        for cheque in filtrados:
                            print(CYAN + str(cheque) + RESET)
                        input("Presiona Enter para continuar...")
                        limpiar_consola()

                    elif opcion == '2':
                        exportar_cheques_csv(filtrados, dni_cliente)
                        input("Presiona Enter para continuar...")
                        limpiar_consola()    
                else:
                    print(RED + "No se encontraron cheques que coincidan con los criterios." + RESET)   
            else:
                print(RED + f" ERROR  el dni ingresado posee {cont} numeros de cheque REPETIDOS" + RESET);
                input("Presiona Enter para continuar...")
                limpiar_consola()
        elif opcion == '3':
            # Opción para salir del programa
            print(YELLOW + "Gracias por utilizar el sistema. Saliendo..." + RESET)
            break
        else:
            print(RED + "Opción no válida. Por favor, elija una opción del menú." + RESET)    

if __name__ == "__main__":
    main()
