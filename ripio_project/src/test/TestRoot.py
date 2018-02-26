'''
Created on 5 feb. 2018

@author: miglesias
'''

from root import Root
import unittest
import json
from model.User import User

class TestRoot(unittest.TestCase):

    def setUp(self):
        print ""
        # self.db_fd, self.app.config['DATABASE'] = tempfile.mkstemp()
        # self.app.testing = True
        # self.app = self.app.test_client()
        # with self.app.app_context():
        # self.init_db()

    def tearDown(self):
        print ""
        # os.close(self.db_fd)
        # os.unlink(self.app.config['DATABASE'])

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
    