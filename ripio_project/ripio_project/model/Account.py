'''
Created on 21 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

from ripio_project.model.enum.OperationType import OperationType
from ripio_project.model.exception import DecreaceAmountError
from ripio_project.orm.BaseConnection import Base


class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    amount = Column(Integer)
    enable = Column(Boolean)

    currency_id = Column(Integer, ForeignKey('currencies.id'))
    currency = relationship("Currency", back_populates="account", order_by="Currency.id")
    
    user_id = Column(Integer, ForeignKey('users.id'))

    def __init__(self, currency, amount=0, name=None, enable=True):
        self.amount = amount
        self.currency = currency
        self.name = name
        self.enable = enable
        
    def apply_operation(self, operation, operationType):
        if operationType == OperationType.CREDIT:
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
            'currency': self.currency.toJSON(),
            'enable': self.enable
            }           
        
    @classmethod   
    def fromJson(self, json_stream, currency):         
        account = Account(currency, json_stream['amount'], json_stream['name'])
        
        return account
        
