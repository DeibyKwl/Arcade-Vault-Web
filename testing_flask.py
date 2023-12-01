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


# Search game by cost (NOT IMPLEMENTED YET)
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


# Search game by type of machine (NOT IMPLEMENTED YET)
@app.route('/game_by_type_of_machine')
def game_by_type_of_machine():
    type_of_machine = request.args.get('type_of_machine')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute("SELECT game_name, type_of_machine FROM games\
                WHERE type_of_machine LIKE \'%\s%\';", (type_of_machine))
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)


# Search game by genre (NOT IMPLEMENTED YET)
@app.route('/game_by_genre')
def game_by_genre():

    genre_value = request.args.get('genre_value')

    genre_lst_query = ""

    if ' ' in genre_value:
        genre_value = genre_value.split()
        for i in genre_value:
            genre_lst_query += f"\'{i}\',"
            
        genre_lst_query = genre_lst_query[:-1] # get rid of last comma
        print(genre_lst_query)
    else:
        genre_value = genre_value.split() # just turn it into a list of a word

    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    # If it is looking for 1 genre
    if len(genre_value) == 1:
        genre_value = ''.join(genre_value) # Turn back into string
        cur.execute(f"SELECT game_name FROM games\
                    INNER JOIN game_genre ON game_genre.game_id = games.game_id\
                    WHERE genre LIKE \'%{str(genre_value)}%\';")
        
    # If it is looking for more than one genre, it has to be full names for the genre
    else:
        cur.execute(f"SELECT game_name FROM games\
                    INNER JOIN game_genre ON game_genre.game_id = games.game_id\
                    WHERE genre IN ({genre_lst_query})\
                    GROUP BY game_name\
                    HAVING COUNT(DISTINCT(genre)) = {len(genre_value)}")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)



# Search game by number of players (NOT IMPLEMENTED YET)






# Search games by store name (NOT IMPLEMENTED YET)






# Search store by address (only city for now) (NOT IMPLEMENTED YET) 








# Search store by games name (find a store with that particular game) (NOT IMPLEMENTED YET)







# Search store by user (NOT IMPLEMENTED YET)







# Search stores with cost less than the average cost (NOT IMPLEMENTED YET)







# Look for game that cost less than the average of all games (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)








# Search total cost of stores that are less than the average of total games of all stores (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)






# Search store in multiple cities??? (may not implement it) (NOT IMPLEMENTED YET)







# Search store by store hours(this one will probably be the hardest) (NOT IMPLEMENTED YET)









# Count games by genre (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)







# SECTION FOR INSERTING, UPDATING, AND DELETING ######################################################################## (NOT IMPLEMENTED YET)













if __name__ == '__main__':
    app.run(debug=True)

