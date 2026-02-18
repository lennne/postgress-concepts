const db = require('../database/db')

//create
async function createUsersTable(){
    //if the database does not have the users table create users
    //id will have a unique identifier and will be automatically incremented
    //everytime a user is created the current timestamp will be used
    const createTableQuery =  `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)
    `

    try {
       await db.query(createTableQuery)
       console.log('Users Table created successfully')
    } catch (error) {
        console.error('Error while creating users table', error)
    }
}

//insert
async function insertUsersTable(username, email){
    const insertUserQuery = `
    INSERT INTO users(username, email)
    VALUES ($1, $2)
    RETURNING *
    `

    try{
        const res = await db.query(insertUserQuery, [username, email])
        console.log('User inserted successfully', res.rows[0]);
        
        return res.rows[0];
    }catch(error){
        console.log("Error while inserting users table", error)
    }
}

//read
async function fetchAllUsers(){
    const getAllUsersFromUsersTable = 'SELECT * FROM users';

    try{
        const res = await db.query(getAllUsersFromUsersTable)
        console.log('Fetched All Users')

        return res.rows
    }catch(error){
        console.log("Error fetching users", error)
    }
}

//update
async function updateUserInfo(username, newEmail){
    const updateUserQuery = `
    UPDATE users
    SET email = $2
    WHERE username = $1
    RETURNING *
    `

    try{
        const result = await db.query(updateUserQuery, [username, newEmail])

        if(result.rows.length > 0){
            console.log('User updated successfully!', result.rows[0])
            return result.rows[0]
        }else{
            console.log('No user found with given username');
            return null
        }

    }catch(error){
        console.log("There was an error updating email", error)
    }
}

//delete
async function deleteUser(username){
    const deleteUserQuery = `
    DELETE FROM users
    WHERE username = $1
    RETURNING *
    `

    try{

        const result = await db.query(deleteUserQuery, [username])
        if(result.rows.length > 0){
            console.log('User deleted successfully!', result.rows[0])
            return result.rows[0]
        }else{
            console.log('No user found with given username');
            return null
        }
    }catch(error){
        console.log("There was an error deleting user", error)
    }
}

module.exports = { createUsersTable, insertUsersTable , fetchAllUsers, updateUserInfo, deleteUser}