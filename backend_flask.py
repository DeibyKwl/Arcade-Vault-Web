from flask import Flask, jsonify, request
#from flask_mysqldb import MySQL
import mysql.connector
import json
from flask_cors import CORS
import random
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello World'

config_file = "connectorConfig.json"

# Retrieve all stores from the database
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


# Retrieve all games from the database
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

# Search game by year released
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
                WHERE game_cost <= %s", (cost_value,))
    # alex note: I added a comma after cost_value because it needs to be a tuple to return name and cost

    data = cur.fetchall()
    cur.close()
    return jsonify(data)


# Search game by type of machine 
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
                WHERE type_of_machine LIKE %s;", ('%' +type_of_machine + '%',))
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)


# Search game by genre
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
        cur.execute("SELECT game_name FROM games\
                    INNER JOIN game_genre ON game_genre.game_id = games.game_id\
                    WHERE genre LIKE %s;",('%' +genre_value + '%',))
        
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



# Search game by number of players
@app.route('/game_by_num_players')
def game_by_num_players():
    num_of_players = request.args.get('num_of_players')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()
    cur.execute("SELECT game_name, num_of_players FROM games\
                WHERE num_of_players <= %s;", (num_of_players,))
    
    data = cur.fetchall()
    cur.close()
    return jsonify(data)



# Search games by store name
@app.route('/games_by_store')
def games_by_store():
    store_name = request.args.get('store_name')
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    cur = data_base.cursor()
    cur.execute("SELECT games.game_id, games.game_name, games.release_year, games.num_of_players, games.type_of_machine, games.game_cost\
                FROM games\
                INNER JOIN store_game ON store_game.game_id = games.game_id\
                INNER JOIN store ON store.store_id = store_game.store_id\
                WHERE store.store_name LIKE %s;", ('%' + store_name + '%',))
    data = cur.fetchall()
    cur.close()
    return jsonify(data)




# Search store by address
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



# Search store by city
@app.route('/store_by_city')
def store_by_city():
    store_city = request.args.get('store_city')
    # Ensure store_city is being used in the query and not hardcoded
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    cur = data_base.cursor()
    cur.execute("SELECT store_id, store_name, website, city, address FROM store WHERE city LIKE %s", ('%' + store_city + '%',))
    
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


@app.route('/add_store', methods=['POST'])
def add_store():
    try:
        data = request.json
        # logging.debug("Received store data: %s", data)

        store_id = generate_store_id()
        store_name = data.get('store_name')
        website = data.get('website')
        city = data.get('city')
        address = data.get('address')

        user_id = generate_user_id()
        user_first_name = data.get('user_first_name')
        user_last_name = data.get('user_last_name')
        user_email = data.get('user_email')

        with open(config_file, "r") as f:
            config = json.load(f)
        connection_config = config["mysql"]

        with mysql.connector.connect(**connection_config) as data_base:
            with data_base.cursor() as cur:
                logging.debug("Inserting into store table...")
                cur.execute("""
                    INSERT INTO store (store_id, store_name, website, city, address)
                    VALUES (%s, %s, %s, %s, %s)
                    """, (store_id, store_name, website, city, address))

                logging.debug("Inserting into user table...")
                cur.execute("""
                    INSERT INTO user (user_id, store_id, first_name, last_name, email)
                    VALUES (%s, %s, %s, %s, %s)
                    """, (user_id, store_id, user_first_name, user_last_name, user_email))

                data_base.commit()

        return jsonify({'message': 'Store added successfully'}), 200

    except Exception as e:
        logging.error("Error in add_store: %s", e)
        return jsonify({'error': str(e)}), 500


