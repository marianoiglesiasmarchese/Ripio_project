import json
import logging

from flask import Flask, jsonify, request, Response, make_response

from ripio_project.model.Account import Account
from ripio_project.model.Currency import Currency
from ripio_project.model.Operation import Operation 
from ripio_project.model.User import User 
from ripio_project.model.exception.BadRequestError import BadRequestError 
from ripio_project.orm.BaseConnection import db_session, init_db, engine

app = Flask("__name__")
app.config['DEBUG'] = True

logger = logging.getLogger(__name__)

db = db_session

import ripio_project.controler.root
import ripio_project.controler.currency 
import ripio_project.controler.user
