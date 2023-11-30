import mysql.connector
import json


config_file = "connectorConfig.json"

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








print(test_query())