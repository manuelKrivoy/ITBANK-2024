from datetime import datetime, timedelta

class Cliente:
    def __init__(self, numero, nombre, apellido, dni, tipo, tarjetaDebito, direccion, cajaAhorroPesos):
        self.numero = numero
        self.nombre = nombre
        self.apellido = apellido
        self.dni = dni
        self.tipo = tipo
        self.tarjetaDebito = tarjetaDebito
        self.cuentas = []
        self.transacciones = []
        self.direccion = direccion
        self.cajaDeAhorroPesos = cajaAhorroPesos
        self.autorizacion = False
        self.montoRetiradoHoy = 0  # Registro de cuánto ha retirado hoy
        self.fechaUltimoRetiro = datetime.now().date()  # Fecha del último retiro
        
        
    def agregar_cuenta(self, cuenta):
        self.cuentas.append(cuenta)

    def agregar_transaccion(self, transaccion):
        self.transacciones.append(transaccion)

    def retirarDinero(self, cuenta, monto):
        pass

    def resetearMontoDiario(self):
        # Si es un nuevo día, reseteamos el monto retirado
        if self.fechaUltimoRetiro != datetime.now().date():
            self.montoRetiradoHoy = 0
            self.fechaUltimoRetiro = datetime.now().date()

    def puedeRetirar(self, monto, limiteDiario):
        self.resetearMontoDiario()
        if self.montoRetiradoHoy + monto > limiteDiario:
            print(f"No puede retirar más de ${limiteDiario} por día.")
            return False
        return True

    def registrarRetiro(self, monto):
        self.montoRetiradoHoy += monto

def realizarTransferencia(self, clienteDestino, monto, autorizacion):
    # Calcular monto final con comisión
    if self.tipo == 'Classic':
        montoFinal = monto * 1.01
    elif self.tipo == 'Gold':
        montoFinal = monto * 1.005
    else:  # Asumimos que cualquier otro tipo es 'Black'
        montoFinal = monto

    limites_autorizacion = {
        'Classic': 150000,
        'Gold': 500000,
        'Black': None  # Sin límite para cuenta Black
    }

    limite = limites_autorizacion.get(clienteDestino.tipo)

    if limite is not None and montoFinal > limite and not autorizacion:
        print("La cuenta destino no autorizó la transferencia")
        return

    if self.cajaDeAhorroPesos.saldo >= montoFinal:
        self.cajaDeAhorroPesos.saldo -= montoFinal
        clienteDestino.cajaDeAhorroPesos.saldo += montoFinal
        print("Transferencia realizada con éxito")
    else:
        print("Saldo insuficiente")
                       


## Defino clases para el tipo de cliente utilizando herencia
class ClienteClassic(Cliente):
    LIMITE_DIARIO = 10000
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos, direccion):
        super().__init__(numero, nombre, apellido, dni, 'Classic', tarjetaDebito, direccion, cajaAhorroPesos, )

    def retirarDinero(self, cuenta, monto):
        self.resetearMontoDiario()
        if not self.puedeRetirar(monto, self.LIMITE_DIARIO):
            return False
        
        if cuenta.saldo >= monto:
            cuenta.saldo -= monto
            self.registrarRetiro(monto)
            return True
        else:
            print("Saldo insuficiente")
            return False


class ClienteGold(Cliente):
    LIMITE_DIARIO = 20000
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos, direccion, cajaAhorroDolares):
        super().__init__(numero, nombre, apellido, dni, 'Gold', tarjetaDebito,direccion, cajaAhorroPesos)
        self.cajaAhorroDolares = cajaAhorroDolares
        self.tarjetaCredito = None
    
    def retirarDinero(self, cuenta, monto):
        self.resetearMontoDiario()
        if not self.puedeRetirar(monto, self.LIMITE_DIARIO):
            return False
        
        if cuenta.saldo >= monto:
            cuenta.saldo -= monto
            self.registrarRetiro(monto)
            return True
        else:
            print("Saldo insuficiente")
            return False 

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
        


class ClienteBlack(Cliente):
    LIMITE_DIARIO = 100000
    def __init__(self, numero, nombre, apellido, dni,tarjetaDebito, cajaAhorroPesos,direccion, cajaAhorroDolares ):
        super().__init__(numero, nombre, apellido, dni, 'Black', tarjetaDebito, direccion, cajaAhorroPesos)
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

    def venderUsd(self, monto):
        if self.cajaAhorroDolares.saldo >= monto:
            self.cajaAhorroDolares.saldo -= monto 
    
    def comprarUsd(self, monto):
        self.cajaAhorroDolares.saldo += monto
    
    def retirarDinero(self, cuenta, monto):
        self.resetearMontoDiario()
        if not self.puedeRetirar(monto, self.LIMITE_DIARIO):
            return False
        
        if cuenta.saldo >= monto:
            cuenta.saldo -= monto
            self.registrarRetiro(monto)
            return True
        else:
            print("Saldo insuficiente")
            return False       

