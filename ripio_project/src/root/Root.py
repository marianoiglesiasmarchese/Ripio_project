'''
Created on 5 feb. 2018

@author: miglesias
'''
 
from flask import Flask, jsonify, request, Response, make_response
import json
import logging
from src.orm.BaseConnection import db_session, init_db, engine
from model.User import User
from model.Operation import Operation
from model.Currency import Currency
from model.Account import Account
from root.HttpStatus import HttpStatus
from model.exception.BadRequestError import BadRequestError
from src.model.service.TransactionEngineService import TransactionEngineService 
from pony.orm.dbapiprovider import IntegrityError

app = Flask("__name__")
app.config['DEBUG'] = True

logger = logging.getLogger(__name__)

db = db_session

@app.teardown_appcontext
def shutdown_session(exception=None ):
    db.remove()
    
@app.route("/ripio_app/")
def root():
    return "Ripio transactional project" 

@app.route("/ripio_app/users/<user_id>")
def find_user(user_id):
    #logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())

@app.route("/ripio_app/users")
def get_all_users():

    userListResult = [] 
    
    #logger.info('finding user')
    userList = db.query(User).all()
    
    for user in userList:
        userListResult.append(user.toJSON())
    
    return jsonify(userListResult)

@app.route("/ripio_app/users", methods=['POST'])
def create_user():

    """Registers the user."""
    response = None
        
    if not request.json:
        exception = BadRequestError("","")
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
    return jsonify(response ) 
  
@app.route('/ripio_app/users/<user_id>/accounts', methods=['GET'])
def find_all_user_accounts(user_id):
    
    accountListResult = [] 
    
    #logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    
    for account in user.accounts:
        accountListResult.append(account.toJSON())
    
    return jsonify(accountListResult)  

@app.route('/ripio_app/users/<user_id>/accounts', methods=['POST'])
def create_user_account(user_id):
    """Registers the user."""
    response = None
    
    if not request.form['account'] or not request.form['currency'] :
        exception = BadRequestError("","")
        response = Response(jsonify(exception), status=HttpStatus.HTTP_BAD_REQUEST, mimetype='application/json')
    else:
        ''' crear una cuenta para un usuario en particular y de un tipo particular '''
        new_currency = Account()
        db.add(new_currency)
        db.commit()
        response = Response(jsonify(new_currency), status=HttpStatus.HTTP_OK_BASIC, mimetype='application/json')
    return response  
  
''' TODO >  posiblemente deba cambiar el rest'''
@app.route("/ripio_app/users/<origin_id>/do_transaction_to/<target_id>", methods=['POST'] )
def do_transaction(origin_id,target_id):
     
    response = None
        
    if not request.json:
        exception = BadRequestError("","")
        response = 'exception'
    else:
        try:
            origin = db.query(User).filter(User.id == origin_id).first() 
            target = db.query(User).filter(User.id == target_id).first() 
            
            currency = Currency.fromJson(request.json['currency']);
            
            operation = Operation(request.json['amount'], request.json['type'], request.json['date'], currency) 
            
            ''' TODO > # aca deberia haber una injeccion de dependencia '''
            transaction_service = TransactionEngineService()
            
            response = transaction_service.do_transaction(origin, target, operation)
        except Exception as err:
            db.rollback()            
            # print(err.msg)
            response = 'exception'
    return jsonify(response) 


@app.route('/ripio_app/currencies', methods=['POST'])
def create_currency():
    
    """Registers the user."""
    response = None
        
    if not request.json:
        exception = BadRequestError("","")
        response = jsonify(exception)
    else:
        try:
            new_currency = Currency(request.json['name'], request.json['symbol'])
            db.add(new_currency)
            db.commit()
            response = new_currency.toJSON()
        except Exception as err:
            db.rollback()            
            # print(err.msg)
            response = 'exception'
    return jsonify(response ) 
    
@app.route('/ripio_app/currencies', methods=['GET'])
def get_all_currencies():
    
    currenciesListResult = [] 
        
    #logger.info('finding user')
    currenciesList = db.query(Currency).all()
        
    for currency in currenciesList:
        currenciesListResult.append(currency.toJSON())
        
    return jsonify(currenciesListResult)
          
    
def init_db_and_populate():
    """Creates the database tables."""
    init_db()
    
    
    ''' TODO > aca deberia realizar una migracion para contar con datos ! '''
    currency = Currency('peso', '$')
    
    account = Account(currency)
    account.amount = 100.5
    
    user1 = User('admin', 'admin@localhost')
    
    user1.accounts.append(account)

    db.add(user1)
    db.commit() 

    currencyUSD = Currency('dollar', 'USD')
    
    accountUSD = Account(currencyUSD)
    accountUSD.amount = 50
    
    user2 = User('adminYankee', 'adminYankee@localhost')
    
    user2.accounts.append(accountUSD)

    db.add(user2)
    db.commit() 
    
    print('Initialized the database.')
    
    
if __name__ == "__main__":

    init_db_and_populate()
    
    app.run(use_reloader=False)    
    
