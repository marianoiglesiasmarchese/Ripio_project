'''
Created on 21 feb. 2018

@author: miglesias
'''
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.orm.BaseConnection import Base
import json


class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    
    currency = relationship("Currency", back_populates="account")
    
    user_id = Column(ForeignKey('users.id'))
    user = relationship("User", back_populates="accounts")


    def __init__(self, params):
        '''
        Constructor
        '''
        