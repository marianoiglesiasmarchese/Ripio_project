'''
Created on 5 feb. 2018

@author: miglesias
'''

from model.Transaction import Transaction
from src.model.exception import DecreaceAmountError
from src.orm.BaseConnection import db_session

db = db_session

class TransactionEngineService(object):


    def __init__(self):
        '''
        Constructor
        '''
        
 
    def do_transaction(self, origin, target, operation):
        
        response = None
        
        try:            
        
            transaction = Transaction(origin,target,operation) # falta saber si parte de una operacion de suma o de resta
            
            origin_account = origin.find_account_by_currency(operation.get_currency())
            origin.add_emited_transaction(transaction)
            origin_account.decreace_amount(operation)
            
            target_account = target.find_account_by_currency(operation.get_currency())
            target.add_received_transaction(transaction)
            target_account.increace_amount(operation)   # operacion opuesta      

            db.commit()
         
            return transaction.toJson()
         
        except DecreaceAmountError as err:
            db.rollback()            
            print(err.msg)
            response = 'exception'
            # raise -> permite indicar que una Exception siga
        except Exception as err:
            db.rollback()            
            # print(err.msg)
            response = 'exception'            
        finally:
            pass
        
        return response
