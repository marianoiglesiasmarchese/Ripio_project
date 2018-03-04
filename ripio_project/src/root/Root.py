'''
Created on 5 feb. 2018

@author: miglesias
'''
 
from flask import Flask, jsonify, request, Response
import json
import logging
from src.orm.BaseConnection import db_session, init_db, engine
from model.User import User
from model.Operation import Operation
from model.Currency import Currency
from model.Account import Account
from root.HttpStatus import HttpStatus
from model.exception.BadRequestError import BadRequestError
from src.model.service import TransactionEngineService

app = Flask("__name__")
app.config['DEBUG'] = True

logger = logging.getLogger(__name__)

db = db_session

@app.teardown_appcontext
def shutdown_session(exception=None ):
    db.remove()
    

@app.route("/")
def root():
    # return "Hello, World!"
    return json.JSONEncoder().encode({"currency": ["peso", "dollar"]})


@app.route("/user/<user_id>")
def userAccount(user_id):
    #logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())
  

@app.route("/user/<user_id>")
def find_user(user_id):
    #logger.info('finding user')
    user = db.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())
  

@app.route('/currencies', methods=['POST'])
def create_currency():
    """Registers the user."""
    response = None
    
    if not request.form['currency']:
        exception = BadRequestError("","")
        response = Response(jsonify(exception), status=HttpStatus.HTTP_BAD_REQUEST, mimetype='application/json')
    else:
        new_currency = Currency()
        db.add(new_currency)
        db.commit()
        response = Response(jsonify(new_currency), status=HttpStatus.HTTP_OK_BASIC, mimetype='application/json')
    return response  
  
  
''' TODO >  posiblemente deba cambiar el rest'''
@app.route("/user/<origin_id>/do_transaction_to/<target_id>")
def do_transaction(origin_id,target_id):
     
    if not request.form['operation'] :
        
        exception = BadRequestError("","")
        response = Response(jsonify(exception), status=HttpStatus.HTTP_BAD_REQUEST, mimetype='application/json')
        #logger.info('finding user')
    
    else:
        
        origin = db.query(User).filter(User.id == origin_id).first() 
        target = db.query(User).filter(User.id == target_id).first() 
        
        operation = Operation.fromJson(request.form['operation']) 
        
        ''' TODO > # aca deberia haber una injeccion de dependencia '''
        transaction_service = TransactionEngineService()
        transaction_service.do_transaction(origin, target, operation)
        
        response = Response(jsonify(exception), status=HttpStatus.HTTP_OK_BASIC, mimetype='application/json')
  
    return response
  
    
def init_db_and_populate():
    """Creates the database tables."""
    init_db()
    
    currency = Currency('peso', '$')
    
    account = Account(currency)
    
    user1 = User('admin', 'admin@localhost')
    
    user1.accounts.append(account)

    db.add(user1)
    db.commit() 

    currencyUSD = Currency('dollar', 'USD')
    
    accountUSD = Account(currencyUSD)
    
    user2 = User('adminYankee', 'adminYankee@localhost')
    
    user2.accounts.append(accountUSD)

    db.add(user2)
    db.commit() 

    
  #  db.delete(u1)  # Deleting the department also deletes all of its employees.
  #  db.commit()
    
    #print db.query(User).all()

    
    print('Initialized the database.')
    
    
if __name__ == "__main__":

    init_db_and_populate()
    
    app.run(use_reloader=False)    
    
