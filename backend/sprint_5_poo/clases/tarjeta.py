class Tarjeta:
    def __init__(self, numero, tipo ):
        self.numero = numero
        self.tipo = tipo

    def __str__(self):
        return f"Tarjeta {self.numero} "
    
class TarjetaDebito(Tarjeta):
    def __init__(self, numero):
        super().__init__(numero, 'Debito')


class TarjetaCredito(Tarjeta):
    def __init__(self, numero):
        super().__init__(numero, 'Credito')