'''
Created on 26 feb. 2018

@author: miglesias
'''

from model.exception.Error import Error

class BadRequestError(Error):

    def __init__(self, request):
        Error.__init__(self, request=request, message='Invalid request')
        
    def __repr__(self):
        return '<BadRequestError in: {0}>'.format(self.toJSON())
                
    def toJSON(self):
        return {
            'exception': 'BadRequestError',
            'error': Error.toJSON(self),
            }  
        