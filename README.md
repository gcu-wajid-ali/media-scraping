# Media Scraper For Images and Videos

### There are two folders in the repository

1. Node Scraper (Server Side)
2. React Scraper (Client Side)

### Please follow the below instructions to setup project:

## **1. Node Scraper (Server Side)**

Install MySQL database  and use following configuration for connecting to database:

```
"development": {
    "username": "root",
    "password": "root",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
```

> You can use your own configuration by placing it in the `config\config.json` folder.



### **Available Scripts**

In the project directory, you can run:

### `npm install` / `yarn install`

To install all the dependencies<br>

### `npm start` / `yarn start`

Runs the app in the production mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.


### `npm run devStart` / `yarn run devStart`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>


### **Available APIs**

```
Sample API for Testing Purposes:
1. Get http://localhost:3001/sample   // It is auth protected API, need to send auth bearer token 

Implemented CRUD APIs for Users Module:

1. Get http://localhost:3001/users       // To get all users
2. Post http://localhost:3001/users/create       // To create user
   {
    "username": "admin",
    "email": "admin@demo.com",
    "password": "admin"
   }
3. Get http://localhost:3001/users/{userId} // To get a user based on userId
4. Put http://localhost:3001/users/{userId} // To update user based on userId
   {
    "username": "admin2",
    "email": "admin@demo.com",
    "password": "admin"
   }
5. Delete http://localhost:3001/users/{userId} // To delete a user based on userId
6. Post http://localhost:3001/users/login       // To login user and get a jwt token
   {
    "email": "admin@demo.com",
    "password": "admin"
   }

Implemented APIs for Media Scraping Module:

1. Get http://localhost:3001/media-scraping?size=5&page=1&name=mp4       
// To get all scrape Data with optional query params for pagination and search

2. Post http://localhost:3001/media-scraping/create       // To create scrape data for requested urls array
   {
    "urls": [ 
        "https://www.learningcontainer.com/mp4-sample-video-files-download/",
        "https://stackoverflow.com/" 
        ]
   }

```

## **2. React Scraper (Client Side)**


### **Available Scripts**

In the project directory, you can run:

### `npm install` / `yarn install`

To install all the dependencies<br>

### `npm start` / `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.