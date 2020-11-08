function getConnection(req, res, next) {
	
  const connection = req.app.locals.connection;
  
  if (connection) {
    next();
  } else {
    return res.status(500).json('No connection');
  }
}

function getConnectionWithKnex(req, res, next) {
	
  const connection = req.app.locals.knex;
  console.log("1 st middleware");
  if (connection) {
    next();
  } else {
    return res.status(500).json('No connection');
  }
}

function getIDAsInteger(req, res, next) {
  console.log("2nd middleware");
  const id = +req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    return res.status(400).json('ID must be an integer');
  }
};

module.exports = {
  getConnection,
  getIDAsInteger,
  getConnectionWithKnex
};