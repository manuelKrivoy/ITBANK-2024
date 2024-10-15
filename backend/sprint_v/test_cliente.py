import unittest
from datetime import datetime, timedelta
from clases import ClienteClassic, ClienteGold, ClienteBlack, CajaAhorroPesos, CajaAhorroDolares

class TestCliente(unittest.TestCase):
    
    def setUp(self):
        # Setup inicial de datos comunes para las pruebas
        self.cuenta_pesos = CajaAhorroPesos(50000)  # cuenta con saldo inicial
        self.cuenta_dolares = CajaAhorroDolares(10000)
        
        # Clientes
        self.cliente_classic = ClienteClassic(1, "Juan", "Perez", "12345678", "1234-5678-9012", self.cuenta_pesos)
        self.cliente_gold = ClienteGold(2, "Maria", "Lopez", "87654321", "9876-5432-1098", self.cuenta_pesos, self.cuenta_dolares)
        self.cliente_black = ClienteBlack(3, "Pedro", "Gomez", "11223344", "6543-2109-8765", self.cuenta_pesos, self.cuenta_dolares)
    
    def test_retirar_dinero_classic(self):
        # Test: Retirar dentro del límite diario
        resultado = self.cliente_classic.retirarDinero(self.cuenta_pesos, 5000)
        self.assertTrue(resultado)
        # No hay comisión específica en las clases de cuentas, así que solo se resta el monto retirado
        self.assertEqual(self.cuenta_pesos.saldo, 50000 - 5000)

        # Test: Exceder el límite diario
        resultado = self.cliente_classic.retirarDinero(self.cuenta_pesos, 6000)  # Esto excede el límite diario
        self.assertFalse(resultado)
    
    def test_limite_diario_gold(self):
        # Test: Retirar más allá del límite diario
        resultado = self.cliente_gold.retirarDinero(self.cuenta_pesos, 15000)
        self.assertTrue(resultado)
        self.assertEqual(self.cliente_gold.montoRetiradoHoy, 15000)
        
        resultado = self.cliente_gold.retirarDinero(self.cuenta_pesos, 10000)  # exceder el límite
        self.assertFalse(resultado)
    
    def test_resetear_monto_diario(self):
        # Test: Asegurarse de que el monto retirado se resetea al día siguiente
        self.cliente_black.retirarDinero(self.cuenta_pesos, 50000)
        self.assertEqual(self.cliente_black.montoRetiradoHoy, 50000)

        # Simulamos el paso a un nuevo día
        self.cliente_black.fechaUltimoRetiro = datetime.now().date() - timedelta(days=1)
        self.cliente_black.resetearMontoDiario()

        # Verificar que el monto retirado hoy se ha reseteado
        self.assertEqual(self.cliente_black.montoRetiradoHoy, 0)

    def test_retirar_dinero_saldo_insuficiente(self):
        # Test: Retirar más dinero del que tiene disponible
        resultado = self.cliente_classic.retirarDinero(self.cuenta_pesos, 60000)
        self.assertFalse(resultado)
        self.assertEqual(self.cuenta_pesos.saldo, 50000)  # El saldo debe mantenerse igual

    def test_vender_usd(self):
        # Test: Vender dólares en cliente Gold
        self.cliente_gold.venderUsd(5000)
        self.assertEqual(self.cliente_gold.cajaAhorroDolares.saldo, 5000)

    def test_comprar_usd(self):
        # Test: Comprar dólares en cliente Black
        self.cliente_black.comprarUsd(2000)
        self.assertEqual(self.cliente_black.cajaAhorroDolares.saldo, 12000)

if __name__ == '__main__':
    unittest.main()
