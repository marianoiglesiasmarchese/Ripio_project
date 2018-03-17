'''
Created on 26 feb. 2018

@author: miglesias
'''

class Error(Exception):

    message = 'Unknown server error'

    def __init__(self, request=None, message=None, status_code=500, payload=None):
        Exception.__init__(self)
        if message is not None:
            self.message = message
        self.status_code = status_code
        self.payload = payload
        self.request = request
        
    def __repr__(self):
        return '<Error, message: {0}, status: {1}, payload: {2}, request: {3}>'.format(self.message, self.status_code, self.payload, self.request)
    
    def toJSON(self):
        return {
            'request': format(self.request),
            'message': self.message,
            'status_code': self.status_code,
            'payload': self.payload,
            }  
        