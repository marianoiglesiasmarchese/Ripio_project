'''
Created on 26 feb. 2018

@author: miglesias
'''

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
    #currency_id = Column(Integer)

    currency_id = Column(Integer, ForeignKey('currencies.id'))
    currency = relationship("Currency", uselist=False, back_populates="operation", order_by="Currency.id")
    
    transaction_id = Column(Integer, ForeignKey('transactions.id'))
    transaction = relationship("Transaction", back_populates="operation")

    def __init__(self, amount=None, type=None, date=None, currency=None):
        self.amount = amount
        self.type = type
        self.date = date
        self.currency = currency
                
    def toJSON(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'type': self.type,
            'date': self.date,
            'currency': self.currency.toJSON(),
            }          
        
    @classmethod   
    def fromJson(self, json_stream):
        operation = Operation()
        operation.__dict__.update(json_stream)
      
        return operation