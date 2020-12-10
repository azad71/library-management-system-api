## LIBRARY MANAGEMENT SYSTEM API

### How to spin up server
- first run ```npm i ```, it will download required npm packages
- create a .env file in app root directory
- inside .env create two environment variables, DB_URL and JWT_SECRET_KEY
- DB_URL is url of your database, JWT_SECRET_KEY is your jwt secret to verify token
- run ```npm run dev ```