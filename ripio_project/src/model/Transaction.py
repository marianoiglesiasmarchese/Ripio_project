'''
Created on 5 feb. 2018

@author: miglesias
'''
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.orm.BaseConnection import Base
import json


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    
    origin_user_id = Column(ForeignKey('users.id'))
    origin_user = relationship("User", back_populates="emited_transactions")
    
    target_user_id = Column(ForeignKey('users.id'))
    target_user = relationship("User", back_populates="received_transactions")

    def __init__(self, params):
        '''
        Constructor
        '''