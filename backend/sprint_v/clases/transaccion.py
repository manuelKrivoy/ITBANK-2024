class Transaccion:
    def __init__(self, tipo, monto, fecha, estado=None):
        self.estado = estado
        self.tipo = tipo
        self.monto = monto
        self.fecha = fecha
        self.razon = None

    def __str__(self):
        return f"Transaccion de tipo {self.tipo} por un monto de {self.monto} en fecha {self.fecha}"