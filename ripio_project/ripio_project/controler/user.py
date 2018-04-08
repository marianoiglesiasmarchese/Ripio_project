'''
Created on 12 mar. 2018

@author: miglesias
'''

from flask import jsonify, request

from datetime import datetime

from ripio_project import app, db
from ripio_project.model.Account import Account
from ripio_project.model.Currency import Currency
from ripio_project.model.Operation import Operation 
from ripio_project.model.User import User 
from ripio_project.model.exception.BadRequestError import BadRequestError
from ripio_project.model.Transaction import Transaction
from ripio_project.model.exception.DecreaceAmountError import DecreaceAmountError
from model.exception.Error import Error
from ripio_project.model.enum.OperationType import OperationType
import copy


@app.route("/ripio_app/users", methods=['POST'])
def create_user():

    app.logger.info('creating a user')
    response = None
        
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            new_user = User(request.json['name'], request.json['email'])
            
            db.add(new_user)
            db.commit()
            response = new_user.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred: {0}'.format(err.message))
            raise Error(request=request)
    return jsonify(response) 


@app.route("/ripio_app/users/<user_id>", methods=['PUT'])
def update_user(user_id):

    app.logger.info('updating a user')
    response = None
         
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            user = db.query(User).filter(User.id == user_id).first() 
            user.name = request.json['name']
            user.email =  request.json['email']
            user.enable =  request.json['enable']
            #user.__dict__.update(request.json)
            
            #db.add(user)
            db.commit()
            response = user.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred: {0}'.format(err.message))
            raise Error(request=request)
    return jsonify(response) 


@app.route("/ripio_app/users/<user_id>")
def find(user_id):
    
    app.logger.info('getting a user')

    user = db.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())


@app.route("/ripio_app/users")
def get_all():

    app.logger.info('getting all users')

    userListResult = [] 
    
    userList = db.query(User).filter(User.enable == 1).all()
    for user in userList:
        userListResult.append(user.toJSON())
    
    return jsonify(userListResult)

  
@app.route('/ripio_app/users/<user_id>/accounts', methods=['GET'])
def find_all_accounts(user_id):
    
    app.logger.info('getting all accounts for a user')
    
    accountListResult = [] 
    
    user = db.query(User).filter(User.id == user_id).first() 
    
    for account in user.accounts:
        if account.enable:
            accountListResult.append(account.toJSON())
    
    return jsonify(accountListResult)  


@app.route('/ripio_app/users/<user_id>/accounts', methods=['POST'])
def create_account(user_id):
    
    app.logger.info('creating a account for a user')
    
    response = None
        
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            currency = db.query(Currency).filter(Currency.id == request.json['currency']['id']).first()
            account = Account.fromJson(request.json, currency)
            
            user = db.query(User).filter(User.id == user_id).first()             
            user.accounts.append(account)
            
            db.add(user)
            db.commit()
            response = account.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred: {0}'.format(err.message))
            raise Error(request=request)
    return jsonify(response) 


@app.route('/ripio_app/users/<user_id>/accounts/<account_id>', methods=['PUT'])
def update_account(user_id, account_id):
    
    app.logger.info('updating a account for a user')
    
    response = None
        
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            account = db.query(Account).filter(Account.id == account_id).first()
            account.name = request.json['name']
            account.amount = request.json['amount']
            account.enable = request.json['enable']
            
            db.commit()
            response = account.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred: {0}'.format(err.message))
            raise Error(request=request)
    return jsonify(response) 


@app.route('/ripio_app/users/<user_id>/accounts/<account_id>/transactions', methods=['GET'])
def find_account_transactions(user_id, account_id):
    
    app.logger.info('getting all transactions for a user account')
    
    transactionListResult = [] 
    
    account = db.query(Account).filter(Account.id == account_id).first()
    
    for transaction in account.transactions:
        transactionListResult.append(transaction.toJSON())
    
    return jsonify(transactionListResult)   


@app.route("/ripio_app/users/<origin_id>/do_transaction_to/<target_id>", methods=['POST'])
def new_transaction(origin_id, target_id):
    
    app.logger.info('creating a transaction fron user: {0} to: {1}'.format(origin_id, target_id))
    
    response = None
        
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            origin = db.query(User).filter(User.id == origin_id).first() 
            target = db.query(User).filter(User.id == target_id).first() 
            
            origin_account = db.query(Account).filter(Account.id == request.json['origin_account']['id']).first()
            target_account = db.query(Account).filter(Account.id == request.json['target_account']['id']).first()
                        
            operation_date = request.json['date']
            operation_date = datetime.strptime(operation_date, '%Y-%m-%dT%H:%M:%S.%fZ')
            
            operation = Operation(request.json['amount'], operation_date, origin_account, target_account) 
         
            response = do_transaction(origin, target, operation)
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred: {0}'.format(err.message))
            raise Error(request=request)
    return jsonify(response)
 

def do_transaction(origin, target, operation):
    
    response = None
    
    try:
                    
        emitedTransaction = Transaction(operation, OperationType.DEBIT) 
        
        operation.origin_account.transactions.append(emitedTransaction)
        operation.origin_account.apply_transaction(emitedTransaction)
                        
        receivedTransaction = Transaction(operation, OperationType.CREDIT) 
        
        operation.target_account.transactions.append(receivedTransaction)
        operation.target_account.apply_transaction(receivedTransaction)        

        db.commit()
     
        return emitedTransaction.toJSON()     
    except DecreaceAmountError as err:
        db.rollback()            
        app.logger.error('An error occurred: {0}'.format(err.message))
        raise DecreaceAmountError(operation)
    except Exception as err:
        db.rollback()            
        app.logger.error('An error occurred: {0}'.format(err.message))
        raise Error()
    finally:
        pass
    
    return response


@app.route("/ripio_app/users/<user_id>/transactions")
def get_all_transactions(user_id): 
    
    app.logger.info('getting all transactions for a user')
    
    transactions_list_result = [] 
    
    user = db.query(User).filter(User.id == user_id).first() 
    transactions_list = user.transactions
    
    for transaction in transactions_list:
        transactions_list_result.append(transaction.toJSON())
    
    return jsonify(transactions_list_result)
