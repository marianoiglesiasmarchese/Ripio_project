'''
Created on 5 feb. 2018

@author: miglesias
'''

from model.Transaction import Transaction
from src.model.exception import DecreaceAmountError
from src.orm.BaseConnection import db_session

db = db_session

class TransactionEngine(object):


    def __init__(self, params):
        '''
        Constructor
        '''
        
 
    def do_transaction(self, origin, target, operation):
        
        try:            
        
            transaction = Transaction(origin,target,operation) # falta saber si parte de una operacion de suma o de resta
            
            origin_account = origin.find_account_by_currency(operation.get_currency())
            origin.add_emited_transaction(transaction)
            origin_account.decreace_amount(operation)
            
            target_account = target.find_account_by_currency(operation.get_currency())
            target.add_received_transaction(transaction)
            target_account.increace_amount(operation)   # operacion opuesta      

            db.commit()
         
        except DecreaceAmountError as err:
            db.rollback()            
            print(err.msg)
            # raise -> permite indicar que una Exception siga

        finally:
            pass
