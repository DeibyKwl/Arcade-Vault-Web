<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="ARCADE VAULT" />

  &#xa0;

  <!-- <a href="https://data_gen_py_manager.netlify.app">Demo</a> -->
</div>

<h1 align="center">Arcade-Vault-Web</h1>

<p align="center">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/DeibyKwl/Arcade-Vault-Web?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/DeibyKwl/Arcade-Vault-Web?color=56BEB8">
</p>

<br>

## :dart: About ##

This project, Arcade Vault, consists of Python scripts designed to generate fake data for arcade stores and games. The scripts create realistic and comprehensive datasets including store details like names, websites, addresses, operating hours, user information, and game information such as game names, genres, prices, and the types of machines. This data can be used for testing databases, applications related to arcade management, or any other purpose where mock arcade data is needed.

## :sparkles: Features ##

:heavy_check_mark: Generate detailed arcade store data including store names, websites, addresses, and operating hours;\
:heavy_check_mark: Create realistic user profiles associated with each arcade store;\
:heavy_check_mark: Produce diverse arcade game data including names, genres, prices, and types of machines;\
:heavy_check_mark: Write all generated data to CSV files for easy import and use in various applications.;\
:heavy_check_mark: Flask connected to MySQL, allowing for database management using SQL queries.;\
:heavy_check_mark: Implement Resfull API endpoints using Flask, allowing for CRUD operations.;\
:heavy_check_mark: Nice looking frontend for easy user experience.;\
:heavy_check_mark: Use of SQL triggers, SQL joins, and SQL transactions among many other SQL queries;\

## :wrench: SQL Database Integration ##

In this new and improved repo for the final stretch of our project, 

These queries are utilzed in our backend_flask.py, which uses Axios API calls and is then used to route to different queries baked into the frontend.

## :rocket: Technologies ##

The following tools were used in this project:


- [Python](https://www.python.org/) for the main scripting language.
- [Faker](https://faker.readthedocs.io/en/master/) for generating fake data.
- [MySQL Workbench](https://www.mysql.com/products/workbench/) for database design, administration, and SQL development.
- [TQDM](https://github.com/tqdm/tqdm/) Instantly make your loops show a progress meter.
- [Tailwind](https://tailwindcss.com/) Simplify CSS (CSS was still used, but tailwind helped)
- [NPM](https://www.npmjs.com/) Important tool for package/dependency management using Node.js
- [Flask](https://flask.palletsprojects.com/en/3.0.x/) Access database management, connect with frontend
- [Axios](https://axios-http.com/docs/intro) simplifies http requests
- Good ol' SQL for defining and manipulating data in the database.

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Python](https://www.python.org/) [MySQL Workbench](https://www.mysql.com/products/workbench/) installed.

## :checkered_flag: Starting ##

```bash
# Step 1 - Clone Repo:
# Clone this project
$ git clone https://github.com/DeibyKwl/Arcade-Vault-Web
# Access
$ cd Arcade-Vault-Web

#Step 2 - Set up MySQL: 
#Ensure MySQL Workbench is running on your system.
# Make a new database named 'arcade'.

#Step 3 - Configure MySQL connection
# In the root of the Arcade-Vault-Web repo, make a connectorConfig.json file
{
  "mysql": {
    "host": "localhost",
    "user": "root",
    "passwd": "<YOUR_MYSQL_PASSWORD>",
    "db": "arcade"
  }
}

#Step 4 - Arm yourselves with Python Dependencies
$ pip install faker mysql-connector-python tqdm

#Step 5 - Populate Database using Data Generation
# NOTE:run these in order
$ python db_starter.py
$ python generate_data.py
$ python insert_into_tables.py

#Step 6 - Set up backend
# make sure flask is installed
$ pip install flask

#from root of repo
$ python backend_flask.py

#leave this running, then in a separate terminal...

#Step 7 - Set up frontend 
#assuming you're back in root, move to frontend directory
$ cd frontend

#finally run this to install dependencies
npm i

#and this will allow you to access the page
npm start

```


```
.
├── backend_flask.py
├── connectorConfig.json
├── db_starter.py
├── frontend
│   ├── README.md
│   ├── build
...
│   ├── index.css
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
...
│   ├── src
│   │   ├── components
│   │   │   ├── AddGame.jsx
│   │   │   ├── AddStore.jsx
│   │   │   ├── AllGames.jsx
│   │   │   ├── AllStores.jsx
│   │   │   ├── DeleteGame.jsx
│   │   │   ├── DeleteStore.jsx
│   │   │   ├── GamesByCost.jsx
│   │   │   ├── GamesByGenre.jsx
│   │   │   ├── GamesByNumOfPlayers.jsx
│   │   │   ├── GamesByStore.jsx
│   │   │   ├── GamesByTypeOfMachine.jsx
│   │   │   ├── GamesByYear.jsx
│   │   │   ├── StoreByAddress.jsx
│   │   │   ├── StoreByCity.jsx
│   │   │   ├── TransferGame.jsx
│   │   │   ├── UpdateGame.jsx
│   │   │   └── UpdateStore.jsx
│   │   ├── index.jsx
│   │   ├── pages
│   │   │   └── HomePage.jsx
│   │   ├── reportWebVitals.js
│   │   ├── rowcomponents
│   │   │   ├── GameRow.jsx
│   │   │   ├── GameTableHeader.jsx
│   │   │   ├── SimpleRow.jsx
│   │   │   ├── StoreRow.jsx
│   │   │   └── StoreTableHeader.jsx
│   │   └── setupTests.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── generate_data.py
├── generated_data
│   ├── game_data
│   │   ├── default_games.csv
│   │   └── game.csv
│   ├── generate_game.py
│   ├── generate_store.py
│   ├── generate_user.py
│   ├── store_data
│   │   ├── default_stores.csv
│   │   └── store.csv
│   └── user_data
│       └── user.csv
├── insert_into_tables.py
├── package-lock.json
├── readme.md
├── repo_structure.txt
└── table
    ├── table_game_genre.sql
    ├── table_games.sql
    ├── table_store.sql
    ├── table_store_game.sql
    ├── table_store_hours.sql
    └── table_user.sql

14 directories, 70 files

```


## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/DeibyKwl" target="_blank">Deiby Wu</a> and <a href="https://github.com/alexo75" target="_blank">Alex O'Neill</a>

<a href="#top">Back to top</a>****
