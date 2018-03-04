'''
Created on 5 feb. 2018

@author: miglesias
'''
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, backref
from src.orm.BaseConnection import Base
import json

class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    
    origin_user_id = Column(Integer, ForeignKey('users.id'))
    
    target_user_id = Column(Integer, ForeignKey('users.id'))
    
    operation = relationship("Operation", order_by="Operation.id")
 
    def __init__(self, origin_user, target_user, operation):
        self.origin_user = origin_user
        self.target_user = target_user
        self.operation = operation
    
    @classmethod   
    def fromJson(self, json_stream):
        transaction = Transaction()
        transaction.__dict__.update(json.loads(json_stream))
        ''' if '__A__' in o:
     
            a = A()
     
            a.__dict__.update(o['__A__'])
     
            return a
     
        elif '__datetime__' in o:
     
            return datetime.strptime(o['__datetime__'], '%Y-%m-%dT%H:%M:%S')        
     
        return o '''        
        return transaction   
    
    
     