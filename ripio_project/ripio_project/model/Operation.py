'''
Created on 26 feb. 2018

@author: miglesias
'''
import json

from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship 

from ripio_project.orm.BaseConnection import Base


class Operation(Base):
    __tablename__ = 'operations'
    id = Column(Integer, primary_key=True)
    amount = Column(Integer)
   # solo sirve si se pudieran hacer transferencias entre cuentas de diferentes tipos 
   #  ratio =  Column(Integer)
    type = Column(String(1))
    date = Column(Date)
    currency_id = Column(Integer)

    # currency = relationship("Currency", uselist=False, back_populates="operation", order_by="Currency.id")
    
    transaction_id = Column(Integer, ForeignKey('transactions.id'))
    transaction = relationship("Transaction", back_populates="operation")

    def __init__(self, amount=None, type=None, date=None, currency_id=None):
        self.amount = amount
        self.type = type
        self.date = date
        self.currency_id = currency_id
        
    def toJSON(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'type': self.type,
            'date': self.date,
            'currency_id': self.currency_id,
            }          
        
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