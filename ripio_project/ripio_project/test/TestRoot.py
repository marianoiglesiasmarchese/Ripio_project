'''
Created on 5 feb. 2018

@author: miglesias
'''

import unittest

from ripio_project import app
from ripio_project.model.User import User


class TestRoot(unittest.TestCase):

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


    def test_root_path(self):
        client = Root.app.test_client()
        with Root.app.app_context():
            Root.init_db_and_populate()
        
        response = client.get("/user/1").data
        responseDecoded = User.fromJson(response)
        # assert b'World' in responseDecoded
        u = User('admin', 'admin@localhost')
        
        self.assertEqual(responseDecoded, u)

    def test_db(self):
        pass
            
        #self.assertEqual(user_finded, user)                
        

if __name__ == '__main__':
    unittest.main()    
    
