'''
Created on 28 feb. 2018

@author: miglesias
'''

class MyClass(object):
    '''
    classdocs
    '''

    def __init__(self, msg):
        self(msg)
        
    def __repr__(self):
        return '<Error, message: %r>' % (self.msg)