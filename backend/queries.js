const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Tsafelo',
  password: '12345',
  port: 5432,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.users Order by id asc', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { firstname, lastname ,location ,email,password } = request.body
  
    pool.query('INSERT INTO users (firstname, lastname ,location ,email,password) VALUES ($1, $2 ,$3 ,$4 ,$5) RETURNING *', [firstname, lastname ,location ,email,password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstname, lastname ,location ,email,password} = request.body
  
    pool.query(
      'UPDATE public.users SET firstname=$1, lastname=$2, location=$3, email=$4, password=$5 WHERE id = $6',
      [firstname, lastname ,location ,email,password, id],
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

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }