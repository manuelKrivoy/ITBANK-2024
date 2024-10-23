class Transaccion:
    def __init__(self, tipo, monto, fecha, estado=None, razon=""):
        self.estado = estado
        self.tipo = tipo
        self.monto = monto
        self.fecha = fecha
        self.razon = razon  

    def __str__(self):
        return f"Transaccion(tipo={self.tipo}, monto={self.monto}, fecha={self.fecha}, estado={self.estado}, razon={self.razon})"