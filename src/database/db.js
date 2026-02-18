const {Pool} = require('pg') //pool manages a pool of multiple reusable postgress connections


require('dotenv').config()

//create a new pool instance to manage the database connections
//pool manages multiple client connections efficiently
//if you have multiple databases you'll need to create a separate client connection for them
//manages a stale connection automatically
// -> postgre -> :// -> [user] -> [password] -> @ -> host:port -> [database]
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

 pool.on("connect", () => {
            console.log("connected to database")
        })

async function query(text, params){


    try{
         // how long it takes to execute

        const result = await pool.query(text, params);
        
        return result
    }catch(error){
        console.log('Daatabaes query error', error)
    }finally{
        pool.end()
    }
}

module.exports = { query }