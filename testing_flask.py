from flask import Flask, jsonify, request
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
    cur = data_base.cursor(dictionary=True)
    cur.execute("SELECT game_id, game_name, game_cost, num_of_players, release_year, type_of_machine FROM games")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)


@app.route('/games_by_year')
def games_by_year():
    year_value = request.args.get('year_value')
    
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)
    
    # preparing a cursor object
    cur = data_base.cursor()
    
    # execute the query
    cur.execute("SELECT game_name FROM games WHERE release_year = %s", (year_value,))
    
    # fetch the results
    data = cur.fetchall()
    
    # close the cursor and database connection
    cur.close()
    
    # format and return the results as JSON
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)

