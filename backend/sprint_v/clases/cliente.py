from datetime import datetime

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

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.tipo})"  
        
    def agregar_cuenta(self, cuenta):
        self.cuentas.append(cuenta)

    def agregar_transaccion(self, transaccion):
        self.transacciones.append(transaccion)

    def resetear_monto_diario(self):
        if self.fechaUltimoRetiro != datetime.now().date():
            self.montoRetiradoHoy = 0
            self.fechaUltimoRetiro = datetime.now().date()

    def puede_retirar(self, monto, limiteDiario):
        if monto < 0:
            return "No puede retirar un monto negativo"
        else:
            self.resetear_monto_diario()
            if self.montoRetiradoHoy + monto > limiteDiario:
                return f"No puede retirar más de ${limiteDiario} por día."
            return 1

    def registrar_retiro(self, monto):
        self.montoRetiradoHoy += monto

    # Método generalizado para retirar dinero en todas las subclases
    def retirar_dinero(self, cuenta, monto, limiteDiario):
        if monto < 0:
            return "No puede retirar un monto negativo"
        else:
            self.resetear_monto_diario()
            if not self.puede_retirar(monto, limiteDiario):
                return False
            if cuenta.saldo >= monto:
                cuenta.saldo -= monto
                self.registrar_retiro(monto)
                print(f"Se ha retirado ${monto} con éxito.")
                return 1
            else:
                return "Saldo insuficiente"

    def realizar_transferencia(self, clienteDestino, monto, autorizacion):
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
            return "La cuenta destino no autorizó la transferencia"

        if self.cajaDeAhorroPesos.saldo >= montoFinal:
            self.cajaDeAhorroPesos.saldo -= montoFinal
            clienteDestino.cajaDeAhorroPesos.saldo += montoFinal
            return 1
        else:
            return "Saldo insuficiente"

    def alta_tarjeta_credito(self, tarjetaCredito):
        pass

    # Métodos para comprar y vender dólares
    def vender_usd(self, monto):
        if hasattr(self, 'cajaAhorroDolares') and self.cajaAhorroDolares.saldo >= monto:
            self.cajaAhorroDolares.saldo -= monto
            print(f"Se han vendido ${monto} USD con éxito.")
        else:
            print("Saldo insuficiente en caja de ahorro en dólares.")

    def comprar_usd(self, monto):
        if hasattr(self, 'cajaAhorroDolares'):
            self.cajaAhorroDolares.saldo += monto
            print(f"Se han comprado ${monto} USD con éxito.")
        else:
            print("No tiene cuenta en dólares.")

# Clases de tipo de cliente heredando de Cliente
class ClienteClassic(Cliente):
    LIMITE_DIARIO = 10000

    def __init__(self, numero, nombre, apellido, dni, tarjetaDebito, cajaAhorroPesos, direccion):
        super().__init__(numero, nombre, apellido, dni, 'Classic', tarjetaDebito, direccion, cajaAhorroPesos)

    def retirar_dinero(self, cuenta, monto):
        return super().retirar_dinero(cuenta, monto, self.LIMITE_DIARIO)

    def alta_tarjeta_credito(self, tarjetaCredito):
        return "No puede tener tarjeta de crédito siendo cliente Classic"


class ClienteGold(Cliente):
    LIMITE_DIARIO = 20000

    def __init__(self, numero, nombre, apellido, dni, tarjetaDebito, cajaAhorroPesos, direccion, cajaAhorroDolares):
        super().__init__(numero, nombre, apellido, dni, 'Gold', tarjetaDebito, direccion, cajaAhorroPesos)
        self.cajaAhorroDolares = cajaAhorroDolares
        self.tarjetaCredito = None

    def retirar_dinero(self, cuenta, monto):
        return super().retirar_dinero(cuenta, monto, self.LIMITE_DIARIO)

    def alta_tarjeta_credito(self, tarjetaCredito):
        if self.tarjetaCredito is None:
            self.tarjetaCredito = tarjetaCredito
            return 1
        else:
            return "Ya tiene una tarjeta de crédito"

    def eliminar_tarjeta_credito(self):
        if self.tarjetaCredito is not None:
            self.tarjetaCredito = None
        else:
            print("No tiene tarjeta de crédito")


class ClienteBlack(Cliente):
    LIMITE_DIARIO = 100000

    def __init__(self, numero, nombre, apellido, dni, tarjetaDebito, cajaAhorroPesos, direccion, cajaAhorroDolares):
        super().__init__(numero, nombre, apellido, dni, 'Black', tarjetaDebito, direccion, cajaAhorroPesos)
        self.cajaAhorroDolares = cajaAhorroDolares
        self.tarjetaCredito = []

    def retirar_dinero(self, cuenta, monto):
        return super().retirar_dinero(cuenta, monto, self.LIMITE_DIARIO)

    def agregar_tarjeta_credito(self, tarjetaCredito):
        if len(self.tarjetaCredito) < 5:
            self.tarjetaCredito.append(tarjetaCredito)
            return 1
        else:
            return "No puede tener más de 5 tarjetas de crédito"

    def eliminar_tarjeta_credito(self, tarjetaCredito):
        if tarjetaCredito in self.tarjetaCredito:
            self.tarjetaCredito.remove(tarjetaCredito)
        else:
            print("No tiene esa tarjeta de crédito")
