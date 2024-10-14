class ModuloCalculos:
    @staticmethod
    def calcular_comision(tipo_cliente, monto):
        if tipo_cliente == "Classic":
            return monto * 0.01  # 1%
        elif tipo_cliente == "Gold":
            return monto * 0.005  # 0.5%
        else:
            return 0  # Sin comisiones para Black