'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from ripio_project.orm.BaseConnection import Base


class Currency(Base):
    __tablename__ = 'currencies'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    symbol = Column(String(3), unique=True)
    enable = Column(Boolean)

    account = relationship("Account", back_populates="currency")   

    def __init__(self, name=None, symbol=None, enable=True):
        self.name = name
        self.symbol = symbol
        self.enable = enable
        
    def toJSON(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'enable': self.enable
            }        
        
    @classmethod   
    def fromJson(self, json_stream):
        currency = Currency()
        currency.__dict__.update(json_stream)
        
        return currency
            
