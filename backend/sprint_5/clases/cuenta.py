class CuentaBancaria:
    def __init__(self, tipo, saldo=0):
        self.tipo = tipo
        self.saldo = saldo

class CajaAhorroPesos(CuentaBancaria):
    def __init__(self, saldo=0):
        super().__init__('Caja de Ahorro en Pesos', saldo)

class CajaAhorroDolares(CuentaBancaria):
    def __init__(self, saldo=0):
        super().__init__('Caja de Ahorro en Dólares', saldo)
    
class CuentaCorriente(CuentaBancaria):
    def __init__(self, saldo=0):
        super().__init__('Cuenta Corriente', saldo)

