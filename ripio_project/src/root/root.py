'''
Created on 5 feb. 2018

@author: miglesias
'''

from flask import Flask
''' from src/model import *; '''

app = Flask(__name__)

@app.route("/")
def root():
    return "Hello, World!"
  
if __name__ == "__main__":
    app.run(debug=True)