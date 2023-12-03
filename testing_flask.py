from flask import Flask, jsonify, request
#from flask_mysqldb import MySQL
import mysql.connector
import json
from flask_cors import CORS
import random

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
    cur.execute(f"SELECT game_name FROM games WHERE release_year = {year_value}")
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
    cur.execute(f"SELECT game_name, type_of_machine FROM games\
                WHERE type_of_machine LIKE \'%{type_of_machine}%\';")
    
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
                    WHERE genre LIKE \'%{genre_value}%\';")
        
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
@app.route('/game_by_num_players')
def game_by_num_players():
    num_of_players = request.args.get('num_of_players')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT game_name, num_of_players FROM games\
                WHERE num_of_players <= {num_of_players};")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)





# Search games by store name (NOT IMPLEMENTED YET)
@app.route('/games_by_store')
def games_by_store():
    store_name = request.args.get('store_name')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    cur = data_base.cursor()
    query = """
        SELECT games.game_id, games.game_name, games.release_year, games.num_of_players, games.type_of_machine, games.game_cost
        FROM games
        INNER JOIN store_game ON store_game.game_id = games.game_id
        INNER JOIN store ON store.store_id = store_game.store_id
        WHERE store.store_name LIKE %s;
    """
    cur.execute(query, ('%' + store_name + '%',))
    data = cur.fetchall()
    cur.close()
    return jsonify(data)




# Search store by address (NOT IMPLEMENTED YET) 
@app.route('/store_by_address')
def store_by_address():
    store_address = request.args.get('store_address')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute("SELECT * FROM store WHERE address LIKE %s", ('%' + store_address + '%',))
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)






# Search store by city (NOT IMPLEMENTED YET) 
@app.route('/store_by_city')
def store_by_city():
    store_city = request.args.get('store_city')
    store_city = 'sac'
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT store_name FROM store\
                WHERE city LIKE \'%{store_city}%\'")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)




# Search store by games name (find a store with that particular game) (NOT IMPLEMENTED YET)
@app.route('/store_by_games')
def store_by_games():
    game_name = request.args.get('game_name')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT store_name FROM store\
                INNER JOIN store_game ON store_game.store_id = store.store_id\
                INNER JOIN games ON games.game_id = store_game.game_id\
                WHERE game_name LIKE '%{game_name}%';")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)





# Look for game that cost less than the average of all games (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)
@app.route('/store_game_avg_cost_less_than_total_avg')
def store_game_avg_cost_less_than_total_avg():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"WITH cost_total (store_name, value) AS\
                    (SELECT store_name, ROUND(AVG(game_cost), 2) FROM store\
                    INNER JOIN store_game ON store_game.store_id = store.store_id\
                    INNER JOIN games ON games.game_id = store_game.game_id\
                    GROUP BY store_name)\
                SELECT store_name, value FROM cost_total\
                WHERE value < (SELECT AVG(value) FROM cost_total);")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)




# Search total cost of stores that are less than the average of total games of all stores (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)
@app.route('/store_total_coss_less_than_avg')
def store_total_coss_less_than_avg():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"WITH cost_total (store_name, value) AS\
                    (SELECT store_name, SUM(game_cost) FROM store\
                    INNER JOIN store_game ON store_game.store_id = store.store_id\
                    INNER JOIN games ON games.game_id = store_game.game_id\
                    GROUP BY store_name),\
                cost_total_avg (value) AS\
                (SELECT AVG(value) FROM cost_total)\
                SELECT store_name, cost_total.value FROM cost_total, cost_total_avg\
                WHERE cost_total.value < cost_total_avg.value;")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)



# Search store by store hours(this one will probably be the hardest) (NOT IMPLEMENTED YET)









# Count games by genre (this is gonna be its own tab, one click and will show everything) (NOT IMPLEMENTED YET)
@app.route('/count_all_genres')
def count_all_genres():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT genre, COUNT(*) AS num_of_games FROM games\
                INNER JOIN game_genre ON game_genre.game_id = games.game_id\
                GROUP BY genre\
                ORDER BY COUNT(*) DESC;")
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)




