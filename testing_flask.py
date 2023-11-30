from flask import Flask
#from flask_mysqldb import MySQL
import mysql.connector
import json

app = Flask(__name__)


#mysql = MySQL()
# Configure MySQL
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'dkwl12247'
# app.config['MYSQL_DATABASE_DB'] = 'arcade'
#mysql.init_app(app)
#mysql = MySQL(app)

@app.route('/')
def index():
    return 'Hello World'

config_file = "connectorConfig.json"

@app.route('/test')
def test_query():
    with open(config_file, "r") as f:
        config = json.load(f)
    connection_config = config["mysql"]
    data_base = mysql.connector.connect(**connection_config)

    # preparing a cursor object
    cur = data_base.cursor()
    cur.execute("SELECT * FROM games")
    data = cur.fetchall()
    cur.close()
    return str(data)


    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM games")
    # data = cur.fetchall()
    # cur.close()
    #return str(data)


if __name__ == '__main__':
    app.run(debug=True)

