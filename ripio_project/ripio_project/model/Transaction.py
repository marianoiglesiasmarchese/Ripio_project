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
    
    #origin_user_id = Column(Integer, ForeignKey('users.id'))
    #origin_user = relationship("User", back_populates="emited_transactions", foreign_keys=[origin_user_id])
    
    #target_user_id = Column(Integer, ForeignKey('users.id'))
    #target_user = relationship("User", back_populates="received_transactions", foreign_keys=[target_user_id])
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="transactions", foreign_keys=[user_id])
    
    # operation = relationship("Operation", uselist=False, back_populates="transaction", order_by="Operation.id")
    
    operation_id = Column(Integer, ForeignKey('operations.id'))
    operation = relationship("Operation", back_populates="transaction") 
 
    def __init__(self, user, operation, type=None):
        #self.origin_user = origin_user
        #self.target_user = target_user
        self.user = user
        self.operation = operation
        self.type = type
    
    def toJSON(self):
        return {
            'id': self.id,
            'user': self.user.toJSON(),
            # 'target_user': self.target_user.toJSON(),
            'operation': self.operation.toJSON(),
            'type': self.type,
            }    
    
    @classmethod   
    def fromJson(self, json_stream):
        transaction = Transaction()
        transaction.__dict__.update(json_stream)
       
        return transaction   
    
     
