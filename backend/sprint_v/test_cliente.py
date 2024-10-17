import unittest
from datetime import datetime, timedelta
from clases import ClienteClassic, ClienteGold, ClienteBlack, CajaAhorroPesos, CajaAhorroDolares

class TestCliente(unittest.TestCase):
    
    def setUp(self):
        self.cuenta_pesos = CajaAhorroPesos(50000)  
        self.cuenta_dolares = CajaAhorroDolares(10000)
        self.cuenta_pesos_barata = CajaAhorroPesos(400)
        
        # defino un cliente de cada tipo
        self.cliente_classic = ClienteClassic(1, "Juan", "Perez", "12345678", "1234-5678-9012","Mitre 924", self.cuenta_pesos)
        self.cliente_gold = ClienteGold(2, "Maria", "Lopez", "87654321", "9876-5432-1098","San Martin 898", self.cuenta_pesos, self.cuenta_dolares)
        self.cliente_black = ClienteBlack(3, "Pedro", "Gomez", "11223344", "6543-2109-8765","Italia 1023", self.cuenta_pesos, self.cuenta_dolares)
        self.classic_testear_saldo_insuficiente= ClienteClassic(4,"Manuel","Krivoy","43840924","1234-5678-9012","Mitre 924", self.cuenta_pesos_barata)
    
    def test_retirar_dinero_classic(self):
        # Test: Retirar dentro del límite diario
        resultado = self.cliente_classic.retirar_dinero(self.cuenta_pesos, 5000)
        self.assertTrue(resultado)

        self.assertEqual(self.cuenta_pesos.saldo, 50000 - 5000)

        # Test: Exceder el límite diario
        resultado = self.cliente_classic.retirar_dinero(self.cuenta_pesos, 5001)  # Esto excede el límite diario
        self.assertEqual(resultado,"No puede retirar más de $10000 por día.")
    
    def test_limite_diario_gold(self):
        # Test: Retirar más allá del límite diario
        resultado = self.cliente_gold.retirar_dinero(self.cuenta_pesos, 15000)
        self.assertTrue(resultado)
        self.assertEqual(self.cliente_gold.montoRetiradoHoy, 15000)
        
        resultado = self.cliente_gold.retirar_dinero(self.cuenta_pesos, 21000)  # exceder el límite
        self.assertEqual(resultado, "No puede retirar más de $20000 por día.")
    
    def test_resetear_monto_diario(self):
        # Test: Asegurarse de que el monto retirado se resetea al día siguiente
        self.cliente_black.retirar_dinero(self.cuenta_pesos, 50000)
        self.assertEqual(self.cliente_black.montoRetiradoHoy, 50000)

        # Simulamos el paso a un nuevo día
        self.cliente_black.fechaUltimoRetiro = datetime.now().date() - timedelta(days=1)
        self.cliente_black.resetear_monto_diario()

        # Verificar que el monto retirado hoy se ha reseteado
        self.assertEqual(self.cliente_black.montoRetiradoHoy, 0)

    def test_retirar_dinero_saldo_insuficiente(self):
        # Test: Retirar más dinero del que tiene disponible
        resultado = self.classic_testear_saldo_insuficiente.retirar_dinero(self.cuenta_pesos_barata, 401)
        self.assertEqual(resultado, "Saldo insuficiente")
        self.assertEqual(self.cuenta_pesos_barata.saldo, 400)  # El saldo debe mantenerse igual


    def test_vender_usd(self):
        # Test: Vender dólares en cliente Gold
        self.cliente_gold.vender_usd(5000)
        self.assertEqual(self.cliente_gold.cajaAhorroDolares.saldo, 5000)

    def test_comprar_usd(self):
        # Test: Comprar dólares en cliente Black
        self.cliente_black.comprar_usd(2000)
        self.assertEqual(self.cliente_black.cajaAhorroDolares.saldo, 12000)

if __name__ == '__main__':
    unittest.main()
