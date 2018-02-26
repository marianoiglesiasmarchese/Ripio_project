'''
Created on 5 feb. 2018

@author: miglesias
'''

from flask import Flask, jsonify
import json
import logging
from src.orm.BaseConnection import db_session, init_db
from model.User import User
from HttpStatus import HttpStatus
 
app = Flask("__name__")
app.config['DEBUG'] = True

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
    s = db_session
    user = s.query(User).filter(User.id == user_id).first() 
    
    logger.info('info log')
    
    return jsonify(user.toJSON())

    
if __name__ == "__main__":
    """Creates the database tables."""
    init_db()
    #drop_db()
    
    u = User('admin', 'admin@localhost')
    u1 = User('admin1', 'admin@localhost1')
    u2 = User('admin2', 'admin@localhost2')
    
    s = db_session
    print s.query(User).all()
    
    
    s.add(u)
    s.commit() 
    s.add(u1)
    s.commit() 
    s.add(u2)
    s.commit() 
    s.delete(u1)  # Deleting the department also deletes all of its employees.
    s.commit()
    
    print s.query(User).all()
    
    print('Initialized the database.')
    
    app.run(use_reloader=False)    
    
    
    
    