<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Arcade-Vault-Web" />

 
  <!-- <a href="https://arcadevaultweb.netlify.app">Demo</a> -->
</div>
<h1 align="center">Arcade Vault Web</h1>
<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/YourUsername/Arcade-Vault-Web?color=56BEB8">
  <img alt="License" src="https://img.shields.io/github/license/YourUsername/Arcade-Vault-Web?color=56BEB8">
</p>
<br>
:dart: About

Arcade Vault Web is a full-stack application designed to manage and visualize data for arcade stores and games. It features a React-based frontend with TailwindCSS for styling, and a Flask backend handling API requests and SQL queries to a MySQL database. This application integrates the functionalities of "Data_Gen_Py_Manager", allowing users to generate, manage, and view fake data for arcade-related scenarios - perfect for database testing, arcade management simulations, or any application requiring detailed arcade data.
:sparkles: Features

:heavy_check_mark: Intuitive React frontend for easy data management and visualization.
:heavy_check_mark: Flask backend for efficient API handling and database interaction.
:heavy_check_mark: TailwindCSS for modern, responsive UI design.
:heavy_check_mark: Integration with Data_Gen_Py_Manager for generating realistic arcade store and game data.
:heavy_check_mark: Comprehensive MySQL database integration for data storage and retrieval.
:rocket: Technologies

This project is developed using:

    React for the frontend.
    TailwindCSS for styling.
    Axios for API requests.
    Flask for the backend server.
    MySQL for the database.
    Python for backend scripting and data generation.

:white_check_mark: Requirements

Before starting :checkered_flag:, you need to have Git, Node.js, Python, and MySQL installed.
:checkered_flag: Starting

bash

# Clone this project
$ git clone https://github.com/YourUsername/Arcade-Vault-Web

# Access the project directory
$ cd Arcade-Vault-Web

# Install frontend dependencies
$ cd frontend
$ npm install

# Start the frontend application
$ npm start

# Install backend dependencies
$ cd ../backend_flask
$ pip install -r requirements.txt

# Start the backend server
$ python backend_flask.py

# Optionally, generate and insert fake data into the database using Data_Gen_Py_Manager scripts
$ cd ../Data_Gen_Py_Manager
$ python generate_data.py
$ python insert_into_tables.py

:memo: License

This project is under license from MIT. For more details, see the LICENSE file.

Made with :heart: by <a href="https://github.com/YourUsername" target="_blank">Your Name</a>

<a href="#top">Back to top</a>


.
├── backend_flask.py
├── connectorConfig.json
├── db_starter.py
├── frontend
│   ├── README.md
│   ├── build
│   │   ├── assets
│   │   │   ├── index-AxLi5qG9.js
│   │   │   └── web-vitals-h7xukfVX.js
│   │   ├── favicon.ico
│   │   ├── index.css
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── index.css
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
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
