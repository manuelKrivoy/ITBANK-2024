class Cliente:
    def __init__(self, numero, nombre, apellido, dni, tipo):
        self.numero = numero
        self.nombre = nombre
        self.apellido = apellido
        self.dni = dni
        self.tipo = tipo
        self.cuentas = []
        self.transacciones = []
        
        
    def agregar_cuenta(self, cuenta):
        self.cuentas.append(cuenta)

    def agregar_transaccion(self, transaccion):
        self.transacciones.append(transaccion)