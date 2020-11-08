const APIServerPort = 3000;
const APIUrl = 'http://localhost:4200'; 
const database = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'todonotes'
};

module.exports = {
  APIServerPort,
  database,
  APIUrl
};