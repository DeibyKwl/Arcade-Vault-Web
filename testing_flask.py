from flask import Flask, jsonify
#from flask_mysqldb import MySQL
import mysql.connector
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    cur = data_base.cursor(dictionary=True)  # This will return results as dictionaries
    cur.execute("SELECT store_id, store_name, website, city, address FROM store")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)



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

