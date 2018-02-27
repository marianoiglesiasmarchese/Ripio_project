'''
Created on 26 feb. 2018

@author: miglesias
'''
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship 
from src.orm.BaseConnection import Base
import json

class Operation(Base):
    __tablename__ = 'operations'
    id = Column(Integer, primary_key=True)
    amount = Column(Integer)
    ratio =  Column(Integer)

    currency = relationship("Currency", back_populates="operation")
    
    transaction = relationship("Transaction", back_populates="operation")

    def __init__(self, params):
        '''
        Constructor
        '''
        