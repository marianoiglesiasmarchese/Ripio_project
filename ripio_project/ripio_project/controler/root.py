'''
Created on 5 feb. 2018

@author: miglesias
'''
 
from ripio_project import app, db


@app.teardown_appcontext
def shutdown_session(exception=None):
    db.remove()

    
@app.route("/ripio_app/")
def root():
    return "Ripio transactional project" 
 
