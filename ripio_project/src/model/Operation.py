'''
Created on 26 feb. 2018

@author: miglesias
'''
from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship 
from src.orm.BaseConnection import Base
import json
 
class Operation(Base):
    __tablename__ = 'operations'
    id = Column(Integer, primary_key=True)
    amount = Column(Integer)
   # solo sirve si se pudieran hacer transferencias entre cuentas de diferentes tipos 
   #  ratio =  Column(Integer)
    type = Column(String(1))
    date = Column(Date)

    currency = relationship("Currency", order_by="Currency.id")
    
    transaction_id = Column(Integer, ForeignKey('transactions.id'))

    def __init__(self, params):
        pass
    
    def get_currency(self):
        return self.currency
        
    @classmethod   
    def fromJson(self, json_stream):
        operation = Operation()
        operation.__dict__.update(json.loads(json_stream))
        ''' if '__A__' in o:
     
            a = A()
     
            a.__dict__.update(o['__A__'])
     
            return a
     
        elif '__datetime__' in o:
     
            return datetime.strptime(o['__datetime__'], '%Y-%m-%dT%H:%M:%S')        
     
        return o '''        
        return operation