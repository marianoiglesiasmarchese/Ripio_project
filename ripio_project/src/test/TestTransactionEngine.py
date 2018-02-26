'''
Created on 5 feb. 2018

@author: miglesias
'''

import unittest
from src.model.TransactionEngine import TransactionEngine
from src.model.User import User
from pydblite.sqlite import Database, Table

class TestTransactionEngine(unittest.TestCase):
    
    def testEngine(self):
        self.sqlite()
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
    
    def sqlite(self):
        # connect to SQLite database "test"
        db = Database(":memory:")
        # pass the table name and database path as arguments to Table creation
        table = Table('dummy', db)
        # create new base with field names
        table.create(('name', 'TEXT'), ('age', 'INTEGER'), ('size', 'REAL'))
        # existing base
        table.open()
        # insert new record
        table.insert(name='homer', age=23, size=1.84)
        table.insert(name='marge', age=36, size=1.94)
        rec_id = table.insert(name='Lisa', age=13, size=1.24)
    
        # records are dictionaries with a unique integer key __id__
        # selection by list comprehension
        res = [r for r in table if 30 > r['age'] >= 18 and r['size'] < 2]
        print("res:", res)
        # or generator expression
        for r in (r for r in table if r['name'] in ('homer', 'marge')):
            pass
        # simple selection (equality test)
        records = table(age=23)
    
        # delete a record by its id
        del table[rec_id]
    
        rec_id = records[0]['__id__']
    
        # direct access by id
        record = table[rec_id]  # the record such that record['__id__'] == rec_id
        # update
        table.update(record, age=24)
        # add a field
        table.add_field('new_field')  # Defaults to type 'TEXT'
        # save changes on disk
        table.commit()

    
# runs the unit tests in the module
if __name__ == '__main__':
    unittest.main()
