'''
Created on 5 feb. 2018

@author: miglesias
'''

class Currency(object):

    __varPrivada=7
    
    varPublica=9

    def __init__(self, dato1=0, dato2=0):
        self.__varPrivada = dato1
        self.varPublica = dato2
        
    def __funPrivada(self):
        return "no se pude invocar afuera de la clase"

    def funPublica(self):
        return "se puede invocar afuera de la clase"