function listAllTasks(req, res) {
    const knex = req.app.locals.knex;
    knex.select('id', 'title', 'description','remarks','created_date','updated_date','status').from('task').then(data => {
      return res.status(200).json(data);
    }).catch(error => res.status(500).json(error));
  }

  module.exports = {
    listAllTasks,
    
  };