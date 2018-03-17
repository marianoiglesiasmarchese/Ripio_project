'''
Created on 28 feb. 2018

@author: miglesias
'''

from model.exception.Error import Error

class DecreaceAmountError(Error):
 
    def __init__(self, operation):
        Error.__init__(self, message='Invalid request')
        self.operation = operation
        
    def __repr__(self):
        return '<DecreaceAmountError in: {0} with: {1}>'.format(self.toJSON(), self.operation.toJSON())
                
    def toJSON(self):
        return {
            'exception': 'DecreaceAmountError',
            'error': Error.toJSON(self),
            'operation': self.operation.toJSON()
            }  
        