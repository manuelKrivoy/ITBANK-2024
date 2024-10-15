class Cliente:
    def __init__(self, numero, nombre, apellido, dni, tipo, tarjetaDebito, cajaAhorroPesos):
        self.numero = numero
        self.nombre = nombre
        self.apellido = apellido
        self.dni = dni
        self.tipo = tipo
        self.tarjetaDebito = tarjetaDebito
        self.cuentas = []
        self.transacciones = []
        self.cajaDeAhorroPesos = cajaAhorroPesos
        
        
    def agregar_cuenta(self, cuenta):
        self.cuentas.append(cuenta)

    def agregar_transaccion(self, transaccion):
        self.transacciones.append(transaccion)

    def retirarDinero(self, cuenta, monto):
        pass


## Defino clases para el tipo de cliente utilizando herencia
class ClienteClassic(Cliente):
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos):
        super().__init__(numero, nombre, apellido, dni, 'Classic', tarjetaDebito, cajaAhorroPesos)

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
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos, cajaAhorroDolares):
        super().__init__(numero, nombre, apellido, dni, 'Gold', tarjetaDebito, cajaAhorroPesos)
        self.cajaAhorroDolares = cajaAhorroDolares
        self.tarjetaCredito = None
    
    def retirarDinero(self, cuenta, monto):
        if monto > 20000:
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                cuenta.saldo -= cuenta.comision
                return True
            return False
        else:
            print("No puede retirar más de $20000")  

    def agregarTarjetaCredito(self, tarjetaCredito):
        if self.tarjetaCredito is None:
            self.tarjetaCredito = tarjetaCredito 
        else:
            print("Ya tiene una tarjeta de crédito")

    def eliminarTarjetaCredito(self):
        if self.tarjetaCredito is not None:
            self.tarjetaCredito = None
        else:
            print("No tiene tarjeta de crédito")

    def venderUsd(self, monto):
        if self.cajaAhorroDolares.saldo >= monto:
            self.cajaAhorroDolares.saldo -= monto 
    
    def comprarUsd(self, monto):
        self.cajaAhorroDolares.saldo += monto
        


class ClienteBlack(ClienteGold):
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos, cajaAhorroDolares ):
        super().__init__(numero, nombre, apellido, dni, 'Black', tarjetaDebito, cajaAhorroPesos)
        self.cajaAhorroDolares = cajaAhorroDolares
        self.tarjetaCredito = None

    def agregarTarjetaCredito(self, tarjetaCredito):
        if self.tarjetaCredito.length < 5:
            self.tarjetaCredito.append = tarjetaCredito
        else:
            print("Ya tiene 5 tarjetas de crédito")
    
    def eliminarTarjetaCredito(self, tarjetaCredito):
        if tarjetaCredito in self.tarjetaCredito:
            self.tarjetaCredito.remove(tarjetaCredito)
        else:
            print("No tiene esa tarjeta de crédito")
    
    def retirarDinero(self, cuenta, monto):
        if monto > 100000:
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                cuenta.saldo -= cuenta.comision
                return True
            return False
        else:
            print("No puede retirar más de $100000")        

