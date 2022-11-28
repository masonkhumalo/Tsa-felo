const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Tsafelo',
  password: 'Letsdoit!',
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
      response.status(201).json({message:`User added with ID: ${results.rows[0].id}`})
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

  const login =  async (request,response)=>{
    const {email,password} =  request.body;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email,password],(error,results)=>{
        if(error){
            response.status(400).json({message: "Error communicating with database"})
        }else{
            if(results.rowCount==0){
                response.status(400).json({message: "User does not exist, Please register"})
            }else{
                bcrypt.compare(password,results.rows[0].password,(error,result)=>{
                   if(password != results.rows[0].password ){
                    response.status(400).json({message: "Invalid Credentials, Please try again"});
                   } else{
                    const token = jwt.sign({
                        id: results.rows[0].id,
                        firstname: results.rows[0].firstname,
                        lastname: results.rows[0].lastname,
                        location: results.rows[0].location,
                        email: results.rows[0].email,
                        password: results.rows[0].password
                    },
                    "hscjhgkfhdagfh",{
                        algorithm: 'HS256',
                        expiresIn: 120
                    });
                    response.status(200).json({message: "Welcome! user : "+results.rows[0].id +" "+results.rows[0].lastname+ " "+results.rows[0].name
                     ,token: token,}); 
                }
                 })
            }
        }
    })
    
}


  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
  }