'''
Created on 5 feb. 2018

@author: miglesias
'''

from sqlalchemy import Column, ForeignKey, Integer, String, Table, MetaData, ForeignKey
from sqlalchemy.orm import relationship, backref
from src.orm.BaseConnection import Base
import json


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
  
    accounts = relationship("Account", order_by="Account.id")
    
    emited_transactions = relationship("Transaction", foreign_keys="Transaction.origin_user_id", order_by="Transaction.id")
    
    received_transactions  = relationship("Transaction", foreign_keys="Transaction.target_user_id", order_by="Transaction.id")
    
    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def add_emited_transaction(self, transaction):
        self.emited_transactions.append(transaction)

    def add_received_transaction(self, transaction):
        self.received_transactions.append(transaction)

    def get_balance_for_account(self, account):
        pass 
    
    def find_account_by_currency(self, currency):
        result = None
        for account in self.accounts:
            if account.currency.simbol == currency.simbol: 
                result = account
        return result 

    def toJSON(self):
        return {
            'id': self.id, 
            'name': self.name,
            'email': self.email,
            }
       # return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
    @classmethod   
    def fromJson(self, json_stream):
        user = User()
        user.__dict__.update(json.loads(json_stream))
        ''' if '__A__' in o:
     
            a = A()
     
            a.__dict__.update(o['__A__'])
     
            return a
     
        elif '__datetime__' in o:
     
            return datetime.strptime(o['__datetime__'], '%Y-%m-%dT%H:%M:%S')        
     
        return o '''        
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


