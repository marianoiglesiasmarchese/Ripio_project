'''
Created on 21 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String 
from sqlalchemy.orm import relationship
from src.orm.BaseConnection import Base
import json
from src.model.enum.OperationType import OperationType
from model.exception import DecreaceAmountError

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    amount = Column(Integer)

    currency = relationship("Currency", order_by="Currency.id")
    
    user_id = Column(Integer, ForeignKey('users.id'))

    def __init__(self, currency):
        self.amount = 0
        if self.currency == None:
            self.currency = []
        self.currency.append(currency)
        
    def apply_operation(self, operation):
        if operation.type == OperationType.CREDIT:
            self.increace_amount(operation.amount)
        else:
            self.decreace_amount(operation.amount)
        
    def increace_amount(self, amount):
        self.amount += amount
        
    def decreace_amount(self, amount):
        if (self.amount - amount) > 0:
            self.amount -= amount
        else:
            raise DecreaceAmountError("El monto que se intenta debebitar es demaciado grande")
        
    def toJSON(self):
        return {
            'id': self.id, 
            'name': self.name,
            'amount': self.amount,
            'currency': self.currency[0].toJSON()
            }           
        
    @classmethod   
    def fromJson(self, json_stream):
        account = Account()
        account.__dict__.update(json.loads(json_stream))
        
        return account
        
