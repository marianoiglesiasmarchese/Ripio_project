'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String 
from sqlalchemy.orm import relationship
from src.orm.BaseConnection import Base
import json

class Currency(Base):
    __tablename__ = 'currencies'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    simbol = Column(String(3), unique=True)

    account_id = Column(ForeignKey('accounts.id'))
    account = relationship("Account", back_populates="currency")

    def __init__(self, name=None, simbol=None):
        self.name = name
        self.simbol = simbol