'''
Created on 12 mar. 2018

@author: miglesias
'''

from flask import jsonify, request

from ripio_project import app, db
from ripio_project.model.Currency import Currency
from ripio_project.model.exception.BadRequestError import BadRequestError 


@app.route('/ripio_app/currencies', methods=['POST'])
def create_currency():
    
    response = None
        
    if not request.json:
        exception = BadRequestError("", "")
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
    return jsonify(response) 

    
@app.route('/ripio_app/currencies', methods=['GET'])
def get_all_currencies():
    
    currenciesListResult = [] 
        
    # logger.info('finding user')
    currenciesList = db.query(Currency).all()
        
    for currency in currenciesList:
        currenciesListResult.append(currency.toJSON())
        
    return jsonify(currenciesListResult)