@app.route('/update_store', methods=['PUT'])
def update_store():
    # Read the configuration for the database connection
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # Extract data from the PUT request
    data = request.json
    store_id = data.get('store_id')
    store_name = data.get('store_name')
    website = data.get('website')
    city = data.get('city')
    address = data.get('address')

    try:
        cur = data_base.cursor()
        update_query = """
        UPDATE store
        SET store_name = %s, website = %s, city = %s, address = %s
        WHERE store_id = %s
        """
        cur.execute(update_query, (store_name, website, city, address, store_id))
        data_base.commit()
        cur.close()
        return jsonify({"success": True, "message": "Store updated successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if data_base.is_connected():
            data_base.close()
    

# this should look a lot like update_store but for the game table
@app.route('/update_game', methods=['PUT'])
def update_game():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    data = request.json
    game_id = data.get('game_id')
    game_name = data.get('game_name')
    release_year = data.get('release_year')
    num_of_players = data.get('num_of_players')
    type_of_machine = data.get('type_of_machine')
    game_cost = data.get('game_cost')

    try:
        cur = data_base.cursor()
        update_query = """
        UPDATE games
        SET game_name = %s, release_year = %s, num_of_players = %s, type_of_machine = %s, game_cost = %s
        WHERE game_id = %s
        """
        cur.execute(update_query, (game_name, release_year, num_of_players, type_of_machine, game_cost, game_id))
        data_base.commit()
        cur.close()
        return jsonify({"success": True, "message": "Game updated successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if data_base.is_connected():
            data_base.close()


@app.route('/add_game', methods=['POST'])
def add_game():
    try:
        data = request.json
        # logging.debug("Received data: %s", data)

        game_id = generate_game_id()
        store_id = data['store_id']
        game_name = data['game_name']
        release_year = data['release_year']
        num_of_players = data['num_of_players']
        type_of_machine = data['type_of_machine']
        game_cost = data['game_cost']
        game_genre = data['game_genre']

        with open(config_file, "r") as f:
            config = json.load(f)
        connection_config = config["mysql"]

        with mysql.connector.connect(**connection_config) as data_base:
            with data_base.cursor() as cur:
                # logging.debug("Inserting into games table...")
                cur.execute("""
                    INSERT INTO games (game_id, game_name, release_year, num_of_players, type_of_machine, game_cost)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """, (game_id, game_name, release_year, num_of_players, type_of_machine, game_cost))
                
                # logging.debug("Inserting into store_game table...")
                cur.execute("""
                    INSERT INTO store_game (store_id, game_id)
                    VALUES (%s, %s)
                    """, (store_id, game_id))
                
                # logging.debug("Inserting into game_genre table...")
                cur.execute("""
                    INSERT INTO game_genre (game_id, genre)
                    VALUES (%s, %s)
                    """, (game_id, game_genre))

                data_base.commit()

        return jsonify({'message': 'Game added successfully'}), 200

    except Exception as e:
        logging.error("Error in add_game: %s", e)
        return jsonify({'error': str(e)}), 500


@app.route('/delete_store/<int:store_id>', methods=['DELETE'])
def delete_store(store_id):
    print(f"Attempting to delete store with ID: {store_id}")
    try:
        with open(config_file, "r") as f:
            config = json.load(f)
        connection_config = config["mysql"]

        with mysql.connector.connect(**connection_config) as data_base:
            with data_base.cursor() as cur:
                
                cur.execute("DELETE FROM store_game WHERE store_id = %s", (store_id,))
                cur.execute("DELETE FROM store_hours WHERE store_id = %s", (store_id,))
                cur.execute("DELETE FROM user WHERE store_id = %s", (store_id,))
                # Then, delete the store
                cur.execute("DELETE FROM store WHERE store_id = %s", (store_id,))
                data_base.commit()

        return jsonify({'message': 'Store deleted successfully'}), 200
    except Exception as e:
        data_base.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/delete_game/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    try:
        with open(config_file, "r") as f:
            config = json.load(f)
        connection_config = config["mysql"]
        
        with mysql.connector.connect(**connection_config) as data_base:
            with data_base.cursor() as cur:
                # Assuming 'game_id' is the primary key for the 'games' table
                
                cur.execute("DELETE FROM game_genre WHERE game_id = %s", (game_id,))
                cur.execute("DELETE FROM store_game WHERE game_id = %s", (game_id,))
                cur.execute("DELETE FROM games WHERE game_id = %s", (game_id,))
                data_base.commit()

                # Check if the game was actually deleted
                return jsonify({'message': 'Game deleted successfully'}), 200

    except Exception as e:
        logging.error("Error in delete_game: %s", e)
        return jsonify({'error': str(e)}), 500

# If user add a game and put a year < 1970 then will rollback
def trigger_for_add():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()

    cur.execute(f"CREATE TRIGGER IF NOT EXISTS before_game_insert\
                BEFORE INSERT ON games\
                FOR EACH ROW\
                BEGIN\
                    IF NEW.release_year < 1970 OR NEW.release_year > 2023 THEN\
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Release year must be between 1970 and 2023';\
                    END IF;\
                END;")

    data_base.commit()
    cur.close()

# If user update a game and put a year < 1970 then will rollback
def trigger_for_update():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object 
    cur = data_base.cursor()

    cur.execute(f"CREATE TRIGGER IF NOT EXISTS before_game_update\
                BEFORE UPDATE ON games\
                FOR EACH ROW\
                BEGIN\
                    IF NEW.release_year < 1970 OR NEW.release_year > 2023 THEN\
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Release year must be between 1970 and 2023';\
                    END IF;\
                END;")

    data_base.commit()
    cur.close()

# Create trigger if it does not exist when running backend code.
trigger_for_add()
trigger_for_update()


if __name__ == '__main__':
    app.run(debug=True)

