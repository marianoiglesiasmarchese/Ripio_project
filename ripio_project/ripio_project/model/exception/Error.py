'''
Created on 26 feb. 2018

@author: miglesias
'''


class Error(Exception):
    '''
    classdocs
    '''

    def __init__(self, msg):
        self.msg = msg
        
    def __repr__(self):
        return '<Error, message: %r>' % (self.msg)
