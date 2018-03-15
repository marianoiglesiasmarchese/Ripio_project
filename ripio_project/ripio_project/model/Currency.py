'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, Integer, String 
from sqlalchemy.orm import relationship

from ripio_project.orm.BaseConnection import Base


class Currency(Base):
    __tablename__ = 'currencies'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    symbol = Column(String(3), unique=True)

    #account_id = Column(Integer, ForeignKey('accounts.id'))
    account = relationship("Account", back_populates="currency")   
    
    #operation_id = Column(Integer, ForeignKey('operations.id'))
    operation = relationship("Operation", back_populates="currency")

    def __init__(self, name=None, symbol=None):
        self.name = name
        self.symbol = symbol
        
    def toJSON(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            }        
        
    @classmethod   
    def fromJson(self, json_stream):
        currency = Currency()
        currency.__dict__.update(json_stream)
        
        return currency
            
