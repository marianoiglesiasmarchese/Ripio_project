'''
Created on 5 feb. 2018

@author: miglesias
'''

from flask import Flask, jsonify, request, Response
import json
import logging
from src.orm.BaseConnection import db_session, init_db
from model.User import User
from model.Currency import Currency
from root.HttpStatus import HttpStatus
from src.model.exception.BadRequestError import BadRequestError
 
app = Flask("__name__")
app.config['DEBUG'] = True

session = db_session

logger = logging.getLogger(__name__)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


def init_db_and_populate():
    """Creates the database tables."""
    init_db()
    
    u = User('admin', 'admin@localhost')
    u1 = User('admin1', 'admin@localhost1')
    u2 = User('admin2', 'admin@localhost2')
    
    session = db_session
    print session.query(User).all()
    
    
    session.add(u)
    session.commit() 
    session.add(u1)
    session.commit() 
    session.add(u2)
    session.commit() 
    session.delete(u1)  # Deleting the department also deletes all of its employees.
    session.commit()
    
    print session.query(User).all()
    
    print('Initialized the database.')
    

@app.route("/")
def root():
    # return "Hello, World!"
    return json.JSONEncoder().encode({"currency": ["peso", "dollar"]})


@app.route("/user/<user_id>")
def userAccount(user_id):
    #logger.info('finding user')
    user = session.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())
  
  
@app.route("/user/<user_id>")
def find_user(user_id):
    #logger.info('finding user')
    user = session.query(User).filter(User.id == user_id).first() 
    return jsonify(user.toJSON())
  
  
@app.route('/currencies', methods=['POST'])
def create_currency():
    """Registers the user."""
    response = None
    
    if not request.form['currency']:
        exception = BadRequestError()
        response = Response(jsonify(exception), status=HttpStatus.HTTP_OK_BASIC, mimetype='application/json')
    else:
        new_currency = Currency()
        session.add(new_currency)
        session.commit()
        response = Response(jsonify(new_currency), status=HttpStatus.HTTP_OK_BASIC, mimetype='application/json')
    return response  
  
  
  
  
  
  
  
    
    
if __name__ == "__main__":

    init_db_and_populate()
    
    app.run(use_reloader=False)    
    
