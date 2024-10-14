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

    def retirarDinero(self, cuenta, monto):
        pass


## Defino clases para el tipo de cliente utilizando herencia
class ClienteClassic(Cliente):
    def __init__(self, numero, nombre, apellido, dni):
        super().__init__(numero, nombre, apellido, dni, 'Classic')

    def retirarDinero(self, cuenta, monto):
        if monto > 10000:
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                cuenta.saldo -= cuenta.comision
                return True
            return False
        else:
            print("No puede retirar más de $10000")


class ClienteGold(Cliente):
    def __init__(self, numero, nombre, apellido, dni):
        super().__init__(numero, nombre, apellido, dni, 'Gold')
    
    def retirarDinero(self, cuenta, monto):
        if monto > 20000:
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                cuenta.saldo -= cuenta.comision
                return True
            return False
        else:
            print("No puede retirar más de $20000")    


class ClienteBlack(Cliente):
    def __init__(self, numero, nombre, apellido, dni):
        super().__init__(numero, nombre, apellido, dni, 'Black')
    
    def retirarDinero(self, cuenta, monto):
        if monto > 100000:
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                cuenta.saldo -= cuenta.comision
                return True
            return False
        else:
            print("No puede retirar más de $100000")        

