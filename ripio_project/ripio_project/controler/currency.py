'''
Created on 12 mar. 2018

@author: miglesias
'''

from flask import jsonify, request

from ripio_project import app, db
from ripio_project.model.Currency import Currency
from ripio_project.model.exception.BadRequestError import BadRequestError 
from model.exception.Error import Error


@app.route('/ripio_app/currencies', methods=['POST'])
def create_currency():

    app.logger.info('creating a currency')
    
    response = None
        
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            new_currency = Currency(request.json['name'], request.json['symbol'])
            db.add(new_currency)
            db.commit()
            response = new_currency.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred')
            raise Error(request)
    return jsonify(response) 


@app.route("/ripio_app/currencies/<currency_id>", methods=['PUT'])
def update_currency(currency_id):

    app.logger.info('updating a currency')
    response = None
         
    if not request.json:
        raise BadRequestError(request)
    else:
        try:
            currency = db.query(Currency).filter(Currency.id == currency_id).first() 
            currency.name = request.json['name']
            currency.symbol =  request.json['symbol']
            currency.enable =  request.json['enable']
            
            db.commit()
            response = currency.toJSON()
        except Exception as err:
            db.rollback()            
            app.logger.error('An error occurred')
            raise Error(request=request)
    return jsonify(response) 

    
@app.route('/ripio_app/currencies', methods=['GET'])
def get_all_currencies():
    
    app.logger.info('getting all currencies')    
    
    currenciesListResult = [] 
        
    currenciesList = db.query(Currency).all()
        
    for currency in currenciesList:
        currenciesListResult.append(currency.toJSON())
        
    return jsonify(currenciesListResult)

