const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const settings = require('./settings');
const routes = require('./routes');

const middlewares = require('./middlewares');


var cors = require('cors'); 
app.use(cors({credentials: true, origin: settings.APIUrl}));
app.use(function(req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,accesstoken,regenarate-token,Accept,enctype,contentType,processData,cache');
  res.setHeader('Access-Control-Expose-Headers','Content-Type,expire,Accept');
  next();
});

/*
const connection = mysql.createConnection(settings.database);
*/

// configure the app to use bodyParser()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true  })); 
/*
const jsonParser = bodyParser.json();

app.get('/employees', middlewares.getConnection, routes.employees.listAllEmployees);
app.get('/employees/:id', middlewares.getConnection, middlewares.getIDAsInteger, routes.employees.listOneEmployee);
app.post('/employees', jsonParser, middlewares.getConnection, routes.employees.createEmployee);
app.patch('/employees/:id', jsonParser, middlewares.getConnection, middlewares.getIDAsInteger, routes.employees.patchEmployee);
app.delete('/employees/:id', jsonParser, middlewares.getConnection, middlewares.getIDAsInteger, routes.employees.deleteEmployee);
app.get('/test', routes.employees.test); */

app.get('/departments', middlewares.getConnectionWithKnex,routes.departments.listAllDepartments);
app.get('/departments/:id', middlewares.getIDAsInteger, routes.departments.listOneDepartment);
app.post('/departments',  routes.departments.createDepartment);
app.patch('/departments/:id',  middlewares.getIDAsInteger, routes.departments.updateDepartment);
app.delete('/departments/:id', middlewares.getIDAsInteger, routes.departments.deleteDepartment); 

//my development
app.get('/viewtasklist', middlewares.getConnectionWithKnex,routes.task.listAllTasks);

 /*
 connection.connect(error => {
   if (error) {
     console.error(`Error connecting to database: ${error}`);
     return process.exit();
   }
   app.locals.connection = connection;
   app.listen(settings.APIServerPort , () => console.info(`API Server is running on ${settings.APIServerPort}`));
});*/

const knex = require('knex')({
  client: 'mysql',
  connection: settings.database
});
app.locals.knex = knex; 

app.listen(process.env.PORT || settings.APIServerPort , () => console.info(`API Server is running on ${settings.APIServerPort}`));