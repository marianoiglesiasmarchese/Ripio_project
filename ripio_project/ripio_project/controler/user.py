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


@app.route("/ripio_app/users/<user_id>")
def find_user(user_id):
    # logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())


@app.route("/ripio_app/users")
def get_all_users():

    userListResult = [] 
    
    # logger.info('finding user')
    userList = db.query(User).all()
    
    for user in userList:
        userListResult.append(user.toJSON())
    
    return jsonify(userListResult)


@app.route("/ripio_app/users", methods=['POST'])
def create_user():

    response = None
        
    if not request.json:
        exception = BadRequestError("", "")
        response = 'exception'
    else:
        try:
            new_user = User(request.json['name'], request.json['email'])
            
            # TODO > faltan cosas del usuario
            
            db.add(new_user)
            db.commit()
            response = new_user.toJSON()
        except Exception as err:
            db.rollback()            
            # print(err.msg)
            response = 'exception'
    return jsonify(response) 

  
@app.route('/ripio_app/users/<user_id>/accounts', methods=['GET'])
def find_all_user_accounts(user_id):
    
    accountListResult = [] 
    
    # logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    
    for account in user.accounts:
        accountListResult.append(account.toJSON())
    
    return jsonify(accountListResult)  


@app.route('/ripio_app/users/<user_id>/accounts', methods=['POST'])
def create_user_account(user_id):
    
    response = None
        
    if not request.json:
        exception = BadRequestError("", "")
        response = 'exception'
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
            # print(err.msg)
            response = 'exception'
    return jsonify(response) 


@app.route("/ripio_app/users/<origin_id>/do_transaction_to/<target_id>", methods=['POST'])
def new_transaction(origin_id, target_id):
     
    response = None
        
    if not request.json:
        exception = BadRequestError("", "")
        response = 'exception'
    else:
        try:
            origin = db.query(User).filter(User.id == origin_id).first() 
            target = db.query(User).filter(User.id == target_id).first() 
            
            currency = db.query(Currency).filter(Currency.id == request.json['currency']['id']).first();
            
            
            operation_date = request.json['date']
            operation_date = datetime.strptime(operation_date, '%Y-%m-%dT%H:%M:%S.%fZ')
            
            operation = Operation(request.json['amount'], request.json['type'], operation_date, currency) 
            
            response = do_transaction(origin, target, operation)
        except Exception as err:
            db.rollback()            
            # print(err.msg)
            response = 'exception'
    return jsonify(response)
 

def do_transaction(origin, target, operation):
    
    response = None
    
    try:            
    
        transaction = Transaction(origin, target, operation)  # falta saber si parte de una operacion de suma o de resta 
        
        origin_account = origin.find_account_by_currency(operation.currency)
        origin.add_emited_transaction(transaction)
        origin_account.decreace_amount(operation.amount)
        
        target_account = target.find_account_by_currency(operation.currency)
        target.add_received_transaction(transaction)
        target_account.increace_amount(operation.amount)  # operacion opuesta      

        db.commit()
     
        return transaction.toJSON()
     
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
