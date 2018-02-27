'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String 
from src.orm.BaseConnection import Base
import json

class Currency(Base):
    __tablename__ = 'currencies'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    simbol = Column(String(3), unique=True)

    def __init__(self, name=None, simbol=None):
        self.name = name
        self.simbol = simbol