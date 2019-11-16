import os
import json
from flask import Flask, render_template
from flask import jsonify
import webbrowser
app = Flask(__name__)

global FILENAME

@app.route('/')
def mainDisplay():
    return render_template('mainDisplay.html', initial = None)

if __name__ == '__main__':
    global FILENAME

    # FILENAME = "http://localhost:5000/"
    # webbrowser.open_new_tab(FILENAME)
    app.run()
