'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.orm.BaseConnection import Base
import json

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
    accounts = relationship("Account", back_populates="user")
    
    emited_transactions = relationship("Transaction", back_populates="origin_user")
    
    received_transactions  = relationship("Transaction", back_populates="target_user")
    
    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def get_balance_for_account(self, account):
        pass 

    def toJSON(self):
        return {
            'id': self.id, 
            'name': self.name,
            'email': self.email,
            }
       # return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
    @classmethod   
    def fromJson(self, json_stream):
        usr = User()
        usr.__dict__.update(json.loads(json_stream))
        ''' if '__A__' in o:
     
            a = A()
     
            a.__dict__.update(o['__A__'])
     
            return a
     
        elif '__datetime__' in o:
     
            return datetime.strptime(o['__datetime__'], '%Y-%m-%dT%H:%M:%S')        
     
        return o '''        
        return usr

    def __eq__(self, other):
        """Overrides the default implementation"""
        if isinstance(self, other.__class__):
            return self.__dict__ == other.__dict__
        return False
    
    def __ne__(self, other):
        """Overrides the default implementation (unnecessary in Python 3)"""
        return not self.__eq__(other)

    def __repr__(self):
        return '<User %r>' % (self.name)


