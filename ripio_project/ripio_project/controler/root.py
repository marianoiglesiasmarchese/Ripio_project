'''
Created on 5 feb. 2018

@author: miglesias
'''
 
from ripio_project import app, db, jsonify
from model.exception.Error import Error


@app.teardown_appcontext
def shutdown_session(exception=None):
    db.remove()

@app.errorhandler(Error)
def handle_invalid_usage(error):
    response = jsonify(error.toJSON())
    response.status_code = error.status_code
    return response
    
@app.route("/ripio_app/")
def root():
    return "Ripio transactional project" 
 
