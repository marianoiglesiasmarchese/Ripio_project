'''
Created on 26 feb. 2018

@author: miglesias
'''

import Error

class BadRequestError(Error):
    """Exception raised for errors in a request.

    Attributes:
        request -- request expression in which the error occurred
        msg  -- explanation of the error
    """

    def __init__(self, request, msg):
        self.request = request
        self.msg = msg
        
    def toJSON(self):
        return {
            'id': self.id, 
            'name': self.name,
            'email': self.email,
            }
        
    def __repr__(self):
        return '<BadRequestError in: %r, message: %r>' % (self.request) % (self.msg)
                