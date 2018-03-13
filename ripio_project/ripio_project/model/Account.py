'''
Created on 21 feb. 2018

@author: miglesias
'''

import json

from sqlalchemy import Column, ForeignKey, Integer, String 
from sqlalchemy.orm import relationship

from ripio_project.model.enum.OperationType import OperationType
from ripio_project.model.exception import DecreaceAmountError
from ripio_project.orm.BaseConnection import Base


class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    amount = Column(Integer)

    currency = relationship("Currency", uselist=False, back_populates="account", order_by="Currency.id")
    
    user_id = Column(Integer, ForeignKey('users.id'))

    def __init__(self, currency):
        self.amount = 0
        self.currency = currency
        
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
            'currency': self.currency.toJSON()
            }           
        
    @classmethod   
    def fromJson(self, json_stream):
        account = Account()
        account.__dict__.update(json.loads(json_stream))
        
        return account
        
