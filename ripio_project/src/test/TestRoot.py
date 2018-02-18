'''
Created on 5 feb. 2018

@author: miglesias
'''

from root import root
import unittest
import json

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

    def test_empty_db(self):
        client = root.app.test_client()
        response = client.get("/").data
        responseDecoded = json.JSONDecoder().decode(response)
        # assert b'World' in responseDecoded
        self.assertEqual(responseDecoded, {"currency": ["peso", "dollar"]})

if __name__ == '__main__':
    unittest.main()    