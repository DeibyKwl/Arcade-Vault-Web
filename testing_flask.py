from flask import Flask, jsonify
#from flask_mysqldb import MySQL
import mysql.connector
import json

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello World'

config_file = "connectorConfig.json"

@app.route('/all_stores')
def all_stores_query():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object
    cur = data_base.cursor()
    cur.execute("SELECT * FROM store")
    data = cur.fetchall()
    cur.close()
    return jsonify({'store': data})



@app.route('/all_games')
def all_games_query():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object
    cur = data_base.cursor()
    cur.execute("SELECT * FROM games")
    data = cur.fetchall()
    cur.close()
    return jsonify({'games': data})



if __name__ == '__main__':
    app.run(debug=True)

