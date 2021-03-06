'''
Created on 5 feb. 2018

@author: miglesias
'''


from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from ripio_project.orm.BaseConnection import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
    enable = Column(Boolean)
  
    accounts = relationship("Account", order_by="Account.id")
    
    #transactions = relationship("Transaction", back_populates="user", foreign_keys="Transaction.user_id", order_by="Transaction.id")
    
    def __init__(self, name=None, email=None, enable=True):
        self.name = name
        self.email = email
        self.enable = enable
        
    def get_balance_for_account(self, account):
        pass 
    
    def find_account_by_currency(self, currency):
        result = None
        for account in self.accounts:
            if account.currency.symbol == currency.symbol: 
                result = account
        return result 
    
    def get_transactions_for_account(self, account):
        pass

    def toJSON(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'enable': self.enable
            }
    
    @classmethod   
    def fromJson(self, json_stream):
        user = User()
        user.__dict__.update(json_stream)
        
        return user

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

