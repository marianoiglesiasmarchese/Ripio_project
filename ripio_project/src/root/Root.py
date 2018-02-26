'''
Created on 5 feb. 2018

@author: miglesias
'''

from flask import Flask, jsonify
import json
import logging
from src.orm.BaseConnection import db_session, init_db
from model.User import User
#from HttpStatus import HttpStatus
 
app = Flask("__name__")
app.config['DEBUG'] = True

session = db_session

logger = logging.getLogger(__name__)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
    

@app.route("/")
def root():
    # return "Hello, World!"
    return json.JSONEncoder().encode({"currency": ["peso", "dollar"]})


@app.route("/user/<user_id>")
def userAccount(user_id):

    user = session.query(User).filter(User.id == user_id).first() 
    
    #logger.info('info log')
    
    return jsonify(user.toJSON())


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
    
    
if __name__ == "__main__":

    init_db_and_populate()
    
    app.run(use_reloader=False)    
    
    
    
    