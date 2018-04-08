'''
Created on 26 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship 

from ripio_project.orm.BaseConnection import Base


class Operation(Base):
    __tablename__ = 'operations'
    id = Column(Integer, primary_key=True)
    amount = Column(Integer)
   # solo sirve si se pudieran hacer transferencias entre cuentas de diferentes tipos 
   #  ratio =  Column(Integer)
    date = Column(Date)
    
    origin_account_id = Column(Integer, ForeignKey('accounts.id'))
    origin_account = relationship("Account", foreign_keys=[origin_account_id]) 
    
    target_account_id = Column(Integer, ForeignKey('accounts.id'))
    target_account = relationship("Account", foreign_keys=[target_account_id]) 
    
    transaction = relationship("Transaction", back_populates="operation", order_by="Transaction.id")

    def __init__(self, amount=None, date=None, origin_account=None, target_account=None):
        self.amount = amount
        self.date = date
        self.origin_account = origin_account
        self.target_account = target_account
                
    def toJSON(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'date': self.date,
            'origin_account': self.origin_account.toJSON(),
            'target_account': self.target_account.toJSON()
            }          
        
    @classmethod   
    def fromJson(self, json_stream):
        operation = Operation()
        operation.__dict__.update(json_stream)
      
        return operation