# SHOULD WE IMPLEMENT THEM???? search store by store_name and search game by game_name








# SECTION FOR INSERTING, UPDATING, AND DELETING ######################################################################## (NOT IMPLEMENTED YET)


def generate_used_store_ids():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT store_id FROM store")
    data = cur.fetchall()
    cur.close()
    store_ids = [item[0] for item in data]
    return store_ids

def generate_used_user_ids():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT user_id FROM user")
    data = cur.fetchall()
    cur.close()
    user_ids = [item[0] for item in data]
    return user_ids

def generate_used_games_ids():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute(f"SELECT game_id FROM games")
    data = cur.fetchall()
    cur.close()
    games_ids = [item[0] for item in data]
    return games_ids

# IDS to make sure they are not duplicates
store_used_id = generate_used_store_ids()
user_used_id = generate_used_user_ids()
game_used_id = generate_used_games_ids()

def generate_store_id():
    global store_used_id
    while True:
        store_id = random.randint(1, 1000000)
        if store_id not in store_used_id:
            store_used_id.append(store_id)
            return store_id
    
def generate_user_id():
    global user_used_id
    while True:
        user_id = random.randint(1, 1000000)
        if user_id not in user_used_id:
            user_used_id.append(user_id)
            return user_id
    
def generate_game_id():
    global game_used_id
    while True:
        game_id = random.randint(1, 1000000)
        if game_id not in game_used_id:
            game_used_id.append(game_id)
            return game_id


@app.route('/add_store')
def add_store():

    store_id = generate_store_id()
    store_name = request.args.get('store_name')
    website = request.args.get('website')
    city = request.args.get('city')
    address = request.args.get('address')

    #store_id = '15'
    # store_name = 'holacomoestas'
    # website = 'www.comoestas'
    # city = 'muybien'
    # address = 'very333bien'

    user_id = generate_user_id()
    user_first_name = request.args.get('user_first_name')
    user_last_name = request.args.get('user_last_name')
    user_email = request.args.get('user_email')

    # user_id = 15
    # user_first_name = 'jesus'
    # user_last_name = 'sanches'
    # user_email = 'jesusanche@gmail.com'

    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()

    cur.execute(f"INSERT INTO store (store_id, store_name, website, city, address)\
                VALUES (\'{store_id}\',\'{store_name}\',\'{website}\',\'{city}\',\'{address}\')")
    

    cur.execute(f"INSERT INTO user (user_id, store_id, first_name, last_name, email)\
                VALUES (\'{user_id}\',\'{store_id}\',\'{user_first_name}\',\'{user_last_name}\',\'{user_email}\')")

    
    data_base.commit()
    cur.close()


@app.route('/add_game')
def add_game():

    game_id = generate_game_id()
    store_id = request.args.get('store_id') # this will be getted by user clicked button
    game_name = request.args.get('game_name')
    release_year = request.args.get('release_year')
    num_of_players = request.args.get('num_of_players')
    type_of_machine = request.args.get('type_of_machine')
    game_cost = request.args.get('game_cost')


    # game_id = 15
    # store_id = 15 # this will be getted by user clicked button
    # game_name = 'new_game'
    # release_year = 1990
    # num_of_players = 5
    # type_of_machine = 'boxing'
    # game_cost = 0.20

    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()

    cur.execute(f"INSERT INTO games (game_id, game_name, release_year, num_of_players, type_of_machine, game_cost)\
                VALUES (\'{game_id}\',\'{game_name}\',\'{release_year}\',\'{num_of_players}\',\'{type_of_machine}\', \'{game_cost}\')")
    
    cur.execute(f"INSERT INTO store_game ( store_id, game_id)\
                VALUES (\'{store_id}\',\'{game_id}\')")

    
    data_base.commit()
    cur.close()



if __name__ == '__main__':
    app.run(debug=True)

