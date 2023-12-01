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
    cur.execute("SELECT game_name FROM games WHERE release_year = %s", (year_value,))
    data = cur.fetchall()
    cur.close()
    return jsonify(data)


# Search game by cost
@app.route('/game_by_cost')
def game_by_cost():
    cost_value = request.args.get('cost_value')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object
    cur = data_base.cursor()
    cur.execute("SELECT game_name, game_cost from games\
                INNER JOIN store_game ON store_game.game_id = games.game_id\
                WHERE game_cost <= %s", (cost_value))
    data = cur.fetchall()
    cur.close()
    return jsonify(data)


# Search game by type of machine






# Search game by genre






# Search game by number of players






# Search games by store name






# Search store by address (only city for now)








# Search store by games name (find a store with that particular game)







# Search store by user







# Search stores with cost less than the average cost







# Look for game that cost less than the average of all games (this is gonna be its own tab, one click and will show everything)








# Search total cost of stores that are less than the average of total games of all stores (this is gonna be its own tab, one click and will show everything)






# Search store in multiple cities??? (may not implement it)







# Search store by store hours(this one will probably be the hardest)







# SECTION FOR INSERTING, UPDATING, AND DELETING ########################################################################













if __name__ == '__main__':
    app.run(debug=True)

