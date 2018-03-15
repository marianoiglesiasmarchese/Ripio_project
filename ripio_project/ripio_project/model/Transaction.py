'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from ripio_project.orm.BaseConnection import Base


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True)
    
    ''' TODO > probar bidireccionalidad '''
    origin_user_id = Column(Integer, ForeignKey('users.id'))
    origin_user = relationship("User", back_populates="emited_transactions", foreign_keys=[origin_user_id])
    
    target_user_id = Column(Integer, ForeignKey('users.id'))
    target_user = relationship("User", back_populates="received_transactions", foreign_keys=[target_user_id])
    
    operation = relationship("Operation", uselist=False, back_populates="transaction", order_by="Operation.id") 
 
    def __init__(self, origin_user, target_user, operation):
        self.origin_user = origin_user
        self.target_user = target_user
        self.operation = operation
    
    def toJSON(self):
        return {
            'id': self.id,
            'origin_user': self.origin_user.toJSON(),
            'target_user': self.target_user.toJSON(),
            'operation': self.operation.toJSON(),
            }    
    
    @classmethod   
    def fromJson(self, json_stream):
        transaction = Transaction()
        transaction.__dict__.update(json_stream)
       
        return transaction   
    
     
