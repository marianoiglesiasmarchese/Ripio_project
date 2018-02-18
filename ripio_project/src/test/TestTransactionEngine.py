'''
Created on 5 feb. 2018

@author: miglesias
'''

import unittest
from src.model.TransactionEngine import TransactionEngine
from src.model.User import User

class TestTransactionEngine(unittest.TestCase):
    
    def testEngine(self):
        transactionEngine = TransactionEngine(self)
        monto = 10
        usuario1 = User(self)
        usuario2 = User(self)
        result = transactionEngine.realizarTransaccion(usuario1, usuario2, monto)
        self.assertEqual(result, True, "transaccion fallida")
        
  
    # initialization logic for the test suite declared in the test module
    # code that is executed before all tests in one test run
    @classmethod
    def setUpClass(cls):
        pass 

    # clean up logic for the test suite declared in the test module
    # code that is executed after all tests in one test run
    @classmethod
    def tearDownClass(cls):
        pass 

    # initialization logic
    # code that is executed before each test
    def setUp(self):
        pass 

    # clean up logic
    # code that is executed after each test
    def tearDown(self):
        pass
    
# runs the unit tests in the module
if __name__ == '__main__':
    unittest.main()
