from flask import Flask, jsonify
#from flask_mysqldb import MySQL
import mysql.connector
import json

app = Flask(__name__)


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
    #return str(data)
    return jsonify({'games': data})


    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM games")
    # data = cur.fetchall()
    # cur.close()
    #return str(data)


if __name__ == '__main__':
    app.run(debug=True)

