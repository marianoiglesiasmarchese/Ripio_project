'''
Created on 5 feb. 2018

@author: miglesias
'''

from flask import Flask
import json
''' from src/model import *; '''

app = Flask("__name__")

@app.route("/")
def root():
    # return "Hello, World!"
    return json.JSONEncoder().encode({"currency": ["peso", "dollar"]})
  
if __name__ == "__main__":
    app.run(debug=True)