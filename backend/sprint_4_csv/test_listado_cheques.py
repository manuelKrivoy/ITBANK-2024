import unittest
from listado_cheques import leer_cheques_csv, filtrar_cheques  # Asegúrate de importar solo lo necesario

class TestCheques(unittest.TestCase):
    
    def test_leer_cheques(self):
        cheques = leer_cheques_csv('cheques.csv')  # Asegúrate de tener un archivo cheques.csv
        self.assertGreater(len(cheques), 0)  # Verifica que se lean algunos cheques

    def test_filtrar_cheques(self):
        cheques = [
            {"DNI": "12345678", "TipoCheque": "EMITIDO", "Estado": "aprobado"},
            {"DNI": "87654321", "TipoCheque": "DEPOSITADO", "Estado": "pendiente"},
        ]
        filtrados = filtrar_cheques(cheques, "12345678", "EMITIDO")
        self.assertEqual(len(filtrados), 1)  # Debería filtrar correctamente

if __name__ == '__main__':
    unittest.main()