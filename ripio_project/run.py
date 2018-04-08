'''
Created on 12 mar. 2018

@author: miglesias
'''

from ripio_project import app, db, logging, RotatingFileHandler
from ripio_project.model.Account import Account 
from ripio_project.model.Currency import Currency
from ripio_project.model.User import User  
from ripio_project.orm.BaseConnection import init_db


def init_db_and_populate():
    """Creates the database tables."""
    init_db()
    
    ''' TODO > aca deberia realizar una migracion para contar con datos ! '''
    currency = Currency('peso', '$')
    
    account = Account(currency, 100, 'cuenta pesos')
    
    user1 = User('admin', 'admin@localhost')
    
    user1.accounts.append(account)

    db.add(user1)
    db.commit() 

    currencyUSD = Currency('dollar', 'USD')
    
    accountUSD = Account(currencyUSD, 50, 'cuenta dolares')
    
    user2 = User('adminYankee', 'adminYankee@localhost')
    
    user2.accounts.append(accountUSD)

    db.add(user2)
    db.commit() 
    
    print('Initialized the database.')
    
    
if __name__ == "__main__":

    init_db_and_populate()
    
    handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    
    app.run(use_reloader=False, threaded=True)    
    
