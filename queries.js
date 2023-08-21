const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Fylhtq011210',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    //первый вариант
    return results.rows;
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
//пвторой вариант
    document.getElementById("getUserById")
				.innerHTML = `Вооот: ${results.rows}`;
  
//третий вариант
    /*  let sql = `SELECT * FROM users WHERE id = ${id}`;
      con.query(sql, function(err, rows, fields) {
      if (err) throw err + console.log("NOT CONNECTED! " + err);

      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      let renderedHtml = ejs.render(content, {
        rows: rows
      });
      response.end(renderedHtml);
    }) */
  }
  )}

const createUser = (request, response) => {
  const {name, email} = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}


const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const {name, email} = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

pool.end(function(err) {
  if (err) {
    return console.log(err.message);
  }
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}