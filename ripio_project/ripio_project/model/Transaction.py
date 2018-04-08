'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ripio_project.orm.BaseConnection import Base


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    type = Column(String(1))
    
    account_id = Column(Integer, ForeignKey('accounts.id'))
    account = relationship("Account", back_populates="transactions", foreign_keys=[account_id])
    
    operation_id = Column(Integer, ForeignKey('operations.id'))
    operation = relationship("Operation", back_populates="transaction") 
 
    def __init__(self, operation, type=None):
        self.operation = operation
        self.type = type
    
    def toJSON(self):
        return {
            'id': self.id,
            'operation': self.operation.toJSON(),
            'type': self.type,
            'account': self.account.toJSON()
            }    
    
    @classmethod   
    def fromJson(self, json_stream):
        transaction = Transaction()
        transaction.__dict__.update(json_stream)
       
        return transaction   
    
     
